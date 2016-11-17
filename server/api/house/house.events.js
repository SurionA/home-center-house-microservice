'use strict';

/**
 * @description Events Emitter
 * @param EventEmitter
 */
import { EventEmitter } from 'events';

/**
 * @description House MongoDB schema
 * @param House
 */
import House from './house.model';

/**
 * @description House Events Emitter
 * @param HouseEvents
 */
const HouseEvents = new EventEmitter();

HouseEvents.setMaxListeners(0);

/**
 * @description Events to listen on
 * @param events
 */
const events = {
  'afterCreate': 'save',
  'afterUpdate': 'update',
  'afterDestroy': 'remove'
};

/**
 * @description Emit correct event on hooks
 */
for (const e in events) {
  const event = events[e];
  House.schema.post(event, emitEvent(event));
}

/**
 * @description Emit correct event
 * @function emitEvent
 * @function emitEvent
 * @param event - Event to emit
 */
function emitEvent(event) {
  return (doc, next) => {
    HouseEvents.emit(event + ':' + doc._id, doc);
    HouseEvents.emit(event, doc);
    next();
  }
}

/**
 * @export HouseEvents
 * @default
 */
export default HouseEvents;
