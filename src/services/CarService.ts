import { CarSchema } from '../interfaces/CarInterface';
import GenericService from './GenericService';
import { CarDoc } from '../models/schemas/CarsSchemas';
import GenericModel from '../models/GenericModel';
import { IZodError } from './interfaces';

export default class CarService extends GenericService<CarDoc> {
  constructor(_mongoModel: GenericModel<CarDoc>) {
    super(_mongoModel);
    this._model = _mongoModel;
  }

  create = async (entity: CarDoc): Promise<CarDoc | null | IZodError> => {
    const parsed = CarSchema.safeParse(entity);

    if (!parsed.success) {
      return { error: parsed.error };
    }

    return this._model.create(entity);
  };

  read = async (): Promise<CarDoc[]> => this._model.read();

  readOne = async (id: string): Promise<CarDoc | null> =>
    this._model.readOne(id);

  update = async (id: string, entity: CarDoc): 
  Promise<CarDoc | null | IZodError> => {
    const parsed = CarSchema.safeParse(entity);

    if (!parsed.success) {
      return { error: parsed.error };
    }

    return this._model.update(id, entity);
  };

  delete = async (id: string): Promise<CarDoc | null> =>
    this._model.delete(id);
}