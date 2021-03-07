const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const reqHandlerLoader = require('./view/RequestHandlerLoader');
const session = require('express-session');
app.use(express.json());

const uri = process.env.MONGO_ATLAS_URI;
mongoose.set('useFindAndModify', false);
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }
).catch(err => (console.log(err)));

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:3000",
    preflightContinue: true,
    credentials: true,
  }));
  app.use(session({
    secret: 'somesecret',
    name: 'name',
    proxy: true,
    resave: true,
    saveUninitialized: true
}));
// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Credentials", "true");
//     res.header("Access-Control-Allow-Origin", "http://localhost:3000");
//     res.header(
//       "Access-Control-Allow-Headers",
//       "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//     );
//     if (req.method === "OPTIONS") {
//       res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
//       return res.status(200).json({});
//     }
//     next();
//   });
reqHandlerLoader.loadRequestHandlers(app);
module.exports= app;