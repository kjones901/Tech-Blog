const sequelize = require("../config/connection");
const { User, Post, Comment } = require("../models");

const userData = require("./userData.json");
const postData = require("./postData.json");
const commentData = require("./commentData.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  console.log("======CONNECTED======");

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
  console.log("======USERS SEEDED======");

  await Post.bulkCreate(postData);

  console.log("======POSTS SEEDED======");

  await Comment.bulkCreate(commentData);

  console.log("======COMMENTS SEEDED======");

  process.exit(0);
};

seedDatabase();
