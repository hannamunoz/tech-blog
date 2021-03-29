const express = require('express');
const session = require('express-session');
const expressh = require('express-handlebars');
const path = require('path');
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const sequelize = require('./config/connection');
const routes = require('./controllers');
const helpers = require('./utils/helpers');
const hbs = expressh.create({ helpers });

const app = express();
const PORT = process.env.PORT || 3002;

// This will start a session and then expire after 5 minutes
const runsession = {
    secret: 'topsecret',
    cookie: { maxAge: 300000 },
    resave: false,
    saveUninitialized: false,
    store: new SequelizeStore({
        db: sequelize
    })
};


// Express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Handlebars as view model
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Session middleware
app.use(session(runsession));

// Activate routes
app.use(routes);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Now listening on ${PORT}`));
});