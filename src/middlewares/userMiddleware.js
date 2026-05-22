const User = require('../model/user');

async function requireAuth(req, res, next) {

    try {

        const sessionId = req.cookies.sessionId;

        if (!sessionId) {
            return res.redirect('/users/login');
        }

        const user = await User.findOne({
            sessions: sessionId
        });

        if (!user) {
            return res.redirect('/users/login');
        }

        req.user = user;

        next();

    } catch (err) {

        console.error(err);

        return res.redirect('/users/login');
    }
}

module.exports = {
    requireAuth,
};