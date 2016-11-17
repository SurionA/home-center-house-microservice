'use strict';

/**
 * @description House Events Emitter
 * @param HouseEvents
 */
import HouseEvents from './house.events';

/**
 * @description House Model Events to emit
 * @param events
 */
const events = ['save', 'remove'];

/**
 * @description Broadcast events to client
 * @function register
 * @param socket - Socket library
 */
function register(socket) {
  for (let i = 0, eventsLength = events.length; i < eventsLength; i++) {
    const event = events[i];
    const listener = createListener('house:' + event, socket);

    HouseEvents.on(event, listener);
    socket.on('disconnect', removeListener(event, listener));
  }
}

/**
 * @description Emit Model event to client
 * @function createListener
 * @param event - Model event
 * @param socket - Socket library
 */
function createListener(event, socket) {
  return doc => {
    socket.emit(event, doc);
  };
}

/**
 * @description Remove event emitter to client
 * @function removeListener
 * @param event - Model event
 * @param listener - Socket Listener
 */
function removeListener(event, listener) {
  return () => {
    HouseEvents.removeListener(event, listener);
  };
}

/**
 * @export register
 * @default
 */
export default register;
