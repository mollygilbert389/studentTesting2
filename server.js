// *****************************************************************************
// Server.js - App Starting point. Initializes Node JS server
//
// ******************************************************************************
// *** Importing Dependencies
// =============================================================
const express = require("express");
var exphbs  = require('express-handlebars');
const sequelize_fixtures = require("sequelize-fixtures");
require("custom-env").env("dev"); //env vars for development


//TODO: Consider adding CORS as extra layer of security
/**
 * const cors = require("cors");
 * --after app declaration
 * const corsOptions = {
 *  origin: "http://localhost:8000" //need to see how to make this work on Heroku
 * }
 * call middleware to use cors
 * app.use(cors(corsOptions));
 */

// Instantiating Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 3000;

// Requiring models for syncing
// =============================================================
const db = require("./models/");

//setting data parsing middlewares --JSON-- with Express
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); //request body parser

//Setting static directory = public
app.use(express.static("public"));
app.use(express.static("views"));
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// view engine setup


// Routes
// =============================================================
require('./routes/auth_router.js')(app);//authentication and login api routes
require("./routes/user_router.js")(app); //student and instructor portals
require('./routes/html-routes')(app)

// Syncing DB models and then starting express server
// =============================================================
db.sequelize.sync({ force: true })
  .then(() => {
    sequelize_fixtures.loadFile("./db/fixtures/*", db)
      .then(() => {
        console.log("===== DB Seeded Properly =====");
        app.listen(PORT, () => {
          console.log(
            `===== SERVER ON => App listening on PORT ${PORT} environment. =====`
          );
        });
      });
  }); 

