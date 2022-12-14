# Kanban Board

![Kanban Board App Image](./src/assets/kanban-board-dashboard.png)

## Overview

This is a basic web app that allows you to organize tasks and move them from and between the "Backlog", "In Progress", "QA", "Done" boards. This app uses a React frontend. I used react redux to help manage the state. I also used redux-thunk, redux-logger as a middleware for my store. I implemented styled components for styling and react-beautiful-dnd to help manage the drag and drop events.

## Technologies

-   React
-   Redux
-   Redux Thunk
-   Redux Logger
-   Prop-types
-   Styled Components
-   React Beautiful Dnd

## Usage

Clone it!

```
$ git clone git@github.com:thomasbrown25/kanban-board.git
```

Go into the project directory and run the commands:

```
$ npm install
$ npm start
```

Sidenote: for the install, I had to downgrade react version and use 17.0.2 because of an current dependency issue with npm package react-beautiful-dnd. You can use React 18 but will have to --force the install.

Open `http://localhost:3000` and enjoy!

## Frontend

-   Start server - `$ npm start`

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Contributors

-   Creator of Kanban Board app - Thomas Brown
