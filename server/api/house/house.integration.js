'use strict';

import request from 'supertest';
import { expect } from 'chai';
import House from './house.model';

let app = require('../../app');
let newHouse;

describe('House API:', () => {

  before(done => {
    House.remove({})
      .then(() => done())
  });

  describe('GET /api/houses', () => {
    let houses;

    beforeEach(done => {
      request(app)
        .get('/api/houses')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) return done(err);
          houses = res.body;
          done();
        });
    });

    it('should respond with JSON array', () => {
      expect(houses).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/houses', () => {
    beforeEach(done => {
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
          done();
        });
    });

    it('should respond with the newly created house', () => {
      expect(newHouse).to.be.instanceOf(Object);
      expect(newHouse).ownProperty('_id');
      expect(newHouse._id).to.not.be.undefined;
      expect(newHouse._id).to.not.be.null;
      expect(newHouse).ownProperty('name');
      expect(newHouse.name).to.equal('House Test');
      expect(newHouse).ownProperty('address');
      expect(newHouse.address).to.equal('My Street name');
      expect(newHouse).ownProperty('town');
      expect(newHouse.town).to.equal('My Town');
      expect(newHouse).ownProperty('country');
      expect(newHouse.country).to.equal('My Country');
      expect(newHouse).ownProperty('isPrincipalResidence');
      expect(newHouse.isPrincipalResidence).to.equal(false);
      expect(newHouse).not.to.have.ownProperty('urlDataTownWeather');
      expect(newHouse).ownProperty('createdAt');
      expect(newHouse.createdAt).to.not.be.undefined;
      expect(newHouse.createdAt).to.not.be.null;
    });

  });

  describe('GET /api/houses/:id', () => {
    let house;

    beforeEach(done => {
      request(app)
        .get('/api/houses/' + newHouse._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) return done(err);
          house = res.body;
          done();
        });
    });

    afterEach(() => {
      house = {};
    });

    it('should respond with the requested house', () => {
      expect(house).to.be.instanceOf(Object);
      expect(house).ownProperty('_id');
      expect(house._id).to.not.be.undefined;
      expect(house._id).to.not.be.null;
      expect(house).ownProperty('name');
      expect(house.name).to.equal('House Test');
      expect(house).ownProperty('address');
      expect(house.address).to.equal('My Street name');
      expect(house).ownProperty('town');
      expect(house.town).to.equal('My Town');
      expect(house).ownProperty('country');
      expect(house.country).to.equal('My Country');
      expect(house).ownProperty('isPrincipalResidence');
      expect(house.isPrincipalResidence).to.equal(false);
      expect(house).not.to.have.ownProperty('urlDataTownWeather');
      expect(house).ownProperty('createdAt');
      expect(house.createdAt).to.not.be.undefined;
      expect(house.createdAt).to.not.be.null;
    });

  });

  describe('PUT /api/houses/:id', () => {
    let updatedHouse;

    beforeEach(done => {
      request(app)
        .put('/api/houses/' + newHouse._id)
        .send({
          _id: newHouse._id,
          name: 'Updated House',
          isPrincipalResidence: true,
          urlDataTownWeather: 'url/data/town/weather'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) return done(err);
          updatedHouse = res.body;
          done();
        });
    });

    afterEach(() => {
      updatedHouse = {};
    });

    it('should respond with the updated house', () => {
      expect(updatedHouse).to.be.instanceOf(Object);
      expect(updatedHouse).ownProperty('_id');
      expect(updatedHouse._id).to.not.be.undefined;
      expect(updatedHouse._id).to.not.be.null;
      expect(updatedHouse).ownProperty('name');
      expect(updatedHouse.name).to.equal('Updated House');
      expect(updatedHouse).ownProperty('address');
      expect(updatedHouse.address).to.equal('My Street name');
      expect(updatedHouse).ownProperty('town');
      expect(updatedHouse.town).to.equal('My Town');
      expect(updatedHouse).ownProperty('country');
      expect(updatedHouse.country).to.equal('My Country');
      expect(updatedHouse).ownProperty('isPrincipalResidence');
      expect(updatedHouse.isPrincipalResidence).to.equal(true);
      expect(updatedHouse).ownProperty('urlDataTownWeather');
      expect(updatedHouse.urlDataTownWeather).to.equal('url/data/town/weather');
      expect(updatedHouse).ownProperty('createdAt');
      expect(updatedHouse.createdAt).to.not.be.undefined;
      expect(updatedHouse.createdAt).to.not.be.null;
      // expect(updatedHouse).ownProperty('updatedAt');
      // expect(updatedHouse.updatedAt).to.not.be.undefined;
      // expect(updatedHouse.updatedAt).to.not.be.null;
    });

  });

  describe('PATCH /api/houses/:id', () => {
    let patchedHouse;

    beforeEach(done => {
      request(app)
        .put('/api/houses/' + newHouse._id)
        .send({
          _id: newHouse._id,
          name: 'Patched House'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) return done(err);
          patchedHouse = res.body;
          done();
        });
    });

    afterEach(() => {
      patchedHouse = {};
    });

    it('should respond with the updated house', () => {
      expect(patchedHouse).to.be.instanceOf(Object);
      expect(patchedHouse).ownProperty('_id');
      expect(patchedHouse._id).to.not.be.undefined;
      expect(patchedHouse._id).to.not.be.null;
      expect(patchedHouse).ownProperty('name');
      expect(patchedHouse.name).to.equal('Patched House');
      expect(patchedHouse).ownProperty('createdAt');
      expect(patchedHouse.createdAt).to.not.be.undefined;
      expect(patchedHouse.createdAt).to.not.be.null;
      // expect(patchedHouse).ownProperty('updatedAt');
      // expect(patchedHouse.updatedAt).to.not.be.undefined;
      // expect(patchedHouse.updatedAt).to.not.be.null;
    });

  });

  describe('DELETE /api/houses/:id', () => {

    it('should respond with 204 on successful removal', done => {
      request(app)
        .delete('/api/houses/' + newHouse._id)
        .expect(204)
        .end((err, res) => {
          if (err) return done(err);
          done();
        });
    });

    it('should respond with 404 when house does not exist', done => {
      request(app)
        .delete('/api/houses/' + newHouse._id)
        .expect(404)
        .end((err, res) => {
          if (err) return done(err);
          done();
        });
    });

  });

});
