
module.exports = (sequelize, type) => {
    return sequelize.define('tienda', {
        id:{
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: type.STRING
    },{
        timestamps: false
    })
}


