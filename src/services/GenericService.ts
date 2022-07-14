import { Model } from '../interfaces/ModelInterface';
import { IZodError, IGenericService } from './interfaces';

export default abstract class Service<T> implements IGenericService<T> {
  constructor(protected _model: Model<T>) {}

  create = async (entity: T): Promise< T | null | IZodError> => 
    this._model.create(entity);

  read = async (): Promise<T[]> => this._model.read();

  readOne = async (id: string): Promise<T | null> => 
    this._model.readOne(id);

  update = async (id: string, entity: T): Promise<T | null | IZodError> =>
    this._model.update(id, entity);

  delete = async (id: string): Promise<T | null> =>
    this._model.delete(id);
}