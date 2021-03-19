'use strict'
const { Sequelize } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Book extends Sequelize.Model {
  }
  Book.init({
    title: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Please provide a valid "title"'
        }
      }
    },
    author: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Please provide a valid "author"'
        }
      }
    },
    genre: Sequelize.STRING,
    year: Sequelize.INTEGER
  },
  {
    sequelize

  })

  return Book
}
