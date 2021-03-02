
module.exports = (sequelize, type) => {
    return sequelize.define('usuario_huella', {
        id:{
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_usuario: type.INTEGER,
        huella: type.BLOB,
    },{
        timestamps: false
    })
}


