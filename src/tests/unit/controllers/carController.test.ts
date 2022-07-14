import { IGenericService } from '../../../services/interfaces';
import CarController from '../../../controllers/CarController';
import { CarDoc } from '../../../models/schemas/CarsSchemas';
import { NextFunction, Request, Response } from 'express';
import { mockCreateCar } from '../mocks';
import chaiHttp = require('chai-http');
import * as sinon from 'sinon';
import chai from 'chai';

chai.use(chaiHttp);

const { expect } = chai;

describe('Test [CarController]', () => {
  class MockCarService implements IGenericService<CarDoc> {
    create = async (): Promise<CarDoc> => {
      return mockCreateCar;
    }
    
    read = async (): Promise<CarDoc[]> => {
      return [];
    }
    readOne = async (id: string): Promise<CarDoc | null> => {
      return null;
    }
    update = async (id: string, entity: CarDoc): Promise<CarDoc | null> => {
      return entity;
    }
    delete = async (id: string): Promise<CarDoc | null> => {
      return null;
    }
  }

  describe('Create', async () => {
    const req = {} as Request;
    const res = {} as Response;
    const next = () => ({}) as NextFunction;

    before(async () => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
      req.body = mockCreateCar;
    });

    it('Succsess', async () => {
      const carController = new CarController(new MockCarService());
      await carController.create(req, res, next);

      expect((res.status as sinon.SinonStub).calledWith(201));
      expect((res.json as sinon.SinonStub).calledWith(mockCreateCar));
    });
  });
});