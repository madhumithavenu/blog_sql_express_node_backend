// const bcrypt = require("bcryptjs");
const mysql = require('mysql2');
const db = require('../config/db.js');

module.exports.getAllUser = async (req, res, next) => {
    db.query('SELECT * FROM USERS',(err, results) => {
    if (err) {
        console.log(err);
    } else {
        return res.send(results);
    }
})
};

module.exports.signup = (req, res) => {
    const { name, email, password} = req.body;
    db.query('SELECT EMAIL FROM USERS WHERE EMAIL = ?',[email], (err, results) => {
        if (err) {
            console.log(err);
        }
        if (results.length > 0) {
            return res.json( {
                message: 'That email is already in use'
            })
        } else if (password !== password) {
            return res.render({
                message: 'Password do not match'
            })
        }

        // let hashedPassword = await bcrypt.hash(password, 8);
        // console.log(hashedPassword);

        // res.send("testing");
        db.query('INSERT INTO USERS SET ?', { name: name, email: email, password: password }, (err, results) => {
            if (err) {
                console.log(err);
            } else {
                console.log(results);
                return res.json({
                    message: 'User registered'
                })
            }
        })
    });
}

module.exports.login = async (req, res, next) => {
   const { email, password } = req.body;
   db.query('SELECT * FROM USERS WHERE EMAIL=?',[email],(err,results)=>{
    if(err){
        console.log(err);
    }
    if (results.length === 0) return res.json({ message: 'NO User Found' })
        results.forEach(ele => {
            if (email === ele.EMAIL) {
                if (password === ele.PASSWORD) {
                    return res.json( {
                        message: 'Login successfull'
                    })
                } else {
                    return res.json({ message: 'Invalid Password' })
                }
            }
        })
   })
}