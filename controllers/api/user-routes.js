const router = require('express').Router();
const req = require('express/lib/request');
const res = require('express/lib/response');
const {User, Post, Comment} = require('../../models');

// this route will get all Users
router.get('/', (req, res) => {
    User.findAll({
        attributes: {
            exclude: ['password']
        }
    })
    .then(userData => res.json(userData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

// this route will get a specific user by the id
router.get('/:id', (req, res) => {
    User.findOne({
        attributes: {
            exclude: ['password']
        },
        where: {
            id: req.params.id
        },
        include: [{
            model: Post,
            attributes: ['id', 'title', 'content', 'created_at']
        },
        {
            model: Comment,
            attributes: ['id', 'comment_text', 'created_at'],
            include: {
                model: Post,
                attributes: ['title']
            }
        }
    ]
    })
    .then(userData => {
        if (!userData) {
            res.status(404).json({ message: 'No user found with that id'});
            return;
        }
            res.json(userData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

// creates a user
router.post('/', (req, res) => {
    User.create({
        username: req.body.username,
        password: req.body.password
    })
    .then(userData => {
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.username = userData.username;
            req.session.loggedIn = true;

            res.json(userData);
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})

router.post('/login', (req, res) => {
    User.findOne({
        where: {
            username: req.body.username
        }
    })
    .then(userData => {
        if (!userData) {
            res.status(400).json({ message: 'No user found with that username'})
            return;
        }
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.username = userData.username;
            req.session.loggedIn = true;

        res.json({
            user: userData,
            message: 'You are now logged in'
            })
        })
    const validatePW = userData.checkPassword(req.body.password);
        if (!validatePW) {
            res.status(400).json({ message: 'Incorrect password entered'})
            return;
        }
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.username = userData.username;
            req.session.loggedIn = true;

        res.json({
            user: userData,
            message: 'You are now logged in'
            })
        })
    })
})

router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        })
    } else {
        res.status(404).end();
    }
});

module.exports = router;