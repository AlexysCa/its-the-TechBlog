const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// A user has many posts
User.hasMany(Post, {
    foreignKey: 'user_id'
})

// and a user has many comments
User.hasMany(Comment, {
    foreignKey: 'user_id'
})

// a post belongs to one user
Post.belongsTo(User, {
    foreignKey: 'user_id'
})

// a post has many comments
Post.hasMany(Comment, {
    foreignKey: 'post_id'
})

// a comment belongs to one user
Comment.belongsTo(User, {
    foreignKey: 'user_id'
})

// a comment belongs to one posts
Comment.belongsTo(Post, {
    foreignKey: 'post_id'
})

module.exports = {User, Post, Comment};