import { carMongooseModel } from '../../../models/schemas/CarsSchemas';
import { mockCreateCar, mockNewCar } from '../mocks';
import CarModel from '../../../models/CarsModel';
import * as sinon from 'sinon';
import chai from 'chai';

const { expect } = chai;

describe('Test [CarsModel]', () => {

  describe('Create', () => {
    before(async () => {
      sinon.stub(carMongooseModel, 'create').resolves(mockCreateCar);
    });
    
    after(() => {
      sinon.restore();
    })
    
    it('Success', async () => {
      const carModel = new CarModel(carMongooseModel);
      const createCar = await carModel.create(mockNewCar)

      expect(createCar).deep.equal(mockCreateCar)
    });
  })
});