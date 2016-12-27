var filesystem = require('fs');
var Sequelize = require('sequelize');

function SequelizeModelsLoader(path, database, username, password, obj){
        this._modelsPath = path;
        this._models = {};
        this._relationships = {};
        this._sequelize;

        if(arguments.length == 2){
          this._sequelize = database;// a pre created sequelize instance
        }

        if(arguments.length == 3){
            this._sequelize  = new Sequelize(database, username);
        }
        else if(arguments.length == 4){
            this._sequelize  = new Sequelize(database, username, password);
        }
        else if(arguments.length == 5){
            this._sequelize  = new Sequelize(database, username, password, obj);
        }

        function init(loader) {
            console.log(loader._modelsPath);
            filesystem.readdirSync(loader._modelsPath).forEach(function(name){
                var object = require(loader._modelsPath + "/" + name)(Sequelize);
                var options = object.options || {}
                var modelName = name.replace(/\.js$/i, "");
                loader._models[modelName] = loader._sequelize.define(modelName, object.model, options);
                if("relations" in object){
                    loader._relationships[modelName] = object.relations;
                }
            });
            for(var name in loader._relationships){
                var relations = loader._relationships[name];
                for(var relationIndex in relations){
                    var rel = relations[relationIndex];
                    var relatedModel = rel.relatedModel;// user , project , car
                    var relationType = rel.relationType;// hasMany, belongsTo
                    var options = rel.options;
                    var m = loader._models[name];
                    m[relationType](loader._models[relatedModel], options);
                }
            }
        }

        init(this);
    };

    SequelizeModelsLoader.prototype.model = function (modelName) {
      return this._models[modelName];
    };

    SequelizeModelsLoader.prototype.getSequelize = function () {
      return this._sequelize;
    };

module.exports = SequelizeModelsLoader;
