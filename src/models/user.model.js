const db = require('../config/db.config');
const { createNewUser: createNewUserQuery, findUserByEmailQuery: findUserByEmailQuery, findByUsername: findUserByUsernameQuery } = require('../database/queries');
const { logger } = require('../utils/logger');

class User {
    constructor(nombre, email, telefono, password ) {
        this.nombre = nombre;
        this.email = email;
        this.telefono = telefono;
        this.password = password;
    }

    static create(newUser, cb) {
        console.log(newUser)
        db.query(createNewUserQuery,
            [
                newUser.nombre,
                newUser.email,
                newUser.telefono,
                newUser.password
            ], (err, res) => {
                if (err) {
                    logger.error(err.message);
                    cb(err, null);
                    return;
                }
                cb(null, {
                    id: res.insertId,
                    nombre: newUser.nombre,
                    email: newUser.email,
                    telefono: newUser.telefono,
                    password: newUser.password

                });
            });
    }

    static findByEmail(email, cb) {
        db.query(findUserByEmailQuery, email, (err, res) => {
            if (err) {
                logger.error(err.message);
                cb(err, null);
                return;
            }
            if (res.length) {
                cb(null, res[0]);
                return;
            }
            cb({ kind: "not_found" }, null);
        })
    }
    static findByUsername(username, cb) {
        db.query(findUserByUsernameQuery, username, (err, res) => {
            if (err) {
                logger.error(err.message);
                cb(err, null);
                return;
            }
            if (res.length) {
                cb(null, res[0]);
                return;
            }
            cb({ kind: "not_found" }, null);
        })
    }
}

module.exports = User;