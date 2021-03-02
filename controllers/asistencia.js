const { response } = require('express');
const { Asistencia, User, Tienda } = require('../database/db');
const sequelize = require('sequelize');

const getAll = async(req, res = response) => {
    try{
        const asistencias = await Asistencia.findAll();
        const users = await User.findAll();
        const tiendas = await Tienda.findAll();

        const populate = asistencias.map(asistencia => {
            let objPopulate = {};

            let existTienda = tiendas.find(tienda => tienda.id === asistencia.id_tienda);
            if(existTienda.dataValues){
                existTienda = existTienda.dataValues;
            }else{
                existTienda = {};
            }

            let existUser = users.find(user => user.id === asistencia.id_usuario);
            if(existUser){
                objPopulate.id = asistencia.id;
                objPopulate.id_tienda = asistencia.id_tienda;
                objPopulate.tienda = existTienda;
                objPopulate.id_usuario = asistencia.id_usuario;
                objPopulate.usuario =  existUser.dataValues;
                objPopulate.fecha_entrada = asistencia.fecha_entrada;
                objPopulate.fecha_salida = asistencia.fecha_salida;
            }

            return objPopulate;
        });
        return res.json({
            asistencias: populate
        });
    }catch(err){
        console.log(err);
        throw res.status(500).json({
            msg: ` Error, no se ha podido acceder a los datos del servidor. `
        });
    }
}

const getAsistenciaTienda = async(req, res = response) => {
    const idTienda = req.params.idTienda;

    try{

        const asistencias = await Asistencia.findAll({ where: { id_tienda: idTienda } });
        const users = await User.findAll();
        const tiendas = await Tienda.findAll();
        
        const populate = asistencias.map(asistencia => {
            let objPopulate = {};

            let existTienda = tiendas.find(tienda => tienda.id === asistencia.id_tienda);
            if(existTienda.dataValues){
                existTienda = existTienda.dataValues;
            }else{
                existTienda = {};
            }

            let existUser = users.find(user => user.id === asistencia.id_usuario);
            if(existUser){
                objPopulate.id = asistencia.id;
                objPopulate.id_tienda = asistencia.id_tienda;
                objPopulate.tienda = existTienda;
                objPopulate.id_usuario = asistencia.id_usuario;
                objPopulate.usuario =  existUser.dataValues;
                objPopulate.fecha_entrada = asistencia.fecha_entrada;
                objPopulate.fecha_salida = asistencia.fecha_salida;
            }

            return objPopulate;
        });

        return res.json({
            asistencias: populate
        });
    }catch(err){
        console.log(err);
        throw res.status(500).json({
            msg: ` Error, no se ha podido acceder a los datos del servidor. `
        });
    }
}



module.exports = {
    getAll, 
    getAsistenciaTienda
}