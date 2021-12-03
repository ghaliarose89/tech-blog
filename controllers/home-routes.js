const router = require("express").Router();
const sequelize = require("../config/connection");
const { User, Blog, Comment } = require("../models");

    router.get('/', (req, res) => {
        console.log('======================');
        Blog.findAll({
          attributes: [
            'id',
            'blog_details',
            'title',
            'created_at',
          ]
        })
          .then(dbPostData => {
            const blogs = dbPostData.map(blogs => blogs.get({ plain: true }));
      
            res.render('homepage', {
              blogs,
              //loggedIn: req.session.loggedIn
            });
          })
          .catch(err => {
            console.log(err);
            res.status(500).json(err);
          });
      });
      
      router.get('/login', (req, res) => {
        if (req.session.loggedIn) {
          res.render('/');
          return;
        } else
       { console.log()
        res.render('login');}
      });


module.exports = router;