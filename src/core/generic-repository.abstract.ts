export abstract class IGenericRepository<T> {
  // Create
  abstract create(item: T): Promise<T>;

  // Get
  abstract get(id: string): Promise<T>;

  abstract getOneBy(key: any, value: any): Promise<T>;

  abstract getAll(): Promise<T[]>;

  abstract getAllBy(key: string, value: any): Promise<T[]>;

  // Update
  abstract update(id: string, item: T): Promise<T>;

  abstract updateOneBy(key: any, value: any, item: T): Promise<T>;

  // Delete
  abstract delete(id: string): Promise<T>;

  abstract deleteOneBy(key: any, value: any): Promise<T>;

  abstract deleteAllBy(key: string, value: any): Promise<T[]>;
}
