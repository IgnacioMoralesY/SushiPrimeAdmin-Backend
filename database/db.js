const Sequelize = require('sequelize');
const UserModel = require('../models/user');
const UserHuellaModel = require('../models/userHuella');
const TiendaModel = require('../models/tienda');
const AsistenciaModel = require('../models/asistencia');

console.log(process.env.USERNAME_BD);

const sequelize = new Sequelize(
    process.env.NAME_BD,
    process.env.USERNAME_BD,
    process.env.PASSWORD_BD,
    {
        host: process.env.HOST,
        port: process.env.PORT_BD,
        dialect: 'mysql'
    }
);

const User = UserModel(sequelize, Sequelize);
const UserHuella = UserHuellaModel(sequelize, Sequelize);
const Tienda = TiendaModel(sequelize, Sequelize);
const Asistencia = AsistenciaModel(sequelize, Sequelize);

sequelize.sync({ force: false })
    .then(()=> {
        console.log("Conectado a la Base de datos");
    })

module.exports = {
    User,
    UserHuella,
    Tienda,
    Asistencia
}