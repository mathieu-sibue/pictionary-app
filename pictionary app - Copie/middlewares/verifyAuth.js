const User = require('../models/user');

module.exports = (req, res, next) => {
    console.log()
    User.findById(req.session.userId, (error, user) => {
        if (error || !user) {
            return res.redirect('/login')
        };
        next()
    });
}

//ne pas oublier de require le middleware sur le fichier app.js apres puis app.use(...) pr register le middleware en question