if (process.env.NODE_ENV !== 'production') {
    require ('dotenv').config()
}

import express from "express";
import path from "path";
import morgan from "morgan";
import multer from "multer";
import cors from "cors";
import { uuidv4 } from "uuid";
import flash from "express-flash";
import session from "express-session";
import passport from "passport";
import passlocal from "passport-local";
import methodOverride from "method-override";


import UserRoutes from "./routes/user.routes";
import ProductRoutes from "./routes/product.routes";
import WebRoutes from "./routes/web.routes";

const app = express();

//settings
app.set("port", process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.resolve(__dirname, '..', 'assets')));

//middlewares
const corsOptions = {};
app.use(cors(corsOptions))
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/img/users'),
    filename: (req,file,cb,filename) =>{
        cb(null, uuidv4() + path.extname(file.originalname));
    }
});
app.use(multer({ storage: storage }).single('image'));
app.use(flash());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));


//routes
app.use(UserRoutes);
app.use(ProductRoutes);
app.use(WebRoutes);


export default app;
