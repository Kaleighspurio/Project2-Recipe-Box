const router = require('express').Router();

const nodemailer = require('nodemailer');
const db = require('../models');
require('dotenv').config();

// Get the recipe from the database by its id
// /api/view/:id
router.get('/:id', (req, res) => {
  db.Recipe.findOne({
    where: { id: req.params.id },
    include: [
      { model: db.Comment, as: 'Comments' },
      { model: db.Ingredient, as: 'Ingredients' },
      { model: db.Author, as: 'Author' },
    ],
  }).then((data) => {
    res.json(data);
  });
});

// Post a comment to the comment table for that recipe
// /api/view/comment
router.post('/comment/:id', (req, res) => {
  db.Comment.create({
    comment: req.body.comment,
    commenter_name: req.body.commenter_name,
    RecipeId: req.params.id,
  }).then((result) => {
    // Send back the ID of the recipe
    res.json(result);
  });
});

// Update the special notes
// /api/view/id
router.put('/:id', (req, res) => {
  db.Recipe.updateOne(
    { special_notes: req.body.notes },
    { where: { id: req.params.id } },
  ).then((result) => {
    if (result.changedRows === 0) {
      // If no rows were changed, then the ID must not exist, so 404
      res.status(404).end();
    }
    res.status(200).end();
  });
});


// Update the number of favorites (likes) that a recipe has
router.put('/favorites/:id', (req, res) => {
  // const newFavoriteCount = parseInt(req.body.favorites) + 1;
  db.Recipe.update(
    { favorite_count: req.body.favorites },
    { where: { id: req.params.id } },
  ).then((result) => {
    if (result.changedRows === 0) {
      // If no rows were changed, then the ID must not exist, so 404
      res.status(404).end();
    }
    res.status(200).end();
  });
});

// To be able to send emails on request we're using nodemailer

router.post('/send', (req, res) => {
  const output = `
   <p>You have a new request for a recipe</p>
   <h3>Recipe details</h3>
   <ul>
    <li>Name: ${req.body.name}</li>
    <li>Email: ${req.body.email}</li>
   </ul>
    <h3>Message</h3>
    <p>Though you might like this recipe</p>
    <a href=${req.body.recipe}>${req.body.recipe}</a>
   `;

  const transporter = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: 'ab4d5badf5923e',
      pass: 'c94ab9f6b80d78',
    },
  });

  // send mail with defined transport object
  const mailOptions = {
    from: '"Recipe Box" < RecipeBox@recipebox.com>', // sender address
    to: `${req.body.email}`, // list of receivers
    subject: 'Your Recipe', // Subject line
    text: 'Enjoy your recipe', // plain text body
    html: output, // html body
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.json({ err: error, success: false });
    }
    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    res.json({ result: info, success: true });
  });
});

// Export so it can be used by other files
module.exports = router;
