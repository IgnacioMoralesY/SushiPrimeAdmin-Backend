const { response } = require('express');
const { Tienda } = require('../database/db');
const sequelize = require('sequelize');

const getAll = async(req, res = response) => {
    try{
        const tiendas = await Tienda.findAll();

        return res.json({
            tiendas
        });
    }catch(err){
        console.log(err);
        throw res.status(500).json({
            msg: ` Error, no se ha podido acceder a los datos del servidor. `
        });
    }
}

const add = async(req, res = response) => {
    try{
        const body = req.body;

        const tienda = await Tienda.create(body);
        
        return res.status(201).json({
            tienda
        });
    }catch(err){
        console.log(err);
        throw res.status(500).json({
            msg: ` Error interno de la aplicación! `
        });
    }
}

const update = async(req, res = response) => {
    const id = req.params.id;
    try{
        const body = req.body;

        const tiendaExists = await Tienda.findOne({ 
            where: { 
                id: { [sequelize.Op.not]: id },
                nombre: body.nombre
            } 
        });
       
        if(tiendaExists){
            return res.status(401).json({
                msg: `El Nombre ${body.nombre} ya le pertenece a otra tienda!`
            });
        }

        await Tienda.update(body, {
            where: { id }
        });

        body.id = Number(id);
        
        return res.status(201).json({
            tienda: body
        });
    }catch(err){
        throw res.status(500).json({
            msg: ` Error interno de la aplicación! `
        });
    }
}

const remove = async(req, res = response) => {
    const id = req.params.id;
    try{
        await Tienda.destroy({ 
            where: { 
                id 
            } 
        });
       
        return res.status(200).json({
            msg: ` Tienda eliminada correctamente `
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
    remove
}