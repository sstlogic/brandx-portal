import type { BaseModel } from './BaseModel';
import type { Builder } from './Builder';

export type ModelRelations<M extends BaseModel = BaseModel> = {
  [K in keyof Partial<M>]: M[K];
};

export type AppendedAttributes<M extends BaseModel = BaseModel> = {
  [K in keyof Partial<M>]: (data?: unknown) => M[K];
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export interface MetaBaseModel<M extends BaseModel, D> {
  new (): M;
  builder<M extends BaseModel, D = NonNullable<M['data']>>(this: MetaBaseModel<M, D>): Builder<M, D>;
}

export interface BaseModelData {
  uuid: string;
}

type MessageTypes = 'updated' | 'created' | 'deleted';

export type Messages = {
  [key in MessageTypes]: string;
};

export type ConstructorOptions = {
  relations?: boolean;
  loadedRelations?: string[];
};

export type Failable<M> = void | null | M;

export type UpdateData<D> = {
  [K in keyof Partial<D>]: D[K] extends BaseModelData ? D[K] | string : D[K] | string;
};

export type NonnullableHasOneConfig<D> = {
  key?: keyof D;
  loadRelations?: boolean;
  nullable: false;
};

export type NullableHasOneConfig<D> = {
  key?: keyof D;
  loadRelations?: boolean;
  nullable: true;
};

export type HasOneConfig<D> = NonnullableHasOneConfig<D> | NullableHasOneConfig<D>;

export type HasOneReturn<Config, Data, Model> = Config extends NonnullableHasOneConfig<Data>
  ? Model
  : Config extends NullableHasOneConfig<Data>
  ? Model | null
  : never;
