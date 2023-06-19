import express from 'express'
import cors from 'cors'
import session from "express-session";
// import mongoose from "mongoose";

import HelloController from "./controllers/hello-controller.js"
import UserController from './users/users-controller.js'
import TuitsController from './controllers/tuits/tuits-controller.js';
import AuthController from './users/auth-controller.js';

const app = express();
app.use(express.json());
mongoose.connect("mongodb://127.0.0.1:27017/tuiter");

app.use(
    session({
        secret: "any string",
        resave: false,
        saveUninitialized: true,
    })
);


app.use(
    cors({
        credentials: true,
        // origin: "http://localhost:3000",
        origin: "https://a5-3--benevolent-crumble-d54ceb.netlify.app",
    })
);

HelloController(app);
UserController(app);
TuitsController(app);
AuthController(app);

app.listen(process.env.PORT || 4000);