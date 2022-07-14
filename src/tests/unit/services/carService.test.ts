import { CarDoc, carMongooseModel } from '../../../models/schemas/CarsSchemas';
import GenericModel from '../../../models/GenericModel';
import CarService from '../../../services/CarService';
import { mockCreateCar, mockNewCar } from '../mocks';
import chai from 'chai';

const { expect } = chai;

describe('Test [CarService]', () => {
  class MockCarModel extends GenericModel<CarDoc> {
    create = async (_entity: CarDoc): Promise<CarDoc> => {
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

  describe('Create', () => {
    it('Success', async () => {
      const carService = new CarService(new MockCarModel(carMongooseModel));
      const createCar = await carService.create(mockNewCar);

      expect(createCar).deep.equal(mockCreateCar)
    });
  })
});