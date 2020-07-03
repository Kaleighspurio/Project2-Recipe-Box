const router = require('express').Router();
const db = require('../models');

// const recipe = require("../models/Recipe");"
// const comment = require("../models/Comment");

// View will have a create/POST to comment, it will also have a get to view recipe and comments,
// it will also have a PUT/update to edit the special notes

router.get("/", (req, res) => {
db.Recipe.selectAll(function (data) {
    console.log(data);
    res.render("index", { recipe: data });
  });
});

router.post("/api/comment", function (req, res) {
  comment.insertOneComment(
    ["comment", "commenter_name"],
    [req.body.comment, req.body.commenter_name],
    function (result) {
      // Send back the ID of the recipe
      res.json({ id: result.insertId });
    }
  );
});

router.put("/api/recipe/:id", function (req, res) {
  var condition = "id = " + req.params.id;

  recipe.updateOne({ edit: req.body.recipe }, condition, function (
    result
  ) {
    if (result.changedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

//Export so it can be used by other files
module.exports = router;

