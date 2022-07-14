import { Request } from 'express';

export type ResponseErr = {
  error: unknown;
};

export interface IRequestBody<T> extends Request {
  body: T;
}