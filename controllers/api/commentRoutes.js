const router = require("express").Router();
const { Comment, User } = require("../../models");
const withAuth = require("../../utils/auth");

router.get("/", async (req, res) => {
  try {
    const commentData = await Comment.findAll({
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });

    res.status(200).json(commentData);
  } catch (err) {
    res.status(400).json(err);
  }
});


//working on recieving the correct information here.
router.post("/", async (req, res) => {
  try {
    const newComment = await Comment.create({
      response: req.body.response,
      user_id: req.session.user_id,
      post_id: req.body.post_id
    });

    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!commentData) {
      res.status(404).json({ message: "No comment found with this id!" });
      return;
    }

    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
