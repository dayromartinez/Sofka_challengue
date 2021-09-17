const { DataTypes } = require('sequelize');

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

module.exports = (sequelize) => {

  // defino el modelo
    sequelize.define('pregunta', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            validate: {
                isInt: true,
            }
        },
        interrogante: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        opc1: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        opc2: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        opc3: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        opc4: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        respuesta: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });
};