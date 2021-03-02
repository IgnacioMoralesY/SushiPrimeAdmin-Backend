const { response } = require('express');
const { User } = require('../database/db');
const sequelize = require('sequelize');

const getAll = async(req, res = response) => {
    try{
        const users = await User.findAll();

        return res.json({
            users
        });
    }catch(err){
        console.log(err);
        throw res.status(500).json({
            msg: ` Error, no se ha podido acceder a los datos de usuarios. `
        });
    }
}

const add = async(req, res = response) => {
    try{
        const body = req.body;
        body.fecha_registro = new Date();
        body.bloqueado = 0;

        const user = await User.create(body);
        
        return res.status(201).json({
            user
        });
    }catch(err){
        console.log(err);
        throw res.status(500).json({
            msg: ` Error interno de la aplicación! `
        });
    }
}

const update = async(req, res = response) => {
    const idUsuario = req.params.id;
    try{
        const body = req.body;

        const userExists = await User.findOne({ 
            where: { 
                id: { [sequelize.Op.not]: idUsuario },
                rut: body.rut
            } 
        });
       
        if(userExists){
            return res.status(401).json({
                msg: `El Rut ${body.rut} ya le pertenece a otro usuario!`
            });
        }

        await User.update(body, {
            where: { id: idUsuario }
        });

        body.id = Number(idUsuario);
        
        return res.status(201).json({
            user: body
        });
    }catch(err){
        throw res.status(500).json({
            msg: ` Error interno de la aplicación! `
        });
    }
}

const bloquear = async(req, res = response) => {
    const idUsuario = req.params.id;
    try{
        await User.update({bloqueado: 1}, {
            where: { id: idUsuario }
        });

        let user = await User.findOne({ 
            where: { 
                id: idUsuario 
            } 
        });

        return res.status(201).json({
            user
        });
    }catch(err){
        throw res.status(500).json({
            msg: ` Error interno de la aplicación! `
        });
    }
}

const desbloquear = async(req, res = response) => {
    const idUsuario = req.params.id;
    try{

        await User.update({bloqueado: 0}, {
            where: { id: idUsuario }
        });

        let user = await User.findOne({ 
            where: { 
                id: idUsuario 
            } 
        });

        return res.status(201).json({
            user
        });
    }catch(err){
        throw res.status(500).json({
            msg: ` Error interno de la aplicación! `
        });
    }
}

const remove = async(req, res = response) => {
    const idUsuario = req.params.id;
    try{
        await User.destroy({ 
            where: { 
                id:  idUsuario 
            } 
        });
       
        return res.status(200).json({
            msg: ` Usuario eliminado correctamente `
        });
    }catch(err){
        throw res.status(500).json({
            msg: ` Error interno de la aplicación! `
        });
    }
}

const login = async(req, res = response) => {
    try{
        const {rut, password} = req.body;
        
        const user = await User.findOne({ 
            where: { 
                rut,
                password
            } 
        });
        
        if(!user){
            return res.status(401).json({
                msg: ` Contraseña Incorrecta! `
            });
        }

        return res.status(200).json({
            user
        });
    }catch(err){
        throw res.status(500).json({
            msg: ` Error interno de la aplicación! `
        });
    }
}


module.exports = {
    getAll,
    add,
    update,
    remove,
    login,
    bloquear,
    desbloquear
}