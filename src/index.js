import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import expressSession from 'express-session';
import handlebars from 'express-handlebars';
import { auth } from './middlewares/authMiddleware.js';
import routes from './routes.js';
import { tempData } from './middlewares/tempDataMiddleware.js';


const app = express();
const PORT = 3000;
const DB_URI = 'mongodb://localhost:27017/homeCookingRecipes'; // TODO: Change this to enviroment var DB_URI in .env file

// Db setup
(async () => {
    try {
        await mongoose.connect(DB_URI);
        console.log('Connected to the database');
    } catch (error) {
        console.error('Error connecting to the database', error);
    }
})();

// Hadlebars setup
app.engine('hbs', handlebars.engine({
    extname: '.hbs',
    defaultLayout: 'main',
    layoutsDir: 'src/views/layouts/',
    runtimeOptions: {
        allowProtoMethodsByDefault: true,
    },
    helpers: {
        setTitle(title) {
            this.title = title;
        }

    }
}));
app.set('view engine', 'hbs');
app.set('views', 'src/views');

// Express setup
app.use(express.static('src/public'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(expressSession({
    secret: 'secret12345', // TODO: Change this to enviroment var SESSION_SECRET in .env file
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, httpOnly: true, maxAge: 3600000 }
}));
app.use(auth);
app.use(tempData);
app.use(routes);

// Routes
// The app.use(routes); middleware is handling the root URL (/) before it reaches this route handler.
// app.get('/', (req, res) => {
//     console.log('Root URL accessed');
//     res.send('Hello, world!');
// });

// Catch-all route for 404 errors
app.use((req, res) => {
    res.status(404).render('404');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
