const formidable = require('formidable');
const _ = require("lodash");
const fs = require("fs");
const Product = require("../models/product");
const {errorHandler} = require('../helpers/dbErrorhandler')

exports.create = (req, res) => {
  let form = new formidable.IncomingForm();

  form.keepExtensions = true;
  form.parse(ew , (err, fields, files)=>{
    if (err) {
      return res.status(400).json({
        error: 'Image not found'
      })
    }

    let product = new Product(fields);

    if (files.photo) {
      product.photo.data = fs.readFileSync(files.photo.path);
      product.photo.contentType = files.photo.type;
    }

    product.save((err, result) => {
      if(err) {
        return res.status(400).json({
          error: errorHandler(err)
        })
      }

      res.json(result);

    });

  })
}