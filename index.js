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

app.listen(8081, () => console.log('Server listening'));