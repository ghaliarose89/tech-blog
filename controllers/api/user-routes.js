
const router = require('express').Router();
const { User, Blog } = require('../../models');


// get all users
router.get("/", (req, res) => {
	User.findAll({
		attributes: { exclude: ["password"] },
		// include: [
		// 	{
		// 		model: Blog,
		// 		attributes: ["id", "title", " blog_details", "created_at"],
		// 	},
		// ],
	})
		.then((dbUserData) => res.json(dbUserData))
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

//get user by Id
router.get("/:id", (req, res) => {
	User.findOne({
		attributes: { exclude: ["password"] },
		where: {
			id: req.params.id,
		},
		// include: [
		// 	{
		// 		model: Blog,
		// 		attributes: ["id", "title", " blog_details", "created_at"],
		// 	},
		// ],
	})
		.then((dbUserData) => {
			if (!dbUserData) {
				res.status(404).json({ message: "No user found with this id" });
				return;
			}
			res.json(dbUserData);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

router.post('/', (req, res) => {
	// expects {username: 'Lernantino', email: 'lernantino@gmail.com', password: 'password1234'}
	User.create({
	  username: req.body.username,
	  email: req.body.email,
	  password: req.body.password
	})
	  .then(dbUserData => {
		req.session.save(() => {
		  req.session.user_id = dbUserData.id;
		  req.session.username = dbUserData.username;
		  req.session.loggedIn = true;
		  res.json(dbUserData);
		});
	  })
	  .catch(err => {
		console.log(err);
		res.status(500).json(err);
	  });
  });

// login User
router.post('/login', (req, res) => {
	// expects {email: 'lernantino@gmail.com', password: 'password1234'}
	User.findOne({
		where: {
			email: req.body.email
		}
	}).then(dbUserData => {
		if (!dbUserData) {
			res.status(400).json({ message: 'No user with that email address!' });
			return;
		}

		const validPassword = dbUserData.checkPassword(req.body.password);

		if (!validPassword) {
			res.status(400).json({ message: 'Incorrect password!' });
			return;
		}

		req.session.save(() => {
			req.session.user_id = dbUserData.id;
			req.session.username = dbUserData.username;
			req.session.loggedIn = true;

			res.json({ user: dbUserData, message: 'You are now logged in!' });
		});
	});
});

//loging out 
router.post('/logout', (req, res) => {
	if (req.session.loggedIn) {
		req.session.destroy(() => {
			res.status(204).end();
		});
	} else {
		res.status(404).end();
	}
});
//Updating user data
router.put('/:id', (req, res) => {
	// expects {username: 'Lernantino', email: 'lernantino@gmail.com', password: 'password1234'}

	// pass in req.body instead to only update what's passed through
	User.update(req.body, {
		individualHooks: true,
		where: {
			id: req.params.id
		}
	})
		.then(dbUserData => {
			if (!dbUserData) {
				res.status(404).json({ message: 'No user found with this id' });
				return;
			}
			res.json(dbUserData);
		})
		.catch(err => {
			console.log(err);
			res.status(500).json(err);
		});
});
//   Delete the user
router.delete('/:id', (req, res) => {
	User.destroy({
		where: {
			id: req.params.id
		}
	})
		.then(dbUserData => {
			if (!dbUserData) {
				res.status(404).json({ message: 'No user found with this id' });
				return;
			}
			res.json(dbUserData);
		})
		.catch(err => {
			console.log(err);
			res.status(500).json(err);
		});
});



module.exports = router;
