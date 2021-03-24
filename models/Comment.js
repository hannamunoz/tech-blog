const { Model, Datatypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model { }

Comment.init(
    {
        id: {
            type: Datatypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        content: {
            type: Datatypes.TEXT('medium'),
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        user_id: {
            type: Datatypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Blog',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'Comment'
    }
);

module.exports = Comment;