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
    ],
    include: [
			{
				model: Comment,
				attributes: ["id", "comment_text", "post_id", "user_id"],
				include: {
					model: User,
					attributes: ["username"],
				},
			},
			{
				model: User,
				attributes: ["username"],
			},
		]


      
  })
    .then(dbPostData => {
      const blogs = dbPostData.map(blogs => blogs.get({ plain: true }));
	  console.log(blogs)
      res.render('homepage', {
        blogs,
        loggedIn: req.session.loggedIn
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/login', (req, res) => {

  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get("/createPost", (req, res) => {
	Blog.findAll({
		where: {
			// use the ID from the session
			user_id: req.session.user_id,
		},
		attributes: [
			"id",
			"blog_details",
			"title",
			"created_at",

			[
				sequelize.literal(
					"(SELECT COUNT(*) FROM comment WHERE blog.id = comment.post_id)"
				),
				"comment_count",
			],
		],
		include: [
			{
				model: Comment,
				attributes: ["id", "comment_text", "post_id", "user_id"],
				include: {
					model: User,
					attributes: ["username"],
				},
			},
			{
				model: User,
				attributes: ["username"],
			},
		],
	})
		.then((dbPostData) => {
			// serialize data before passing to template
			const blogs = dbPostData.map((blog) => blog.get({ plain: true }));
			res.render("createPost", {
				blogs,
				loggedIn: req.session.loggedIn,
				user_id: req.session.user_id,
			});
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

router.get("/editPost/:id", (req, res) => {
	Blog.findOne({
		where: {
			id: req.params.id,
		},
		attributes: [
			"id",
			"blog_details",
			"title",
			"created_at",
			[
				sequelize.literal(
					"(SELECT COUNT(*) FROM comment WHERE blog.id = comment.post_id)"
				),
				"comment_count",
			],
		],
		include: [
			{
				model: Comment,
				attributes: ["id", "comment_text", "post_id", "user_id"],
				include: {
					model: User,
					attributes: ["username"],
				},
			},
			{
				model: User,
				attributes: ["username"],
			},
		],
	})
		.then((dbPostData) => {
			if (!dbPostData) {
				res.status(404).json({ message: "No post found with this id" });
				return;
			}
			const blog = dbPostData.get({ plain: true });
			
			res.render("edit-post", {
				blog,
				loggedIn: req.session.loggedIn,
				user_id: req.session.user_id,
			});
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});
router.get("/singlePost/:id", (req, res) => {
	Blog.findOne({
		where: {
			id: req.params.id,
		},
		attributes: [
			"id",
			"blog_details",
			"title",
			"created_at",
			[
				sequelize.literal(
					"(SELECT COUNT(*) FROM comment WHERE blog.id = comment.post_id)"
				),
				"comment_count",
			],
		],
		include: [
			{
				model: Comment,
				attributes: ["id", "comment_text", "post_id", "user_id"],
				include: {
					model: User,
					attributes: ["username"],
				},
			},
			{
				model: User,
				attributes: ["username"],
			},
		],
	})
		.then((dbPostData) => {
			if (!dbPostData) {
				res.status(404).json({ message: "No post found with this id" });
				return;
			}
			const blog = dbPostData.get({ plain: true });
			console.log(blog)
			res.render("single-post", {
				blog,
				loggedIn: req.session.loggedIn,
				user_id: req.session.user_id,
			});
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

module.exports = router;