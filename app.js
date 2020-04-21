'use strict';

var express = require("express");
var app = express();
var cors = require('cors')

var db = require('./db');

var jsonParse = require("body-parser").json;
var logger = require('morgan');

app.use(cors());
app.use(logger('dev'));
app.use(jsonParse());

app.get('/meals', function(req, res, next){
    db.query("SELECT * FROM meal", (err, rows, fields) => {
        if(!err)
        res.send(rows);
        else
        console.log(err);
    })
});

app.get('/meals/:id', function(req, res, next){
    db.query("SELECT * FROM meal WHERE mealId = ?", [req.params.id],(err, rows, fields) => {
        if(!err)
        res.send(rows);
        else
        console.log(err);
    })
});

app.delete('/meals/:id', function(req, res, next){
    db.query("DELETE FROM meal WHERE mealId = ?", [Number(req.params.id)],(err, rows, fields) => {
        if(!err)
        res.send("Deleted successfully");
        else
        console.log(err);
    })
});

app.post('/meals', function(req, res, next){
})


var port = process.env.port || 3000;

app.listen(port);