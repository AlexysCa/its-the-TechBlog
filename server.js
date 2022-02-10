const path = require('path');
const express = require('express');
const session = require('express-session');
const expresHan = require('express-handlebars');

const utilDate = require('./utils/date')

const app = express();
const PORT = process.env.PORT || 3001;

const sequelize = require('./config/connection')
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess  = {
    secret: process.env.DB_SECRET,
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize,
        checkExpirationInterval: 1000 * 60 * 10,
        expiration: 1000 * 60 * 30
    })
}

app.use(session(sess));

const hbs = expresHan.create({utilDate});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');


app.use(express.static(path.join(__dirname)));
app.use(express.json());
app.use(express.urlencoded({ extended: true, }));

app.use(require('./controllers'));

sequelize.sync({ force: false }).then(() => {
app.listen(PORT, () => console.log(`App listening on the post ${PORT}`));
});

