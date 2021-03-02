const express = require('express');
const cors = require('cors');
require('../database/db');

class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        
        this.userPath = process.env.USER_PATH;
        this.userHuellaPath = process.env.USER_HUELLA_PATH;
        this.tiendaPath = process.env.TIENDA_PATH;
        this.asistenciaPath = process.env.ASISTENCIA_PATH;
        
        // Connection to DB
      //  this.connectionDB();

        // Middlewares
        this.middlewares();

        // Routes
       this.routes();

    }

    routes(){
        this.app.use(this.userPath, require('../routes/user'));
        this.app.use(this.userHuellaPath, require('../routes/userHuella'));
        this.app.use(this.tiendaPath, require('../routes/tienda'));
        this.app.use(this.asistenciaPath, require('../routes/asistencia'));
    }
    
    listen(){
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto', this.port);
        });
    }

    middlewares(){
        // CORS 
        this.app.use(cors());

        // JSON parse to Body
        this.app.use(express.json());

        //Public
        this.app.use(express.static('public'));
    }
/*
    async connectionDB(){
        await dbConnection();
    }
    */
}

module.exports = Server;