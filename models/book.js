'use strict'
const { Sequelize } = require('sequelize')
// const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Book extends Sequelize.Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // static associate (models) {
    //   // define association here
    // }
  }

  Book.init({
    title: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Please provide a valid "title".'
        }
      }
    },
    author: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Please provide a valid "author".'
        }
      }
    },
    genre: Sequelize.STRING,
    year: Sequelize.INTEGER
  },
  {
    sequelize,
    modelName: 'Book'
  })

  return Book
}
