const router = require('express').Router();
const db = require('../models');

// View will have a create/POST to comment,
// it will also have a get to view recipe and comments,
// it will also have a PUT/update to edit the special notes

// /api/view/:id
router.get('/:id', (req, res) => {
  db.Recipe.findOne({
    where: { id: req.params.id },
    include: { model: db.Comment, as: 'Comments' },
  }).then((data) => {
    console.log(data);
    res.json(data);
  });
});

// /api/view/comment
router.post('/comment', (req, res) => {
  db.Comment.create({
    comment: req.body.comment,
    commenter_name: req.body.commenter_name,
    // recipe_id: req.body.recipe_id
  }).then((result) => {
    // Send back the ID of the recipe
    res.json({ id: result.insertId });
  });
});

// /api/view/id
router.put('/:id', (req, res) => {
  db.Recipe.updateOne(
    { special_notes: req.body.notes },
    { where: { id: req.params.id } },
  ).then((result) => {
    if (result.changedRows === 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    }
    res.status(200).end();
  });
});

// Export so it can be used by other files
module.exports = router;
