const sequelize = require("../config/connection");
const { User, Post, Comment } = require("../models");

const userData = require("./userData.json");
const postData = require("./postData.json");
const commentData = require('./commentData.json')

const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  console.log("======CONNECTED======")

  const users = await User.bulkCreate(userData, {
    individualHoogs: true,
    returning: true,
  });
  console.log("======USERS SEEDED======")

  for (const post of postData) {
    await Post.create({
      ...post,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  console.log("======POSTS SEEDED======")

  await Comment.bulkCreate(commentData)

  console.log("======COMMENTS SEEDED======")

  process.exit(0);
};

seedDatabase();
