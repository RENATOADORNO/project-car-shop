import { ZodError } from 'zod';

export interface IZodError {
  error: ZodError;
}

export interface IGenericService<T> {
  create(entity: T): Promise< T | null | IZodError>
  read(): Promise<T[]>
  readOne(id:string): Promise<T | null>
  update(id: string, entity: T): Promise<T | null | IZodError> 
  delete(id: string): Promise<T | null>
}