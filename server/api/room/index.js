'use strict';

/**
 * @description Express Framework Router
 * @param Router
 */
import { Router } from 'express';

/**
 * @description Room route Controller
 * @param RoomController
 */
import * as RoomController from './room.controller';

let router = new Router();

router.get('/', RoomController.index);
router.get('/:id', RoomController.show);
router.post('/', RoomController.create);
router.put('/:id', RoomController.update);
router.patch('/:id', RoomController.update);
router.delete('/:id', RoomController.destroy);

/**
 * @description Configured router for Room Routes
 * @exports router
 * @default
 */
export default router;
