
const Comment = require("./Comment");
const Blog = require("./Blog");
const User = require("./User");

User.hasMany(Blog, {
    foreignKey: 'user_id'
  });
  
Blog.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: "cascade"
  });

  Comment.belongsTo(User, {
    foreignKey: "user_id",
    onDelete: "cascade"
  });
  
  Comment.belongsTo(Blog, {
    foreignKey: "post_id",
    onDelete: "cascade"
  });
  
  User.hasMany(Comment, {
    foreignKey: "user_id",
    onDelete: "cascade"
  });
  
  Blog.hasMany(Comment, {
    foreignKey: "post_id",
    onDelete: "cascade"
  });

module.exports = {Comment,Blog, User}