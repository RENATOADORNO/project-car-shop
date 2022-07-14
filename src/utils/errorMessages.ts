export type TErrorMessages = {
  invalidId: string,
  internal: string,
  requiredId: string,
  notFound: string,
  badRequest: string,
};

const errorMessages: TErrorMessages = {
  invalidId: 'Id must have 24 hexadecimal characters',
  internal: 'Internal Server Error',
  requiredId: 'Id is required',
  notFound: 'Object not found',
  badRequest: 'Bad request',
};

export default errorMessages;