require("dotenv").config();
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const passport = require('./config/passport');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const secure = require('./middleware/auth');
const post = require('./controllers/postController');
const comment = require('./controllers/commentController');
const languageLoader = require('./middleware/languageLoad');

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));

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
app.use('/lang', langRoutes);

app.get("/", async (req, res) => {
    try {
        const posts = await post.getRecentPosts();
        res.render("home", { recentPosts: posts });
    }
    catch (err) {
        res.json(`ERR: ${err}`);
    }
});

app.get("/loginHistory", secure.passportAuth({ redirect: true }), (req, res) => {
    res.render("loginHistory");
});

app.get("/userHistory", secure.passportAuth({ redirect: true }), async (req, res) => {
    const tab = req.query.tab || 'posts';
    const posts = await post.getPostsById(req.user._id);
    const comments = await comment.getCommentsById(req.user._id);

    res.render("userHistory", { posts: posts, comments: comments, tab: tab });
});

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
