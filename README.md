[![Build Status](https://travis-ci.com/SandunWebDev/hackerbay-frontend.svg?branch=master)](https://travis-ci.com/SandunWebDev/hackerbay-frontend) [![codecov](https://codecov.io/gh/SandunWebDev/hackerbay-frontend/branch/master/graph/badge.svg)](https://codecov.io/gh/SandunWebDev/hackerbay-frontend)


# Hackerbay Server Monitoring Project - FrontEnd

This is the Frontend part of the Server Monitoring Project. Backend part of the project can be found on [Hackerbay - Backend.](https://github.com/SandunWebDev/hackerbay/)

## How To Run

### # IF YOU HAVE DOCKER
- Just run `npm run docker:dev:run`. It will install and run all the dependencies and services need to run this project. Then you can interact with the program through http://localhost:3000.

- Also already built "Docker Images" of this project can be found in [here](https://cloud.docker.com/repository/docker/sandunwebdev/hb-frontend-image-prod).

### # IF YOU DONT'T HAVE DOCKER
- Run `npm install` to install dependencies.
- Then run `npm start`.
- Normally you can interact with program through http://localhost:3000.

NOTE : Make sure hackerbay backend server & postgres database servers are already running.

## How To Test

- `npm test` - All Tests.
- `npm run test:unitandintegration` - Unit & Integration Testing.
- `npm run test:storyhshots` - Structural Testing.
- `npm run test:imageshots:local` - Visual Testing.
- `npm run test:cypress:local` - E2E Testing.
  
- `npm run storybook` - Component Testing.

## Used Technologies & Main Packages

| FrontEnd     | BackEnd                                                               | Tools                      | Other              |
| ------------ | --------------------------------------------------------------------- | -------------------------- | ------------------ |
| React        | See [Hackerbay - Backend](https://github.com/SandunWebDev/hackerbay/) | Jest + Enzyme + Sinon      | TravisCI + CodeCov |
| Redux        |                                                                       | StoryBook + Cypress        | Docker             |
| React Router |                                                                       | ESLint + AirBnB + Prettier |                    |
|              |                                                                       |                            |                    |
|              |                                                                       |                            |                    |
