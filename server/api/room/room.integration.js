'use strict';

import request from 'supertest';
import { expect } from 'chai';
import Room from './room.model';

let app = require('../../app');
let newRoom;
let newHouse;

describe('Room API:', () => {

  before(done => {
    request(app)
       .post('/api/houses')
       .send({
         name: 'House Test',
         address: 'My Street name',
         town: 'My Town',
         country: 'My Country'
       })
       .expect(201)
       .expect('Content-Type', /json/)
       .end((err, res) => {
         if (err) return done(err);
         newHouse = res.body;
         Room.remove({})
           .then(() => done())
       });
  });

  after(done => {
   request(app)
     .delete('/api/houses/' + newHouse._id)
     .expect(204)
     .end((err, res) => {
       if (err) return done(err);
       done();
     });
  });

  describe('GET /api/rooms', () => {
    let rooms;

    beforeEach(done => {
      request(app)
        .get('/api/rooms')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) return done(err);
          rooms = res.body;
          done();
        });
    });

    it('should respond with JSON array', () => {
      expect(rooms).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/rooms', () => {
    beforeEach(done => {
      request(app)
        .post('/api/rooms')
        .send({
          name: 'Room Test',
          house: newHouse._id
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) return done(err);
          newRoom = res.body;
          done();
        });
    });

    it('should respond with the newly created room', () => {
      expect(newRoom).to.be.instanceOf(Object);
      expect(newRoom).ownProperty('_id');
      expect(newRoom._id).to.not.be.undefined;
      expect(newRoom._id).to.not.be.null;
      expect(newRoom).ownProperty('name');
      expect(newRoom.name).to.equal('Room Test');
      expect(newRoom).ownProperty('house');
      expect(newRoom.house).to.equal(newHouse._id);
      expect(newRoom).ownProperty('createdAt');
      expect(newRoom.createdAt).to.not.be.undefined;
      expect(newRoom.createdAt).to.not.be.null;
    });

  });

  describe('GET /api/rooms/:id', () => {
    let room;

    beforeEach(done => {
      request(app)
        .get('/api/rooms/' + newRoom._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) return done(err);
          room = res.body;
          done();
        });
    });

    afterEach(() => {
      room = {};
    });

    it('should respond with the requested room', () => {
      expect(room).to.be.instanceOf(Object);
      expect(room).ownProperty('_id');
      expect(room._id).to.not.be.undefined;
      expect(room._id).to.not.be.null;
      expect(room).ownProperty('name');
      expect(room.name).to.equal('Room Test');
      expect(room).ownProperty('createdAt');
      expect(room.createdAt).to.not.be.undefined;
      expect(room.createdAt).to.not.be.null;
    });

  });

  describe('PUT /api/rooms/:id', () => {
    let updatedRoom;

    beforeEach(done => {
      request(app)
        .put('/api/rooms/' + newRoom._id)
        .send({

          _id: newRoom._id,
          name: 'Updated Room'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) return done(err);
          updatedRoom = res.body;
          done();
        });
    });

    afterEach(() => {
      updatedRoom = {};
    });

    it('should respond with the updated room', () => {
      expect(updatedRoom).to.be.instanceOf(Object);
      expect(updatedRoom).ownProperty('_id');
      expect(updatedRoom._id).to.not.be.undefined;
      expect(updatedRoom._id).to.not.be.null;
      expect(updatedRoom).ownProperty('name');
      expect(updatedRoom.name).to.equal('Updated Room');
      expect(updatedRoom).ownProperty('createdAt');
      expect(updatedRoom.createdAt).to.not.be.undefined;
      expect(updatedRoom.createdAt).to.not.be.null;
      // expect(updatedRoom).ownProperty('updatedAt');
      // expect(updatedRoom.updatedAt).to.not.be.undefined;
      // expect(updatedRoom.updatedAt).to.not.be.null;
    });

  });

  describe('PATCH /api/rooms/:id', () => {
    let patchedRoom;

    beforeEach(done => {
      request(app)
        .put('/api/rooms/' + newRoom._id)
        .send({
          _id: newRoom._id,
          name: 'Patched Room'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) return done(err);
          patchedRoom = res.body;
          done();
        });
    });

    afterEach(() => {
      patchedRoom = {};
    });

    it('should respond with the updated room', () => {
      expect(patchedRoom).to.be.instanceOf(Object);
      expect(patchedRoom).ownProperty('_id');
      expect(patchedRoom._id).to.not.be.undefined;
      expect(patchedRoom._id).to.not.be.null;
      expect(patchedRoom).ownProperty('name');
      expect(patchedRoom.name).to.equal('Patched Room');
      expect(patchedRoom).ownProperty('createdAt');
      expect(patchedRoom.createdAt).to.not.be.undefined;
      expect(patchedRoom.createdAt).to.not.be.null;
      // expect(patchedRoom).ownProperty('updatedAt');
      // expect(patchedRoom.updatedAt).to.not.be.undefined;
      // expect(patchedRoom.updatedAt).to.not.be.null;
    });

  });

  describe('DELETE /api/rooms/:id', () => {

    it('should respond with 204 on successful removal', done => {
      request(app)
        .delete('/api/rooms/' + newRoom._id)
        .expect(204)
        .end((err, res) => {
          if (err) return done(err);
          done();
        });
    });

    it('should respond with 404 when room does not exist', done => {
      request(app)
        .delete('/api/rooms/' + newRoom._id)
        .expect(404)
        .end((err, res) => {
          if (err) return done(err);
          done();
        });
    });

  });

});
