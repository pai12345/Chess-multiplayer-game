# chess24 Tech Challenge

The Tech Challenge is designed to allow you to show us your programming skills. It is composed of a frontend and a backend task. The details are in the [briefing](./briefing.pdf). Here we explain how to get the project running

## Requisites:

- NodeJS v14 with npm v6.14 or higher
- Docker v19 or higher
- docker-compose v1.25.5 or higher

Docker and docker-compose are required to run a mongodb (v3.6) instance locally your backend app can connect to, in order to store the chess moves performed by the frontend.

The mongodb instance will export the default port _27017_ so you can connect to it on _mongodb://localhost:27017/_

## Backend

- Install project dependencies by executing `npm install`
- Start the mongodb instance and the backend app by executing `npm start`

This will start the database with `docker-compose up`, the typescript compiler in watch mode and `nodemon` watching the `./dist/` directory for changes. The default port for the backend express app is 3000, which you can change in the `nodemonConfig` environment inside the [backend package.json](./backend/package.json). Any changes to files in the `src` directory will trigger a typescript compilation and if changes are detected in the compiled files, a restart of the express app.

## Frontend

- Install project dependencies by executing `npm install`
- Start the Vue dev server by executing `npm run serve`

The frontend app consist of a skeleton [Vue.js](https://vuejs.org/) 2.6 app with [Typescript](https://www.typescriptlang.org/) support already included.

The Vue dev server has Hot Module Replacement enabled, so any changes to the files in the `src` directory will trigger recompilation and page refresh in the browser

## Lints and fixes files

```
npm run lint
```

# Deliverable

Please deliver a ZIP file containing the source code and any necessary instructions, but do not include the `node_modules` directory.
