var express = require('express');
var router = express.Router();
var Competitor =require('../models/competitor')

function Round(n, k)
{
    var factor = Math.pow(10, k+1);
    n = Math.round(Math.round(n*factor)/10);
    return n/(factor/10);
}

function compare(a, b) {
    // Use toUpperCase() to ignore character casing
    const clasA = a.clas.toUpperCase();
    const clasB = b.clas.toUpperCase();

    let comparison = 0;
    if (clasA > clasB) {
        comparison = 1;
    } else if (clasA < clasB) {
        comparison = -1;
    }
    return comparison;
}


/* GET home page. */
router.get('/',ensureAuthenticated, function (req, res) {
    res.render('judging');

});
router.get('/:subdivision/:id',ensureAuthenticated, function(req, res){
        Competitor.findById(req.params.id, function(err,competitor) {
            console.log(req.params.id);
            res.render('judge');
        });
});
router.post('/:subdivision/:id', function(req, res){
    function compareNumbers(a, b) {
        return a - b
    }
    var D=req.body.D;
    var E1=req.body.E1;
    var E2=req.body.E2;
    var E3=req.body.E3;
    var E4=req.body.E4;
    Sr=new Array(E1,E2,E3,E4);
    Sr.sort(compareNumbers);
    let competitor = {};
    var E= (+Sr[1]+ +Sr[2])/2;
    var Final=Round((+E+ +D),3);
    let query = {_id:req.params.id}


    if (req.user.apparatus==='VT')
    {
        competitor.VT1= +Final;
        Competitor.findById(req.params.id, function(err,competitorr) {
            competitor.suma = +competitorr.suma + +Final;
            +competitor.suma;
        });
        console.log( +competitor.suma, req.params.id)
        Competitor.updateOne(query, {$set: {VT1:competitor.VT1,suma:competitor.suma}}, function(err){
            if(err){
                console.log(err);
                return;
            } else {
                req.flash('success', 'Competitor Updated');
                //res.redirect('/');
            }
        });

    }
    res.redirect('/judging/');
});
router.get('/I',ensureAuthenticated, function (req, res) {
    Competitor.find({}, function(err, competitors){
        if(err){
            console.log(err);
        } else {
            competitors.sort(compare);
            res.render('Zastepy/I', {
                title:'Zastęp I',
                competitors: competitors
            });

        }
    });

});
router.get('/II',ensureAuthenticated, function (req, res) {
    Competitor.find({}, function(err, competitors){
        if(err){
            console.log(err);
        } else {
            res.render('Zastepy/II', {
                title:'Zastęp II',
                competitors: competitors
            });
        }
    });

});
router.get('/III',ensureAuthenticated, function (req, res) {
    Competitor.find({}, function(err, competitors){
        if(err){
            console.log(err);
        } else {
            res.render('Zastepy/III', {
                title:'Zastęp III',
                competitors: competitors
            });
        }
    });

});
router.get('/IV',ensureAuthenticated, function (req, res) {
    Competitor.find({}, function(err, competitors){
        if(err){
            console.log(err);
        } else {
            res.render('Zastepy/IV', {
                title:'Zastęp IV',
                competitors: competitors
            });
        }
    });

});

router.get('/V',ensureAuthenticated, function (req, res) {
    Competitor.find({}, function(err, competitors){
        if(err){
            console.log(err);
        } else {
            res.render('Zastepy/V', {
                title:'Zastęp V',
                competitors: competitors
            });
        }
    });

});
router.get('/VI',ensureAuthenticated, function (req, res) {
    Competitor.find({}, function(err, competitors){
        if(err){
            console.log(err);
        } else {
            res.render('Zastepy/VI', {
                title:'Zastęp VI',
                competitors: competitors
            });
        }
    });

});
router.get('/VII',ensureAuthenticated, function (req, res) {
    Competitor.find({}, function(err, competitors){
        if(err){
            console.log(err);
        } else {
            res.render('Zastepy/VII', {
                title:'Zastęp VII',
                competitors: competitors
            });
        }
    });

});
router.get('/VIII',ensureAuthenticated, function (req, res) {
    Competitor.find({}, function(err, competitors){
        if(err){
            console.log(err);
        } else {
            res.render('Zastepy/VIII', {
                title:'Zastęp VIII',
                competitors: competitors
            });
        }
    });

});
function ensureAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } else {
        req.flash('danger', 'Please login');
        res.redirect('/users/login');
    }
}


module.exports = router;