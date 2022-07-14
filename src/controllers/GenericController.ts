import { NextFunction, Request, Response } from 'express';
import { IGenericService } from '../services/interfaces';
import { IRequestBody, ResponseErr } from './interfaces';
import errorMessages from '../utils/errorMessages';

export default abstract class GenericController<T> {
  abstract route: string;

  protected errors = errorMessages;

  constructor(protected _service: IGenericService<T>) { }

  abstract create(
    req: IRequestBody<T>,
    res: Response<T | ResponseErr>,
    next: NextFunction,
  ): Promise<typeof res | void>;

  abstract read(
    req: Request,
    res: Response<T[] | ResponseErr>,
    next: NextFunction,
  ): Promise<typeof res | void>;

  abstract readOne(
    req: Request<{ id: string; }>,
    res: Response<T | ResponseErr>,
    next: NextFunction,
  ): Promise<typeof res | void>;

  abstract update(
    req: IRequestBody<{ id: string; } & T>,
    res: Response<T | ResponseErr>,
    next: NextFunction,
  ): Promise<typeof res | void>;

  abstract delete(
    req: Request<{ id: string; }>,
    res: Response<T | ResponseErr>,
    next: NextFunction,
  ): Promise<typeof res | void>;
}
