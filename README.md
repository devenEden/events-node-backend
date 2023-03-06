### EVENTS NODE API

#### Base Technologies

| Technology | Version |
| ---------- | ------- |
| Node JS    | 14.x    |
| NPM        | 6.x     |
| PostgreSQL | 12.x    |

##### Main Packages

| Packages   | Role                     |
| ---------- | ------------------------ |
| Express Js | API Web Server           |
| Sequelize  | Object Relational Mapper |
| JWT        | API Encryption           |

### API Requirements

- NODE v12+
- NPM V6+
- PostgreSQL Installed

### Getting started.

- Clone the repo from Github.
- Create Postgres Database.
- Create `.env` file from `.env.example` and update the necessary environment variables.
- Install dependecies with `npm install`.
- To run the app for develop run `npm run dev`.
- To run the app at production run `npm start`.
- Set nginx or apache for all /assets requests to point to the /assets/ directory to serve static files
- The your app will de deployed on either port `5000` or your desired port number specified in the `.env` file.
