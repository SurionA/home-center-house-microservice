'use strict';

/**
 * @description House Model
 * @param House
 */
import House from '../house/house.model';

/**
 * @description MongoDB connector
 * @param mongoose
 */
import mongoose from 'mongoose';

/**
 * @description Promise library
 * @param Promise
 */
import Promise from 'bluebird';

/**
 * @description MongoDB Schema
 * @param Schema
 */
import { Schema } from 'mongoose';

// Apply bluebird Promise as Mongoose Promise library
mongoose.Promise = Promise;

/**
 * @description Room MongoDB Schema
 * @param RoomSchema
 * @const
 */
const RoomSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  house: {
    type: Schema.ObjectId,
    ref: 'house',
    required: true,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date
  }
});

/**
 * @description Virtual Method that returns room data
 */
RoomSchema
  .virtual('room')
  .get(function () {
    return {
      'id': this._id,
      'name': this.name
    };
  });

/**
 * @description Validate if name field is not empty
 */
RoomSchema
  .path('name')
  .validate(name => name.length, 'Name cannot be empty');

/**
 * @description Validate if house field is not empty
 */
RoomSchema
  .path('house')
  .validate(house => house.length, 'House cannot be empty');

  /**
   * @description Validate if house exit
   */
  RoomSchema
    .path('house')
    .validate((house, respond) => {
      return House.findById({_id: house}).exec()
        .then(house => {
          if (house) return respond(true);
          return respond(false);
        })
    }, 'The specified house does not exist.');

/**
 * @description Validate if name is not taken
 */
RoomSchema
  .path('name')
  .validate(function (name, respond) {
    const self = this;
    return self.constructor.findOne({ name }).exec()
      .then(name => {
        if (name) return respond(false);
        return respond(true);
      })
  }, 'The specified name is already in use.');

/**
 * @description Every update set new updatedAt date
 */
RoomSchema
  .post('update', function () {
    this.update({},{
      $set: {
        updatedAt: new Date()
      }
    });
  });

/**
 * @exports roomSchema
 * @default
 */
export default mongoose.model('Room', RoomSchema);
