
module.exports = (sequelize, type) => {
    return sequelize.define('usuario', {
        id:{
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: type.STRING,
        apellido: type.STRING,
        rut: {
            type: type.STRING,
            unique: true
        },
        email: type.STRING,
        password: type.STRING,
        rol: type.INTEGER,
        fecha_registro: type.DATE,
        bloqueado: type.INTEGER
    },{
        timestamps: false
    })
}


