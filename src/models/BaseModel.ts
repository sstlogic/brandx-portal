/* eslint-disable @typescript-eslint/no-unused-vars */

import {
  AppendedAttributes,
  BaseModelData,
  ConstructorOptions,
  HasOneConfig,
  HasOneReturn,
  Messages,
  MetaBaseModel,
  ModelRelations,
  UpdateData,
} from './types';
import { Builder, PaginatedResponse } from './Builder';
import { IAPI } from '@/composables/useApi/types';
import { camel, kebab } from '@/utils/string';
import { capitalizeFirstLetter } from '@/utils/case';
import { cloneDeep } from 'lodash-es';
import { useApi } from '@/composables/useApi';
import { v4 as uuidv4 } from 'uuid';

export class BaseModel<ModelData extends BaseModelData = BaseModelData> {
  /**
   * TODO
   * Flag if this model should be treated as a parent
   * deprecate?
   */
  public asParent = true;

  /**
   * Returns the parent of this model if in a relation
   */
  public parent = (): null | BaseModel => null;
  public _relations: ModelRelations = {};
  public _tempData: ModelData | null = null;
  public loadedRelations: string[] = [];

  public options: ConstructorOptions;

  constructor(
    public data: ModelData = {} as ModelData,
    options: ConstructorOptions = {
      relations: true,
      loadedRelations: [],
    }
  ) {
    if (data && options.relations) {
      this.setRelations();

      this.setAppends();
    }
    this.options = options;
  }

  static get $api(): IAPI {
    return useApi();
  }

  /**
   * Return a new builder instance for this model
   */
  static builder<M extends BaseModel, D = M['data']>(this: MetaBaseModel<M, D>): Builder<M, D> {
    return new Builder(new this(), this, BaseModel.$api);
  }

  static make<M extends BaseModel, D = M['data']>(this: MetaBaseModel<M, D>): M {
    const model = new this();
    model.data.uuid = uuidv4();

    return model;
  }

  static async paginate<M extends BaseModel, D = M['data']>(
    this: MetaBaseModel<M, D>,
    pageNumber?: number,
    perPage?: number
  ): Promise<PaginatedResponse<M[]>> {
    const builder = this.builder();
    return await builder.paginate(pageNumber, perPage);
  }

  static where<M extends BaseModel, T, D = M['data']>(
    this: MetaBaseModel<M, D>,
    property: string,
    value: T,
    nullable?: boolean
  ): Builder<M, D> {
    const builder = this.builder();
    return builder.where(property, value, nullable);
  }

  static sortBy<M extends BaseModel, T, D = M['data']>(
    this: MetaBaseModel<M, D>,
    property: string,
    desc = false
  ): Builder<M, D> {
    const builder = this.builder();
    return builder.sortBy(property, desc);
  }

  static async get<M extends BaseModel, D = M['data']>(this: MetaBaseModel<M, D>): Promise<M[]> {
    const builder = this.builder();
    return await builder.get();
  }

  static async getAll<M extends BaseModel, D = M['data']>(this: MetaBaseModel<M, D>): Promise<M[]> {
    const builder = this.builder();

    const results = await builder.paginate(1, 999999);
    return results.data;
  }

  static async findOrFail<M extends BaseModel, D = M['data']>(
    this: MetaBaseModel<M, D>,
    uuid: string,
    callback?: () => void
  ): Promise<M | null> {
    try {
      const builder = this.builder();
      return await builder.find(uuid);
    } catch (e) {
      if (callback) {
        callback();
      }

      return null;
    }
  }

  static async find<M extends BaseModel, D = M['data']>(this: MetaBaseModel<M, D>, uuid: string): Promise<M> {
    const builder = this.builder();
    return await builder.find(uuid);
  }

  static with<M extends BaseModel, D = M['data']>(this: MetaBaseModel<M, D>, ...include: string[]): Builder<M, D> {
    const builder = this.builder();
    return builder.with(...include);
  }

  static async create<M extends BaseModel, D = M['data']>(this: MetaBaseModel<M, D>, data: D): Promise<M> {
    const builder = this.builder();
    return await builder.create(data);
  }

  static async update<M extends BaseModel, D = M['data']>(
    this: MetaBaseModel<M, D>,
    data: D & { uuid: string }
  ): Promise<M> {
    const builder = this.builder();
    return await builder.update(data);
  }

  async updateRaw<M extends BaseModel>(this: M, data: unknown, config = { message: true }): Promise<M> {
    // TODO - handle both null
    const builder = this.builder();
    return await builder.update(data as ModelData, config);
  }

  clone<M extends BaseModel>(this: M): M {
    return cloneDeep(this);
  }

  get tempData(): ModelData {
    if (this._tempData == null) {
      this._tempData = { ...this.data };
    }
    return this._tempData;
  }

  set tempData(data: ModelData) {
    this._tempData = data;
  }

  get uuid(): string {
    return this.data.uuid;
  }

  builder<M extends BaseModel, D = M['data']>(this: M): Builder<M, D> {
    return new Builder(this, this.constructor as MetaBaseModel<M, D>, BaseModel.$api);
  }

  async create<M extends BaseModel, D extends BaseModelData>(this: M): Promise<M> {
    const builder = this.builder();
    if (!this._tempData) {
      throw new Error('Data must be set on the model');
    }
    const model = await builder.create(this.serialise());
    return model;
  }

  async update<M extends BaseModel, D extends Partial<ModelData>>(
    this: M,
    data: UpdateData<D> | null = null,
    config = { message: true }
  ): Promise<M> {
    // TODO - handle both null
    const builder = this.builder();
    if (!data) {
      data = this.tempData as UpdateData<D>;
    }
    return await builder.update(this.serialise(data as D), config);
  }

  async delete<M extends BaseModel, D extends BaseModelData>(this: M, data: D | null = null): Promise<M> {
    const builder = this.builder();
    return await builder.delete();
  }

  async directDelete<M extends BaseModel, D extends BaseModelData>(this: M, data: D | null = null): Promise<M> {
    const builder = this.builder();
    return await builder.directDelete();
  }

  async refresh<M extends BaseModel>(this: M): Promise<M> {
    const builder = this.builder();
    const loadedRelations = this.options.loadedRelations;
    if (loadedRelations) {
      builder.with(...loadedRelations);
    }
    return Object.assign(this, await builder.refresh(this.resourceSlug()));
  }

  setAppends(): void {
    for (const [key, value] of Object.entries(this.appends())) {
      const data = this.data[key as keyof this['data']];

      if (value) {
        const append = value(data);

        Object.assign(this, {
          [key]: append,
        });
      }
    }
  }

  setRelations(): void {
    for (const [key, value] of Object.entries(this.relations())) {
      Object.defineProperty(this, key, {
        enumerable: true,
        configurable: true,
        get(this: BaseModel) {
          return this._relations[key as keyof Partial<typeof this>];
        },
        set(this: BaseModel, val) {
          this._relations[key as keyof Omit<Partial<typeof this>, 'messages' | 'uuid'>] = val;

          const serialisedVal = Array.isArray(val) ? val.forEach((item) => item?.serialise()) : val?.serialise();

          Object.assign(this, {
            data: {
              ...this.data,
              [key]: serialisedVal,
            },
            tempData: {
              ...this.tempData,
              [key]: serialisedVal,
            },
          });
        },
      });
      Object.assign(this, {
        [key]: value,
      });
    }
  }

  slug(plural = true): string {
    return kebab(this.constructor.name + (plural ? 's' : '')).toLowerCase();
  }

  directSlug(): string {
    return `${this.slug()}${this.data.uuid ? '/' + this.data.uuid + '/' : ''}`;
  }

  singularSlug(): string {
    return this.slug(false);
  }

  pluralSlug(): string {
    let slug = this.slug();
    const parent = this.parent();
    if (parent) {
      slug = parent.resourceSlug() + slug;
    }
    return slug;
  }

  resourceSlug(append?: string): string {
    let slug = `${this.slug()}${this.data.uuid ? '/' + this.data.uuid + '/' : ''}`;

    if (append) {
      slug = slug.concat(append);
    }

    const parent = this.parent();
    if (parent) {
      slug = parent.resourceSlug() + slug;
    }
    return slug;
  }

  exists(): boolean {
    return !!this.data && !!this.data.uuid;
  }

  relations(): ModelRelations {
    return {};
  }

  appends(): AppendedAttributes {
    return {};
  }

  resetTempData(): void {
    this._tempData = this.data;
  }

  hasLazy<M extends BaseModel, D = M['data']>(
    type: new (data: D) => M,
    config = {
      nested: true,
    },
    key?: keyof ModelData
  ): Builder<M> {
    const relation = new type({} as D);

    if (config.nested) {
      relation.setParent(this);
    } else {
      this.setParent(null);
      relation.setParent(this);
    }

    return relation.builder();
  }

  hasMany<M extends BaseModel, D = M['data']>(type: new (data: D) => M, key?: keyof ModelData): M[] {
    const slug = key ?? (camel(new type({} as D).slug()) as keyof ModelData);
    const data = this.data[slug] as unknown as D[];

    if (data) {
      const relations = data.map((data: D) => {
        const relation = new type(data);
        relation.setParent(this);
        return relation;
      });
      return relations;
    }

    return [];
  }

  hasOne<C extends HasOneConfig<ModelData>, M extends BaseModel, D = M['data']>(
    type: new (data: D, options?: ConstructorOptions) => M,
    config = {
      nullable: false,
    } as C
  ): HasOneReturn<C, ModelData, M> {
    const slug = config?.key ?? (camel(new type({} as D).slug(false)) as keyof ModelData);
    const data = this.data[slug] as unknown as D;

    if (!data) {
      return null as HasOneReturn<C, ModelData, M>;
    }
    const relation = new type(data, { relations: config?.loadRelations ?? true });

    relation.setParent(this);
    return relation as HasOneReturn<C, ModelData, M>;
  }

  belongsTo<C extends HasOneConfig<ModelData>, M extends BaseModel, D = M['data']>(
    type: new (data: D, options?: ConstructorOptions) => M,
    config = {
      nullable: false,
    } as C
  ): HasOneReturn<C, ModelData, M> {
    const slug = config?.key ?? (camel(new type({} as D).slug(false)) as keyof ModelData);
    const data = this.data[slug] as unknown as D;

    if (!data) {
      return null as HasOneReturn<C, ModelData, M>;
    }
    const relation = new type(data, { relations: config?.loadRelations ?? true });

    return relation as HasOneReturn<C, ModelData, M>;
  }

  /**
   * TODO
   * Can this be deprecated?
   */
  setParent<M extends BaseModel>(parent: M | null): void {
    this.parent = () => (parent?.asParent ? parent : null);
  }

  get messages(): Messages {
    return {
      updated: capitalizeFirstLetter(`${this.singularSlug()} updated.`),
      created: capitalizeFirstLetter(`${this.singularSlug()} created.`),
      deleted: capitalizeFirstLetter(`${this.singularSlug()} deleted.`),
    };
  }

  serialise(data?: Partial<ModelData>): ModelData {
    const serialised = {} as ModelData;
    for (const [key, value] of Object.entries(data ?? this.tempData)) {
      let serialisedValue = value;
      if (value?.uuid) {
        serialisedValue = value.uuid;
      } else if (Array.isArray(value)) {
        serialisedValue = value.map((item) => {
          return item.uuid ? item.uuid : item;
        });
      }
      Object.assign(serialised, {
        [key]: serialisedValue,
      });
    }
    return serialised;
  }
}
