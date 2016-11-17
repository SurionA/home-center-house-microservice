'use strict';

/**
 * @description Express Framework Router
 * @param Router
 */
import { Router } from 'express';

/**
 * @description House route Controller
 * @param HouseController
 */
import * as HouseController from './house.controller';

let router = new Router();

router.get('/', HouseController.index);
router.get('/:id', HouseController.show);
router.post('/', HouseController.create);
router.put('/:id', HouseController.update);
router.patch('/:id', HouseController.update);
router.delete('/:id', HouseController.destroy);

/**
 * @description Configured router for House Routes
 * @exports router
 * @default
 */
export default router;
