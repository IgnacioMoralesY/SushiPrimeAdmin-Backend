const { response } = require('express');
const { UserHuella } = require('../database/db');
const { User } = require('../database/db');

const getAll = async(req, res = response) => {
    try{
        const usersHuellas = await UserHuella.findAll();
        const users = await User.findAll();

        const populate = usersHuellas.map(huella => {
            let objPopulate = {};

            let existUser = users.find(user => user.id === huella.id_usuario);
            if(existUser){
                objPopulate.id = huella.id;
                objPopulate.huella = huella.huella;
                objPopulate.id_usuario = huella.id_usuario;
                objPopulate.usuario =  existUser.dataValues;
            }

            return objPopulate;
        });

        return res.status(200).json({
            huellas: populate
        });
    }catch(err){
        console.log(err);
        throw res.status(500).json({
            msg: ` Error, no se ha podido acceder a los datos de usuarios. `
        });
    }
}

const remove = async(req, res = response) => {
    const id = req.params.id;
    try{
        await UserHuella.destroy({ 
            where: { 
                id 
            } 
        });
       
        return res.status(200).json({
            msg: ` Huella Eliminada Correctamente! `
        });
    }catch(err){
        throw res.status(500).json({
            msg: ` Error interno de la aplicación, No se ha eliminado la huella. `
        });
    }
}


module.exports = {
    getAll,
    remove
}