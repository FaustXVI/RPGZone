var express = require('express');
var characters = require('./server/characters');
var app = express();
var i18n = require("i18next");


i18n.init({
    ignoreRoutes: [ 'css/', 'js/'],
    ns: 'message',
    debug: true,
    resGetPath: 'server/i18n/__ns__-__lng__.json'
});

app.configure(function () {
    app.use(express.bodyParser());
    app.use(i18n.handle);
    app.use(app.router);
    app.use(express.static(__dirname + '/public'));
    app.set('views', __dirname + '/server/views');
    app.set('view engine', 'jade');
    app.locals.pretty = true;
});

var render = function (template) {
    return function (req, res) {
        res.render(template);
    };
};


i18n.registerAppHelper(app);

app.get('/', render('index'));
app.get('/index.html', render('index'));
app.get('/perso.html', render('perso'));
app.get('/characters', characters.findAll);
app.get('/characters/:id', characters.findById);
app.post('/characters', characters.addCharacter);
app.put('/characters/:id', characters.updateCharacter);
app.delete('/characters/:id', characters.deleteCharacter);

app.listen(8080);
console.log('Listening on port 8080');