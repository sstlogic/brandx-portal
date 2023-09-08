import { snakeCase } from '@/utils/string';

type Filters = {
  key: string;
  value: string | number | boolean | null;
};

export class Query {
  public pageNumber: number | null = null;
  public pageLimit: number | null = null;
  public filters: Filters[] = [];
  public sort?: string;
  public sortDesc?: boolean;
  public includes?: string[];
  public appends?: string[];

  encode(string: string): string {
    const encode = ['+'];
    encode.forEach((char: string) => {
      string = string.replaceAll(char, encodeURIComponent(char));
    });
    return string;
  }

  toString(): string {
    const queries = [this.getPageQuery(), this.getFilters(), this.getSortBy(), this.getIncludes(), this.getAppends()];

    const string = queries.filter((query: string | null) => query).join('&');

    return string ? `?${this.encode(string)}` : '';
  }

  getFilters(): string {
    const string = this.filters
      .map((filter: Filters) => {
        return `filter[${filter.key}]=${filter.value}`;
      })
      .join('&');

    return string ?? '';
  }

  getSortBy(): string {
    if (this.sort === undefined) {
      return '';
    }

    return `sort=${this.sortDesc ? '' : '-'}${this.sort}`;
  }

  getIncludes(): string {
    if (this.includes === undefined) {
      return '';
    }

    let string = 'include=';

    string = string.concat(this.includes.join(','));

    return string;
  }

  getAppends(): string {
    if (this.appends === undefined) {
      return '';
    }

    let string = 'append=';

    string = string.concat(this.appends.join(','));

    return string;
  }

  getPageQuery(): string {
    let string = '';

    if (this.pageNumber) {
      string = string.concat(`page[number]=${this.pageNumber}`);
    } else {
      return '';
    }

    if (this.pageLimit) {
      string = string.concat(`&page[size]=${this.pageLimit}`);
    }

    return string;
  }

  isPaginated(): boolean {
    return this.pageNumber != null;
  }

  page(page: number): this {
    this.pageNumber = page;
    return this;
  }

  perPage(limit: number): this {
    this.pageLimit = limit;
    return this;
  }

  where<T>(property: string, value: T): this {
    this.filters.push({
      key: property,
      value: `${value}`,
    });

    return this;
  }

  sortBy<T>(property: T, desc: boolean): this {
    this.sortDesc = desc;
    const sort = property ? String(property) : undefined;
    if (!sort) {
      return this;
    }

    this.sort = snakeCase(sort.replaceAll('data.', ''));

    return this;
  }

  with(...include: string[]): this {
    this.includes = include;

    return this;
  }

  append(...append: string[]): this {
    this.appends = append;

    return this;
  }
}
