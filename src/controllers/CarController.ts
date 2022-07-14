import { NextFunction, Request, Response } from 'express';
import GenericController from './GenericController'; // controller
import { IRequestBody, ResponseErr } from './interfaces'; // controller
import { CarDoc } from '../models/schemas/CarsSchemas'; // model
import { IGenericService } from '../services/interfaces'; // service

export default class CarController extends GenericController<CarDoc> {
  private _route: string;

  constructor(
    service: IGenericService<CarDoc>,
    route = '/cars',
  ) {
    super(service);
    this._route = route;
  }

  get route() { return this._route; }

  create = async (
    req: IRequestBody<CarDoc>,
    res: Response<CarDoc | ResponseErr>,
    next: NextFunction,
  ): Promise<typeof res | void> => {
    try {
      const { body } = req;

      const car = await this._service.create(body);

      if (!car) return res.status(500).json({ error: this.errors.internal });

      if ('error' in car) return res.status(400).json(car);

      return res.status(201).json(car);
    } catch (error) {
      next(this.errors.internal);
    }
  };

  read = async (
    _req: Request,
    res: Response<CarDoc[] | ResponseErr>,
    next: NextFunction,
  ): Promise<typeof res | void> => {
    try {
      const cars = await this._service.read();

      if (!cars) return res.status(500).json({ error: this.errors.internal });

      return res.status(200).json(cars);
    } catch (error) {
      next(this.errors.internal);
    }
  };

  readOne = async (
    req: Request<{ id: string; }>,
    res: Response<CarDoc | ResponseErr>,
    next: NextFunction,
  ): Promise<typeof res | void> => {
    try {
      const { id } = req.params;

      if (id.length < 24) {
        return res.status(400).json({ error: this.errors.invalidId });
      }

      const car = await this._service.readOne(id);

      if (!car) return res.status(404).json({ error: this.errors.notFound });

      return res.status(200).json(car);
    } catch (error) {
      next(this.errors.internal);
    }
  };

  update = async (
    req: IRequestBody<{ id: string; } & CarDoc>,
    res: Response<CarDoc | ResponseErr>,
    next: NextFunction,
  ): Promise<typeof res | void> => {
    try {
      const { id } = req.params;
      const { body } = req;

      if (id.length < 24) {
        return res.status(400).json({ error: this.errors.invalidId }); 
      }

      const car = await this._service.update(id, body);

      if (!car) return res.status(404).json({ error: this.errors.notFound });

      if ('error' in car) return res.status(400).json(car);

      return res.status(200).json(car);
    } catch (error) {
      next(this.errors.internal);
    }
  };

  delete = async (
    req: Request<{ id: string; }>,
    res: Response<CarDoc | ResponseErr>,
    next: NextFunction,
  ): Promise<typeof res | void> => {
    try {
      const { id } = req.params;

      if (id.length < 24) {
        return res.status(400).json({ error: this.errors.invalidId });
      }

      const car = await this._service.delete(id);

      if (!car) return res.status(404).json({ error: this.errors.notFound });

      return res.status(204).json();
    } catch (error) {
      next(this.errors.internal);
    }
  };
}
