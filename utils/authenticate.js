const req = require("express/lib/request");
const res = require("express/lib/response");

const authenticate = (req, res, next) => {
    if (!req.session.user_id) {
        res.redirect('/login');
    } else {
        next();
    }
};

module.exports = authenticate;