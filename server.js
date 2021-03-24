const express = require('express');
const session = require('express-session');
const expressh = require('express-handlebars');
const path = require('path');
const SequelizeStore = require("connect-session-sequelize")(connect.session.Store);

const sequelize = require('sequelize');
const routes = require('./controllers');
const helpers = require('./utils/helpers');
const hbs = exphbs.create({ helpers });

const app = express();
const PORT = process.env.PORT || 3001;

// This will start a session and then expire after 5 minutes
// const runsession = {
//     secret: 'topsecret',
//     store: mySession,
//     resave: false,
//     proxy: true,
// }

const mySession = new SequelizeStore({
    db: sequelize,
});
app.use(
    session({
        secret: 'top-secret',
        store: mySession,
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: 300000 },
        proxy: true,
    })
);

mySession.sync();

// Express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Handlebars as view model
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Session middleware
app.use(session(mySession));

// Activate routes
app.use(routes);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Now listening on ${PORT}`));
});