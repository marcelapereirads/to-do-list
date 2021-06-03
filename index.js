const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const Post = require('./models/Post');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.engine('handlebars', handlebars({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/public'));

app.get('/', (req, resp) => {
    Post.findAll({ order: [['done', 'ASC']]}).then(posts => resp.render('home', { posts }));
});

app.get('/new', (req, resp) => resp.render('new'));

app.post('/new', (req, resp) => {
    const data = {
        name: req.body.name,
        description: req.body.description,
        done: false
    };

    Post.create(data)
        .then(() => resp.redirect('/'))
        .catch((error) => console.log('Error saving task:', error));
});

app.get('/delete/:id', (req, resp) => {
    Post.destroy({ where: { 'id': req.params.id } })
        .then(() => resp.redirect('/'))
        .catch((error) => console.log(` Error deleting task id ${req.params.id}: ${error}`));
});

app.listen(8081, () => console.log('Server listening'));