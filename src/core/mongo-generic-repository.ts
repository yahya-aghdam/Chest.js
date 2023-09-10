import { Model } from 'mongoose';
import { IGenericRepository } from './';

export class MongoGenericRepository<T> implements IGenericRepository<T> {
  private _repository: Model<T>;
  private _populateOnFind: string[];

  constructor(repository: Model<T>, populateOnFind: string[] = []) {
    this._repository = repository;
    this._populateOnFind = populateOnFind;
  }

  // Create
  create(item: T): Promise<T> {
    return this._repository.create(item);
  }

  // Get
  get(id: string): Promise<any> {
    return this._repository.findById(id).populate(this._populateOnFind).exec();
  }

  getOneBy(key: any, value: any): Promise<any> {
    return this._repository
      .findOne({ [key]: value })
      .populate(this._populateOnFind)
      .exec();
  }

  getAll(): Promise<T[]> {
    return this._repository.find().populate(this._populateOnFind).exec();
  }

  getAllBy(key: any, value: any): Promise<T[]> {
    return this._repository
      .find({ [key]: value })
      .populate(this._populateOnFind)
      .exec();
  }

  // Update
  update(id: string, item: T): Promise<T> {
    return this._repository.findOneAndUpdate({ custom_id: id }, item);
  }

  updateOneBy(key: any, value: any, item: T): Promise<any> {
    return this._repository
      .updateOne({ [key]: value },item)
      .populate(this._populateOnFind)
      .exec();
  }

  // Delete
  delete(id: string): Promise<any> {
    return this._repository
      .findByIdAndDelete(id)
      .populate(this._populateOnFind)
      .exec();
  }

  deleteOneBy(key: any, value: any): Promise<any> {
    return this._repository
      .deleteOne({ [key]: value })
      .populate(this._populateOnFind)
      .exec();
  }

  deleteAllBy(key: any, value: any): Promise<any> {
    return this._repository
      .deleteMany({ [key]: value })
      .populate(this._populateOnFind)
      .exec();
  }
}
