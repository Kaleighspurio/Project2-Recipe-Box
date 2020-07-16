# Recipe-Box

## Description
This full-stack app utilze a SQL database to store recipes that the user can view.  Users can also search for recipes in using multiple different search parameters, add new recipes of their own, comment on recipes, email a recipe to someone and share recipes on social media.  This application also has a "Favorites" recipe page that shows the most "liked" recipes.

The Nodemailer email is fully functional, but currently set up with a mailtrap, so it won't actually send out emails at this time.

View the app deployed to heroku [HERE](https://fast-mountain-43531.herokuapp.com/index.html)!

## Table of Contents

  - [Description](#description)
  - [Technologies](#technologies)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Credits](#credits)

## Technologies
This application is a full stack application using HTML, CSS, JavaScript, jQuery, Bootstrap, NodeJS, Sequelize and Express.  It also utilizes the following dependencies:
* dotenv
* express
* express-fileupload
* mysql2
* sequelize
* nodemailer

## Installation
You'll need to run npm install to install of the dependencies.  Create a .env file to the root with your information for the following to run it locally:
```
DB_HOST="localhost"
DB_PORT=3306
DB_USER="root"
DB_PASSWORD="YOURPASSWORDHERE"
DB_NAME="recipe_box"
```

## Usage
#### Home screen
![Search for a recipe](public/assets/images/Screen%20Shot%202020-07-12%20at%208.40.20%20PM.png)
#### View a recipe
![View a recipe](public/assets/images/Screen%20Shot%202020-07-12%20at%208.40.42%20PM.png)
#### Create/Add a recipe
![Create a recipe](public/assets/images/Screen%20Shot%202020-07-12%20at%208.40.59%20PM.png)


## Credits

Contributors to this app: Angela Gutierrez, Bryan Pero, Kaleigh Spurio, Karen Astell, and Lynn Boudreau
