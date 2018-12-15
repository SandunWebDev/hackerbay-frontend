[![Build Status](https://travis-ci.com/SandunWebDev/hackerbay-frontend.svg?branch=task5)](https://travis-ci.com/SandunWebDev/hackerbay-frontend) [![codecov](https://codecov.io/gh/SandunWebDev/hackerbay-frontend/branch/task5/graph/badge.svg)](https://codecov.io/gh/SandunWebDev/hackerbay-frontend)

# Hackerbay Server Monitoring Project - FrontEnd

Frontend part of the Server Monitoring Project. Backend part can be found on [Hackerbay - Backend.](https://github.com/SandunWebDev/hackerbay/)

## How To Run

- Clone the repository.
- `cd` into the source directory.
- Run `npm install` to install dependencies.
- Then run `npm start`.
- Normally you can interact with program through http://localhost:4000

NOTE : Make sure hackerbay backend server & postgres database servers are already running.

## How To Test

- `npm test` - All Tests.
- `npm run test:unitandintegration` - Unit & Integration Testing.
- `npm run test:storyhshots` - Structural Testing.
- `npm run test:imageshots:local` - Visual Testing.
- `npm run test:cypress:local` - E2E Testing.
- 
- `npm run storybook` - Component Testing.

## Used Technologies & Main Packages

| FrontEnd           | BackEnd                                                               | Tools                               | Other            |
| ------------------ | --------------------------------------------------------------------- | ----------------------------------- | ---------------- |
| React              | See [Hackerbay - Backend](https://github.com/SandunWebDev/hackerbay/) | ESLint + Prettier                   | Create-React-App |
| React Router       |                                                                       | Jest + Enzyme + StoryBook + Cypress |                  |
| Redux + ReactRedux |                                                                       |                                     |
|                    |                                                                       |                                     |                  |
|                    |                                                                       |                                     |                  |
