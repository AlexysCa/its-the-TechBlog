const homepageRout = require('./homepage-routes');
const userDashRout = require('./userDash-routes');
const apiRout = require('./api');
const req = require('express/lib/request');
const res = require('express/lib/response');
const router = require('express').Router();

router.use('/', homepageRout);
router.use('/dashboard', userDashRout);
router.use('/api', apiRout);

router.use((req, res) => {
    res.status(404).end();
});

module.exports = router;