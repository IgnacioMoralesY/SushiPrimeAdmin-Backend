
module.exports = (sequelize, type) => {
    return sequelize.define('asistencias', {
        id:{
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_usuario: type.INTEGER,
        id_tienda: type.INTEGER,
        fecha_entrada: type.DATE,
        fecha_salida: type.DATE
    },{
        timestamps: false
    })
}
