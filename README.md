EloPlusPlus is a web application for asking and answering questions related to games. It is inspired by Quora and built using Sequelize.js, Postgres, and React.js. The live link to the website is at https://eloplusplus.herokuapp.com/.
Technologies used:
* Javascript
* Express
* Postgres
* Sequelize
* React
* HTML

Features:
* Sign up/Sign in with email, username, and password
* Read all questions asked on the site
* Create a question if you're logged in
* Edit or delete a question if you are the owner of the question

To-Do:
- [ ] Implement answers feature so users can create, read, update, and delete answers to questions.
- [ ] Add topics feature so users can view questions associated with a specific topic
- [ ] Add comments feature so users can interact with answers
- [ ] Add like/dislike feature so users can like and dislike questions

Instructions:
* Git clone https://github.com/rogdylan98/EloPlusPlus.git
* Npm install
* Install postgres
* Create a .env file (use .env example for credentials)
* Create a new user in postgres using the credentials from the .env file
* Run npx dotenv sequelize db:create
* Run npx dotenv sequelize db:migrate
* Run npx dotenv sequelize db:seed:all
* Cd to the frontend directory and run npm start
* Cd to the backend directory and run npm start
* Use demo login or create a new user

Dependencies: 
* "@testing-library/jest-dom": "^5.16.0",
* "@testing-library/react": "^11.2.7",
* "@testing-library/user-event": "^12.8.3",
* "js-cookie": "^3.0.1",
* "react": "^17.0.2",
* "react-dom": "^17.0.2",
* "react-redux": "^7.2.6",
* "react-router-dom": "^5.3.0",
* "react-scripts": "4.0.3",
* "redux": "^4.1.2",
* "redux-thunk": "^2.4.1"
* "bcryptjs": "^2.4.3",
* "cookie-parser": "^1.4.6",
* "cors": "^2.8.5",
* "csurf": "^1.11.0",
* "dotenv": "^10.0.0",
* "express": "^4.17.1",
* "express-async-handler": "^1.2.0",
* "express-validator": "^6.13.0",
* "helmet": "^4.6.0",
* "jsonwebtoken": "^8.5.1",
* "morgan": "^1.10.0",
* "per-env": "^1.0.2",
* "pg": "^8.7.1",
* "sequelize": "^5.22.4",
* "sequelize-cli": "^5.5.1"
