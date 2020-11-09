# chess24 Tech Challenge

## Summary

The Tech Challenge app consits of a frontend application and backend application.

The frontend app consists of a login page and allows player to create a room for the chess game.
Multiple Players can join the same game with the URL provided in the app after login.
Once 2 or more player join the game, a chessboard with chess pieces along with the player names will be shown in screen. For the current implementation, i have implmented concurrency only for white chess pieces due to time constraints.

I have used websockets as the mode of communication for both frontend and backend applications. The library used is socket.io as it provides a stateful, realtime, bi-directional communication for both frontend and backend application.

The backend app consists of all the server side logic, implementation and support for socket.io and Document store in MongoDB. I have used Mongoose as the Object Data Modeling library for MongoDB as it provides a simple interface to manages relationships between data, provides schema validation and is used to translate and represent objects in code. Once a valid move is placed by the players in the frontend app, socket.io communicates the information to the backend app and push data into the Database.

## Requisites

- NodeJS v14 with npm v6.14 or higher
- Docker v19 or higher
- docker-compose v1.25.5 or higher
- nodemon (optional)

Docker and docker-compose are required to run a mongodb (v3.6) instance locally your backend app can connect to, in order to store the chess moves performed by the frontend.

The mongodb instance will export the default port _27017_ so you can connect to it on _mongodb://localhost:27017/_

## Backend

I have used existing Nodejs with typescript for backend app. The app is designed with OOP principles and Functional Programming and latest approaches of development.The app is optimized for performance.

### Installation

- Install project dependencies by executing `npm install`

### Execution

- Start the Mongodb instance and the backend app by executing `npm start`

This will start the database with `docker-compose up`, the typescript compiler in watch mode and `nodemon` watching the `./dist/` directory for changes. The default port for the backend express app is 3000, which you can change in the `nodemonConfig` environment inside the [backend package.json](./backend/package.json). Any changes to files in the `src` directory will trigger a typescript compilation and if changes are detected in the compiled files, a restart of the express app.

## Frontend

I have used React with typescript for frontend development. The app is designed with OOP principles, latest approaches of development and is optimized for performance.

### Installation

- Install project dependencies by executing `npm install`

### Execution in Production Environment

- Start the production server by executing `npm run prod`

By default the Production port is 5000. If in case the port is already in use by another application, you will automatically get an notification/option to choose the next available port.

### Execution in Dev Environment

- Start the development server by executing `npm run dev`

By default the Dev port is 3000. If in case the port is already in use by another application, you will automatically get an notification/option to choose the next available port.
