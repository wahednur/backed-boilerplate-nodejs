import { pick } from "../pagination/pick";
import { BuildQuery } from "../pagination/types";

type Order = "asc" | "desc";

export interface QueryConfig {
  searchableFields?: readonly string[];
  filterableFields?: readonly string[];
  sortableFields?: readonly string[];
  defaultLimit?: number;
  maxLimit?: number;
}

export class QueryBuilder {
  private readonly query: Record<string, unknown>;
  private readonly config: QueryConfig;

  private constructor(query: Record<string, unknown>, config: QueryConfig) {
    this.query = query;
    this.config = config;
  }
  static from(query: Record<string, unknown>, config: QueryConfig) {
    return new QueryBuilder(query ?? {}, config).build();
  }

  /** Global & generic */
  private build(): BuildQuery<Record<string, unknown>, Record<string, Order>> {
    return {
      where: this.buildWhere(),
      pagination: this.buildPagination(),
      orderBy: this.buildOrderBy(),
    };
  }

  /** Prisma query */
  private buildWhere(): Record<string, unknown> {
    const where: Record<string, unknown> = {};

    /** Prisma Type check for search  */
    if (typeof this.query.search === "string" && this.config.searchableFields) {
      where.OR = this.config.searchableFields.map((field) => ({
        [field]: {
          contains: this.query.search,
          mode: "insensitive",
        },
      }));
    }

    /** Filter */
    if (this.config.filterableFields) {
      Object.assign(where, pick(this.query, this.config.filterableFields));
    }
    return where;
  }

  /** Pagination */
  private buildPagination() {
    const page = Math.max(Number(this.query.page) || 1, 1);
    const limit = Math.min(
      Number(this.query.limit) || this.config.defaultLimit || 10,
      this.config.maxLimit || 50
    );
    return {
      skip: (page - 1) * limit,
      take: limit,
    };
  }

  /** Order function */
  private buildOrderBy(): Record<string, Order> | undefined {
    if (
      typeof this.query.sortBy === "string" &&
      this.config.sortableFields?.includes(this.query.sortBy)
    ) {
      return {
        [this.query.sortBy]: this.query.orderBy === "desc" ? "desc" : "asc",
      };
    }
    return undefined;
  }
}
