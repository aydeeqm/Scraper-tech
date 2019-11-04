const express = require('express');
const path = require('path');
const router = require('./routes');

const app = express();

app.set('port', process.env.PORT || 8080);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', router);

app.listen(app.get('port'), () => console.log(`Server on running 8080`));
