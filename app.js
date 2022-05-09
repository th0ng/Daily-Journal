//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/blogDB");

const postSchema = {
    title: String,
    content: String
};

const Post = mongoose.model("Post", postSchema);

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Yahallo pips!";


const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static("public"));

app.get('/', (req, res) => {
    Post.find({}, function (err, posts) {
        res.render("home", {
            startingContent: homeStartingContent,
            posts: posts
        });
    })
});

app.get('/about', (req, res) => {
    res.render('about', {
        aboutContent: aboutContent
    });
});

app.get('/contact', (req, res) => {
    res.render('contact');
});

app.get('/compose', (req, res) => {
    res.render('compose');
});

app.post('/compose', (req, res) => {
    const post = new Post({
        title: req.body.postTitle,
        content: req.body.postBody
    });
    post.save(function (err) {
        if (!err) {
            res.redirect("/");
        }
    });
})

app.get("/posts/:postId", function (req, res) {
    const requestedPostId = req.params.postId;
    Post.findOne({
        _id: requestedPostId
    }, function (err, post) {
        res.render("post", {
            title: post.title,
            content: post.content
        });
    });
});


app.listen(process.env.PORT || 3000, function () {
    console.log("Server started on port 3000");
});