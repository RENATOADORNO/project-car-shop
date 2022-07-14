import { CarDoc, carMongooseModel } from './models/schemas/CarsSchemas';
import CarController from './controllers/CarController';
import CarService from './services/CarService';
import CarModel from './models/CarsModel';
import CarRouter from './routes/car.routes';
import App from './app';

const server = new App();

const carModel = new CarModel(carMongooseModel);
const carService = new CarService(carModel);
const carController = new CarController(carService);

const carRouter = new CarRouter<CarDoc>();
carRouter.addRoute(carController);
server.addRouter(carRouter.router);

export default server;
