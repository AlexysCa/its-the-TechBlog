const router = require('express').Router();
const req = require('express/lib/request');
const res = require('express/lib/response');
const sequelize = require('../config/connection');
const {User, Post, Comment} = require('../models');

router.get('/', (req, res) => {
    Post.findAll({
        attributes: ['id', 'title', 'content', 'created_at'],
            include: [{
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username'] 
            }
        ]
    })
    .then(postData => {
        const posts = postData.map(post => post.get({
            plain: true
        }));
    res.render('homepage', {
        posts,
        loggedIn: req.session.loggedIn
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})

router.get('/post/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id','title','content','created_at'],
        include: [{
            model: Comment,
            attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
            include: {
                model: User,
                attributes: ['username']
            }
        },
        {
            model: User,
            attributes: ['username']
            }
        ]
    })
    .then(postData => {
        if (!postData) {
            res.status(404).json({ message: 'No post found with that id'});
            return;
        }
        const post = postData.get({
            plain: true
        });
        res.render('one-post', {
            post,
            loggedIn: req.session.loggedIn
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('signup');
});

router.get('*', (req, res) => {
    res.status(404).send('Cannot access');
});

module.exports = router;