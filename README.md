# Chat Room Application - Frontend Project

## Getting Started

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### 1. Installing minimum deps

Make sure you have `node` installed, with a version greater than `7.0.0`. We highly recommend [`nvm`](https://github.com/creationix/nvm), or just installing the latest version of `node` with `brew install node` on macOS.

Once you have a good `node` installed, run `npm install` in this repo to get your dependencies.

### 2. Serving the UI

`npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### 3. Running the api server

We have provided a simple api server for you. You can run `npm run api-server` to start it. Read the [spec](./spec/api-endpoints.md) for more details on the api.

### 4. Testing the app

`npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

## Additional Notes

### Intents:

1. This project was bootstrapped using
   `npx create-react-app Chat-Room-application --template typescript`

2. Installed `antd` package - this was to use form elements that look neat and modern

Installed `@types/react` package

Installed `babel-plugin-import`

Installed `babel-plugin-transform-class-properties`

Installed `less less-loader`

Installed `webpack webpack-cli` - didn't work. needed more loaders. So I removed webpack completely

then `npm install --save-dev typescript ts-loader`

Installed css-modules-typescript-loader - didn't work
Tried this instead `npm install -D typescript-plugin-css-modules` - did not solve the issue

Finally I used this to solve the css issue - https://spin.atomicobject.com/2020/06/22/css-module-typescript/

Creating Login page...

and the rest is history ...

### Design decisions & features

1. Log out feature
2. Empty component when no rooms are selected yet
3. Ellipsis when username is very long
4. Chat area (includes left aligned and right aligned messages)
5. When multiple messages are sent from same user, username is displayed only below the latest message
6. Input field is cleared and focused when 'Send' button is clicked
7. Auto scroll to bottom when the chat area is not enough to show all messages

### Improvements / Suggestions / Random Thoughts

1. User could get added to the room when they click on room name - need an API to support this
   or
   User could view members only, and not message in the Chat, unless they confirm that they want to join the room...
2. How do we have 2 users communicating with each other in 2 different browser tabs - and NOT change server.js file??

    Method 1 - PULL frequently from UI (not recommended)
    I have added a setInterval function to call API every second and check for updates

    Method 2 - PUSH notifications from server (cannot implement without changing server.js file)
