'use strict';

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
 * @description House MongoDB Schema
 * @param HouseSchema
 * @const
 */
const HouseSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  address: {
    type: String,
    required: true,
    trim: true
  },
  town: {
    type: String,
    required: true,
    trim: true
  },
  country: {
    type: String,
    required: true,
    trim: true
  },
  isPrincipalResidence: {
    type: Boolean,
    default: false
  },
  urlDataTownWeather: {
    type: String,
    required: false,
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
 * @description Virtual Method that returns house data
 */
HouseSchema
  .virtual('house')
  .get(function () {
    return {
      'id': this._id,
      'name': this.name
    };
  });

/**
 * @description Validate if name field is not empty
 */
HouseSchema
  .path('name')
  .validate(name => name.length, 'Name cannot be empty');

/**
 * @description Validate if name is not taken
 */
HouseSchema
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
HouseSchema
  .post('update', function () {
    this.update({},{
      $set: {
        updatedAt: new Date()
      }
    });
  });

/**
 * @exports houseSchema
 * @default
 */
export default mongoose.model('House', HouseSchema);
