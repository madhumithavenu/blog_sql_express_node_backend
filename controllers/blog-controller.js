const mysql = require('mysql2');
const db = require('../config/db.js');

module.exports.getAllBlogs = async (req, res, next) => {
    db.query('SELECT * FROM BLOGS', (err, results) => {
        if (err) {
            console.log(err);
        } else {
            return res.send(results);
        }
    })
}

module.exports.addBlog = async (req, res, next) => {
    const { title, description, image, id } = req.body;
    db.query('SELECT * FROM USERS WHERE ID = ?', [id], (err, results) => {
        if (err) {
            console.log(err);
        }
        if (results.length === 0) {
            return res.json({
                message: 'Unable to find the user'
            })
        }
        db.query('INSERT INTO BLOGS SET ?', { title: title, description: description, image: image, id: id }, (err, results) => {
            if (err) {
                console.log(err);
            } else {
                console.log(results);
                return res.json({
                    message: 'Blog added'
                })
            }
        })
    })
};


module.exports.updateBlog = async (req, res, next) => {
    const { title, description, image, id } = req.body;
    const blogId = req.params.id;
    console.log(blogId);

    db.query('UPDATE BLOGS SET TITLE=?, DESCRIPTION = ?, IMAGE= ?, ID=? WHERE B_ID =?', [title, description, image, id, blogId], (err, results) => {
        if (err) {
            console.log(err);
            return res.json({
                message: 'Error in the server'
            });
        } else {
            console.log(results);

            if (results.affectedRows === 0) return res.json({
                message: 'Could not find the blog'
            });


            return res.json({
                message: 'Blog updated'
            });
        }
    })
};


module.exports.getById = async (req, res, next) => {
    const blogId = req.params.id;
    db.query('SELECT * FROM BLOGS WHERE B_ID=?', [blogId], (err, results) => {
        if (err) {
            console.log(err);
        } else {
            console.log(results);

            if (results.obj = ['']) return res.json({
                message: 'Could not find the blog'
            });
            return res.send(results);
        }
    })
};


module.exports.deleteBlog = async (req, res, next) => {
    const blogId = req.params.id;
    db.query('DELETE FROM BLOGS WHERE B_ID=?', [blogId], (err, results) => {
        if (err) {
            console.log(err);
            return res.json({
                message: 'Error in the server'
            });
        } else {
            console.log(results);

            if (results.affectedRows === 0) return res.json({
                message: 'Could not find the blog'
            });


            return res.json({
                message: 'Blog deleted'
            });
        }
    })
};

module.exports.getByUserId = async (req, res, next) => {
    const userId = req.params.id;
    db.query('SELECT * FROM BLOGS WHERE ID=?', [userId], (err, results) => {
        if (err) {
            console.log(err);
            return res.json({
                message: 'unable to find the Blog'
            })
        } else {
            return res.send(results);
        }
    })
};