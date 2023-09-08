import { BaseModel } from './BaseModel';
import { BaseModelData, ConstructorOptions } from './types';
import { IAPI } from '@/composables/useApi/types';
import { Query } from './Query';
import { snakeKeys } from '@/utils/case';
import { useStatus } from '@/composables/useStatus';

interface BaseData extends BaseModelData {
  uuid: string;
}

type CreateData = Omit<BaseData, 'uuid'>;

export interface PaginatedResponse<T> {
  data: T;
  meta: {
    total: number;
  };
}

export type Appends<M extends BaseModel> = keyof M & string;

export type QueryCallback<B> = (query: B) => B;

// export type WhenOneOfCallback<B> = (value: boolean, callback: QueryCallback<B>) => B;

export type WhenFirstOfItem<B> = [value: boolean, callback: QueryCallback<B>];

export type WhenFirstOf<B> = WhenFirstOfItem<B>[];

export type TableOptions = {
  page: number;
  itemsPerPage: number;
};
export class Builder<M extends BaseModel, D = BaseModelData> {
  selected?: keyof D;
  pageNumber?: number;
  slugOverride?: string;

  constructor(
    public model: M,
    public modelConstructor: new (data: D, options?: ConstructorOptions) => M,
    public $api: IAPI,
    public status = useStatus(),
    public query = new Query()
  ) {
    this.model = model;
    this.modelConstructor = modelConstructor;
  }

  /**
   * Query Functions
   *
   * These functions will modify the query class in prepared for the query execution
   */

  slug(slug: string): this {
    this.slugOverride = slug;

    return this;
  }

  page(page: number): this {
    this.query.page(page);
    return this;
  }

  select(col: keyof D): this {
    this.selected = col;
    return this;
  }

  when(value: boolean, callback: QueryCallback<this>): this {
    if (value) {
      callback(this);
    }

    return this;
  }

  whenFirst(callbacks: WhenFirstOf<this>, fallback?: QueryCallback<this>): this {
    let result = false;
    for (const [, callback] of callbacks.entries()) {
      if (callback[0]) {
        callback[1](this);
        result = true;
        break;
      }
    }

    if (!result && fallback) {
      fallback(this);
    }

    return this;
  }

  where<T>(property: string, value: T, nullable = false): this {
    if (!nullable && value === null) {
      return this;
    }

    this.query.where(property, value);

    return this;
  }

  sortBy<T>(property: T, desc = false): this {
    this.query.sortBy(property, desc);
    return this;
  }

  with(...include: string[]): this {
    this.query.with(...include);

    return this;
  }

  append(...append: Appends<M>[]): this {
    this.query.append(...append);

    return this;
  }

  /**
   * Utility Functions
   *
   * These functions are used by the builder class internally
   */
  mapToModels(models: D[]): M[] {
    if (!models || models.length == 0) {
      return [];
    }

    return models.map((data: D) => {
      return this.newModel(data);
    });
  }

  newModel(data: D): M {
    const model = new this.modelConstructor(data, {
      relations: this.model.options.relations,
      loadedRelations: this.query.includes ?? [],
    });

    const parent = this.model.parent();
    if (parent) {
      model.setParent(parent);
    }
    return model;
  }

  /**
   * Final Methods
   *
   * These methods will finalise the query and execute it.
   */

  async fromTable(options: TableOptions): Promise<PaginatedResponse<M[]>> {
    return this.paginate(options.page, options.itemsPerPage);
  }

  async refresh(slug: string): Promise<M> {
    const query = this.query.toString();

    const response = await this.$api.get(slug + query);

    return this.newModel(response.data);
  }

  async find(uuid: string): Promise<M> {
    const slug = this.model.resourceSlug();

    const query = `/${slug}/${uuid}/${this.query.toString()}`;
    const response = await this.$api.get(query);

    return this.newModel(response.data);
  }

  async paginate(page?: number, perPage?: number): Promise<PaginatedResponse<M[]>> {
    if (page) {
      this.query.page(page);
    }

    if (perPage) {
      this.query.perPage(perPage);
    }

    const response = await this.getRaw<PaginatedResponse<D[]>>();

    return {
      data: this.mapToModels(response.data),
      meta: response.meta,
    };
  }

  async getAll(): Promise<M[]> {
    this.query.perPage(-1);
    this.query.page(1);

    const response = await this.getRaw();

    return this.mapToModels(response.data);
  }

  async get(): Promise<M[]> {
    const response = await this.paginate();

    return response.data;
  }

  async update(data: BaseData, config = { message: true }): Promise<M> {
    const query = this.model.resourceSlug();

    const response = await this.$api.put(query, snakeKeys<BaseData>(data));

    if (config.message) {
      this.status.setMessage(this.model.messages.updated);
    }

    return this.newModel(response);
  }

  async delete(): Promise<M> {
    const query = this.model.resourceSlug();

    const response = await this.$api.$delete(`/${query}`);

    this.status.setMessage(this.model.messages.deleted);

    return this.newModel(response);
  }

  async directDelete(): Promise<M> {
    const query = this.model.directSlug();

    const response = await this.$api.$delete(`/${query}`);

    this.status.setMessage(this.model.messages.updated);

    return new this.modelConstructor(response);
  }

  async create(data: CreateData | FormData): Promise<M> {
    const query = this.model.resourceSlug();

    let options = {};

    if (data instanceof FormData) {
      options = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
    } else {
      data = snakeKeys<CreateData>(data);
    }

    const response = await this.$api.post(query, data, options);

    this.status.setMessage(this.model.messages.created);

    return this.newModel(response.data);
  }

  async getRaw<T = PaginatedResponse<D[]>>(): Promise<T> {
    const slug = this.slugOverride ?? this.model.resourceSlug();

    const query = `/${slug}${this.query.toString()}`;
    const response = await this.$api.get<T>(query);

    return response;
  }
}
