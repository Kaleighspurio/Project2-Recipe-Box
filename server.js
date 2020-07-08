const express = require('express');
const fileUpload = require('express-fileupload');
const db = require('./models');
const routes = require('./routes');

const app = express();

const PORT = process.env.PORT || 8080;
// needed for the image upload
app.use(fileUpload());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.use('/', routes);

// Sync sequelize models then start Express app
// =============================================
db.sequelize.sync().then(() => {
  console.log("where is it coming from??");
  
  app.listen(PORT, () => {
    console.log(`App listening on PORT ${PORT}`);
  });
});
