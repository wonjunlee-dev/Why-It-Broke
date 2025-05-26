require("dotenv").config();
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const passport = require('./config/passport');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const secure = require('./middleware/auth');
const languageLoader = require('./middleware/languageLoad');
const methodOverride = require('method-override');

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));

app.use(methodOverride('_method'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(passport.initialize());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.use(secure.optionalJwtAuth);
app.use(languageLoader);

const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);

const postRoutes = require('./routes/post');
app.use('/api', postRoutes);

const commentRoutes = require('./routes/comment');
app.use('/api', commentRoutes);

const langRoutes = require('./routes/language');
app.use('/api', langRoutes);

const viewRoutes = require('./routes/view');
app.use('/', viewRoutes);

app.use((req, res, next) => {
    res.status(404).render("404", { message: "Sorry, we're unable to find what you're looking for" });
});

const PORT = process.env.PORT || 3000;
async function initialize() {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`app listening on: ${PORT}`);
        })
    }
    catch (err) {
        console.error("Failed to start server", err);
        process.exit(1);
    }
}
initialize();
