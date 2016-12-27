'use strict'
var path = require('path');
var assert = require('chai').assert;
var SequelizeMock = require('mock-sequelize');
var sequelize;
var Loader = require('../lib/sequelize-models-loader.js');

var loader;

describe('sequelize-models-loader', function(){
  /**
   * Initialize a new loader conecction with a sequelize mock instance
   * to avoid using real database conection
   */
  before(function(){
    sequelize = new SequelizeMock();
    loader = new Loader(path.join(__dirname, './models'), sequelize);
  });

  describe('#getSequelize()', function(){
    it('should return sequelize instance', function(done){
      var sequelizeInstance = loader.getSequelize();
      assert.isNotNull(sequelizeInstance);
      done();
    });
  });

  describe('#model()', function(){
    it('should retrive model by name', function(done){
      var Player = loader.model('player');
      assert.isNotNull(Player);
      done();
    });

    it('should retrive undefined if model was not found by name', function(done){
      var NotModel = loader.model('notexistingmodel');
      assert.isUndefined(NotModel);
      done();
    });

    it('should retrieve usable model by name', function(done){
      var Player = loader.model('player');
      Player.find({where: {}})
      .then(function(result){
        done();
      })
      .catch(function(err){
        done(err);
      });
    });
  });
});
