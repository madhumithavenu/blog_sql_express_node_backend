const mysql = require('mysql2');
const db = require('../config/db.js');

module.exports.getAllBlogs = async (req, res, next) => {
    db.query('SELECT * FROM BLOGS',(err, results) => {
        if (err) {
            console.log(err);
        } else {
            return res.send(results);
        }
    })
}

module.exports.addBlog = async (req, res, next) => {
    const {title,description,image,id}= req.body;
    db.query('SELECT * FROM USERS WHERE ID = ?',[id], (err, results) => {
        if (err) {
            console.log(err);
        }
        if (results.length === 0) {
            return res.json( {
                message: 'Unable to find the user'
            })
        }
        db.query('INSERT INTO BLOGS SET ?', { title: title, description: description, image: image, id:id }, (err, results) => {
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


// module.exports.updateBlog = async (req, res, next) => {
//     const { title, description } = req.body;
//     const blogId = req.params.id;
//     let blog;
//     try {
//         blog = await Blog.findByIdAndUpdate(blogId, {
//             "title": title,
//             "description":description,
//         });
//     } catch (err) {
//         return console.log(err);
//     }
//     if (!blog) {
//         return res.status(500).json({ message: "Unable To Update The Blog" });
//     }
//     return res.status(200).json({ blog });
// };


// module.exports.getById = async (req, res, next) => {
//     const id = req.params.id;
//     let blog;
//     try {
//         blog = await Blog.findById(id).populate('user');
//     } catch (err) {
//         return console.log(err);
//     }
//     if (!blog) {
//         return res.status(404).json({ message: "No Blog Found" });
//     }
//     return res.status(200).json({ blog });
// };


// module.exports.deleteBlog = async (req, res, next) => {
//     const id = req.params.id;

//     let blog;
//     try {
//         const session = await mongoose.startSession();
//         session.startTransaction({ session });
//         blog = await Blog.findByIdAndRemove(id).populate("user");
//         await blog.user.blogs.pull(blog);
//         await blog.user.save({ session });
//         await session.commitTransaction();
//     } catch (err) {
//         console.log(err);
//     }
//     if (!blog) {
//         return res.status(500).json({ message: "Unable To Delete" });
//     }
//     return res.status(200).json({ message: "Successfully Delete" });
// };


// module.exports.getByUserId = async (req, res, next) => {
//     const userId = req.params.id;
//     let userBlogs;
//     try {
//         userBlogs = await User.findById(userId).populate("blogs");
//     } catch (err) {
//         return console.log(err);
//     }
//     if (!userBlogs) {
//         return res.status(404).json({ message: "No Blog Found" });
//     }
//     return res.status(200).json({ user: userBlogs });
// };
