'use strict';

let proxyquire = require('proxyquire').noPreserveCache();

const houseCtrlStub = {
  index: 'houseCtrl.index',
  show: 'houseCtrl.show',
  create: 'houseCtrl.create',
  update: 'houseCtrl.update',
  destroy: 'houseCtrl.destroy'
};

const routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
const houseIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './house.controller': houseCtrlStub
});

describe('House API Router:', function() {

  describe('GET /api/houses', function() {

    it('should route to house.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'houseCtrl.index')
      ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/houses/:id', function() {

    it('should route to house.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'houseCtrl.show')
      ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/houses', function() {

    it('should route to house.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'houseCtrl.create')
      ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/houses/:id', function() {

    it('should route to house.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'houseCtrl.update')
      ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/houses/:id', function() {

    it('should route to house.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'houseCtrl.update')
      ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/houses/:id', function() {

    it('should route to house.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'houseCtrl.destroy')
      ).to.have.been.calledOnce;
    });

  });

});
