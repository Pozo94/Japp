var express = require('express');
var router = express.Router();
var Competitor =require('../models/competitor')

//var client = require('socket.io').listen(4000).sockets;
/* GET competitors listing. */

router.get('/', function(req, res){

    Competitor.find({}, function(err, competitors){
        if(err){
            console.log(err);
        } else {

            res.render('competitors', {
                title:'Competitors',
                competitors: competitors,

            });

        }
    });
});

/* Add competitor */
router.get('/addCompetitor',ensureAdmin,function (req,res) {
    res.render('addCompetitor');

})

router.post('/addCompetitor', function(req, res) {
    var firstname = req.body.firstname1;
    var lastname = req.body.lastname1;
    var club = req.body.club1;
    var year = req.body.year1;
    var clas = req.body.clas1;
    var subdivision= req.body.subdivision1;
    var newCompetitor = new Competitor({
        firstname: firstname,
        lastname: lastname,
        year: year,
        clas: clas,
        club: club,
        subdivision:subdivision
    });
    Competitor.createCompetitor(newCompetitor, function () {


    });
    req.flash('success', 'Competitor added!');
    res.location('/');
    res.redirect('/competitors/addCompetitor');
});
function ensureAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } else {
        req.flash('danger', 'Please login');
        res.redirect('/users/login');
    }
}
function ensureAdmin(req, res, next){
    if(req.user && req.user.role==='Admin'){
        return next();
    } else {
        req.flash('danger', 'Please login as admin');
        if(req.user)
            res.redirect('/')
        else
            res.redirect('/users/login');
    }
}
module.exports = router;
