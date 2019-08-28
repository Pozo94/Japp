var express = require('express');
var router = express.Router();
var Competitor =require('../models/competitor')

router.get('/', function (req, res) {
    res.render('results');

});

router.get('/mistrzowska', function (req, res) {
    Competitor.find({}, function(err, competitors){
        if(err){
            console.log(err);
        } else {
            res.render('Klasy/mistrzowska', {
                title:'Klasa mistrzowska',
                competitors: competitors
            });
        }
    });

});

router.get('/mlodziezowiec', function (req, res) {
    Competitor.find({}, function(err, competitors){
        if(err){
            console.log(err);
        } else {
            res.render('Klasy/mlodziezowiec', {
                title:'Klasa mlodziezowiec',
                competitors: competitors
            });
        }
    });

});

router.get('/I', function (req, res) {
    Competitor.find({}, function(err, competitors){
        if(err){
            console.log(err);
        } else {
            res.render('Klasy/I', {
                title:'Klasa I',
                competitors: competitors
            });
        }
    });

});

router.get('/II', function (req, res) {
    Competitor.find({}, function(err, competitors){
        if(err){
            console.log(err);
        } else {
            res.render('Klasy/II', {
                title:'Klasa II',
                competitors: competitors
            });
        }
    });

});

router.get('/III', function (req, res) {
    Competitor.find({}, function(err, competitors){
        if(err){
            console.log(err);
        } else {
            res.render('Klasy/III', {
                title:'Klasa III',
                competitors: competitors
            });
        }
    });

});
router.get('/mlodziezowa', function (req, res) {
    Competitor.find({}, function(err, competitors){
        if(err){
            console.log(err);
        } else {
            res.render('Klasy/mlodziezowa', {
                title:'Klasa mistrzowska',
                competitors: competitors
            });
        }
    });

});








module.exports = router;