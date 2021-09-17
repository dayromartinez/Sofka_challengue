const { DataTypes } = require('sequelize');

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

module.exports = (sequelize) => {

  // defino el modelo
    sequelize.define('juego', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            validate: {
                isInt: true,
            }
        },
        puntuacion: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: true,
            }
        },
        ronda: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: true,
            }
        },
        retiro: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        expulsion: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        }
    });
};