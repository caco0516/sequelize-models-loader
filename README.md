# sequelize-models-loader
<hr>

It's a simple module for creating models loading from path easily.

## Install

You can get this module via npm.

```
npm install sequelize-models-loader --save --save-exact

```

## Usage

### Setup

You just need to call module and set sequelize connection parameters. Here are some examples of how to initialize a new connection:

Passing a existing sequelize connection:

```javascript

var pathToModelsFolder = './models';
var Loader = require('sequelize-models-loader');
loader = new Loader(path.join(__dirname, './models'), sequelize);

```

Passing a existing url with connection options:

```javascript

var url = process.env.DATABASE_URL;
var options = {
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
  define: {
    timestamps: true,
    freezeTableName: true
  }
};

var Loader = require('sequelize-models-loader');
var loader = new Loader(pathToModelsFolder,url, options);

```

### Using Models

Using our created models is easy as calling out singleton sequelize object and call model() method passing the model name we use for our model.

For exmple if we have a model file called **user.js** , our model will be called like this:

```javascript

var User = loader.model('user');

```
So we now get access to all of our Model class.

### Models

When we create a model is so easy , in fact modeling is just like modeling for a regular sequelize model. But for table options and relationships we have two special properties , check example below to see how to created to models with relationship.

First we have or **player.js** model

```javascript

'use strict';

'use strict';

var validateName = {
  len:[20,150],
  notEmpty: true
}

module.exports = function(Sequelize) {
    return {
        model: {
          playerId: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
          name: { type: Sequelize.STRING(150), allowNull: false, unique: true , validate: validateName }
        },
        relations: [{
          relationType: 'belongsTo',
          relatedModel: 'team',
          options: { as: 'teamId', foreignKey: 'fk_player_team' }
        }],
        options:{
          freezeTableName: true
        }
    };
};

```

Now we have related model called **team.js**

```javascript

'use strict';

var validateName = {
  len:[20,150],
  notEmpty: true
}

module.exports = function (Sequelize) {
    return {
        model: {
          teamId: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
          name: { type: Sequelize.STRING(150), allowNull: false, unique: true , validate: validateName }
        },
        options:{
          freezeTableName: true
        }
    };
};

```

Easy , isn't it ?

### Sequelize Instance

If you need sequelize instance or sequelize connection associated with the loader you just need to call **#getSequelize()**. With this you can make things like raw queries or call sync method.

```javascript

var sequelize = loader.getSequelize();
sequelize.sync({ force: true });

```

## Contribution

For write your own code please add test first and then the actual code.I use mocha based test running. And I like assert but feel free to use should or expect.

```
npm test
```
## Change History
You can see all change history [here](/CHANGELOG.md)

## License

[The MIT License](/LICENSE.mit)

Copyright (c) 2016 Carlos Castillo Oporta [www.carloscastillo.me](www.carloscastillo.me)
