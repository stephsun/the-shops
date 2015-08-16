'use strict';

var q = require('q');
var bunyan = require('bunyan');
var logger = bunyan.createLogger({
    name: 'app',
    level: 'trace'
});

var BrandModel = require('../models/Brand').model;

var renderAdminPage = function (req, res) {
    q.resolve().then(function () {
        return BrandModel.getAllBrands()
    }).then(function (brandList) {
        res.render('admin', {
            title: 'Admin Page',
            brands: brandList
        });
    }).fail(function (err) {
        next(err);
    });
};

var getAllBrands = function (req, res) {
    q.resolve().then(function () {
        return BrandModel.getAllBrands()
    }).then(function (brandList) {
        logger.info(brandList);
        res.send(brandList);
    }).fail(function (err) {
        next(err);
    });
}

var addBrand = function (req, res) {
    var longName = req.body.longName;
    var url = req.body.url;
    var rank = req.body.rank;
    var name = longName;
    // var name = longName.replace(/[^a-zA-Z0-9]+/g,'');
    q.resolve().then(function () {
        return BrandModel.addBrand(name, longName, url, rank);
    }).spread(function () {
        res.status(200).send();
    }).fail(function (err) {
        logger.error(err);
        res.status(400).send(err);
    });
}

var editBrand = function (req, res) {
    var action = req.body.action;
    var id = req.body.id;
    var name = req.body.name;
    var longName = req.body.longName;
    var url = req.body.url;
    var rank = req.body.rank;

    q.resolve().then(function () {
        if (action === 'edit') {
            return BrandModel.addBrand(name, longName, url);
        } else if (action === 'delete') {
            return BrandModel.deleteBrand(id);
        }
    }).then(function () {
        res.status(200).send();
    }).fail(function (err) {
        logger.error(err);
        res.status(400).send(err);
    });
};

module.exports = {
    renderAdminPage: renderAdminPage,
    getAllBrands: getAllBrands,
    addBrand: addBrand,
    editBrand: editBrand
};
