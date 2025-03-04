import { Router } from 'express';
import homecontroller from './controllers/homeController.js';
import authController from './controllers/authController.js';
import publicationsController from './controllers/pubController.js';
import searchController from './controllers/searchController.js';

const routes = Router();

routes.use('/', homecontroller);
routes.use('/auth', authController);
routes.use('/publications', publicationsController);
routes.use('/search', searchController);

export default routes;