const { User, UserHuella, Tienda } = require('../database/db');

// USUARIOS
const rutNotExist = async(rut = '') => {
    const user = await User.findOne({ where: { rut } });
    if(user){
        throw new Error(`El usuario con Rut ${ rut } ya existe en la base de datos!`);
    }
}

const rutExist = async(rut = '') => {
    const user = await User.findOne({ where: { rut } });
    if(!user){
        throw new Error(`El usuario con Rut ${ rut } no existe en la base de datos!`);
    }
}

const idUsertExist = async(id = '') => {
    const user = await User.findOne({ where: { id } });
    if(!user){
        throw new Error(`El usuario no existe!`);
    }
}

// HUELLA

const existIdHuella = async(id = '') => {
    const userHuella = await UserHuella.findOne({ where: { id } });
    if(!userHuella){
        throw new Error(`Huella no existe!`);
    }
}

// TIENDA
const idTiendaExist = async(id = '') => {
    const tienda = await Tienda.findOne({ where: { id } });
    if(!tienda){
        throw new Error(`La Tienda no existe!`);
    }
}

const nombreTiendaNotExist = async(nombre = '') => {
    const tienda = await Tienda.findOne({ where: { nombre } });
    if(tienda){
        throw new Error(`La Tienda con nombre ${ nombre } ya existe en la base de datos!`);
    }
}

module.exports = {
    rutNotExist,
    idUsertExist,
    rutExist,
    existIdHuella,
    idTiendaExist,
    nombreTiendaNotExist
}