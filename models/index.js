
const Comment = require("./Comment");
const Blog = require("./Blog");
const User = require("./User");

User.hasMany(Blog, {
    foreignKey: 'user_id'
  });
  
Blog.belongsTo(User, {
    foreignKey: 'user_id',
  });

  Comment.belongsTo(User, {
    foreignKey: "user_id",
  });
  
  Comment.belongsTo(Blog, {
    foreignKey: "post_id",
  });
  
  User.hasMany(Comment, {
    foreignKey: "user_id",
  });
  
  Blog.hasMany(Comment, {
    foreignKey: "post_id",
  });

module.exports = {Comment,Blog, User}