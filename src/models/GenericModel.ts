import { Model, Document, isValidObjectId } from 'mongoose';
import { Model as IGenericModel } from '../interfaces/ModelInterface';

abstract class GenericModel<T> implements IGenericModel<T> {
  protected _model: Model<T & Document>;

  constructor(modelMongoose: Model<T & Document>) {
    this._model = modelMongoose;
  }

  async create(entity: T): Promise<T> {
    return this._model.create(entity);
  }

  async read(): Promise<T[]> {
    return this._model.find();
  }

  async readOne(id: string): Promise<T | null> {
    if (!isValidObjectId(id)) return null;
    return this._model.findById(id);
  }

  async update(id: string, entity: T): Promise<T | null> {
    if (!isValidObjectId(id)) return null;
    return this._model.findOneAndUpdate({ _id: id }, entity, {
      returnOriginal: false,
    });
  }

  async delete(id: string): Promise<T | null> {
    if (!isValidObjectId(id)) return null;
    const deleted = await this._model.findOneAndDelete({ _id: id });
    return deleted;
  }
}

export default GenericModel;