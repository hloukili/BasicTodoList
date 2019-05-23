var express = require('express');
var bodyParser = require('body-parser');
var session = require('cookie-session');
var generator = require('generate-password');

var app = express();
var urlencodedParser = bodyParser.urlencoded({
    extended: false
});




//Use sessions.
app.use(session({
        secret: generator.generate({
            length: 15,
            numbers: true
            
        })
    
    }))


    /* On affiche la todolist et le formulaire */
    app.get('/todo', function (req, res) {
        res.render('todo-list.ejs', {
            todolist: req.session.todolist
        });
    })



    // Check if todolist is empty.
    .use(function (req, res, next) {
        if (typeof (req.session.todolist) == 'undefined') {

            req.session.todolist = [];
        }
        next();
    })

    //Display todolist in todo.ejs
    .get('/todo', function (req, res) {
        res.render('todo-list.ejs', {
            todolist: req.sesssion.todolist
        });
    })



    //Add Todo with push();
    .post('/todo/add/', urlencodedParser, function (req, res) {
        if (req.body.newtodo != '') {
            req.session.todolist.push(req.body.newtodo);
        }
        res.redirect('/todo');
    })

    .get('/todo/delete/:id', function (req, res) {
        if (req.params.id != '') {
            req.session.todolist.splice(req.params.id, 1);
        }
        res.redirect('/todo');
    })

    //Redirect if page not found.
    .use(function (req, res) {
        res.redirect('/todo');
    })

    .listen(8080);
