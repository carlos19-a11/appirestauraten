const User = require('../models/user.model');

const checkEmail =  (req, res, next) => {
    const { email } = req.body;
    User.findByEmail(email, (_, data) => {
        if (data) {
            res.status(400).send({
                status: 'error',
                message: `Ya existe un usuario con el email '${username}' `
            });
            return;
        }
        next();
    });
}

module.exports = checkEmail;