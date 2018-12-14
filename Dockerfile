# ******************************************* BUILD STAGE 1 - Base Dependencies ******************************************* 
# Loading official Node image as base image (Insetead of lean alpine version) because we need build tools for run modules like cypress.
# Also its used as full fedged developer enviroment.

FROM node:10 as base

RUN mkdir /app
WORKDIR /app

# Copying dependencies(package.json & package-lock.json) first to make use of cache layer.
COPY package*.json ./

# Installing production and developer dependencies regardless of NODE_ENV.
RUN npm install --only=production && npm install --only=development && npm cache clean --force

# Installing Cypress Dependecies (We could have just use docker cypress image,
# But since we are using cypress even outside of docker in this project need lots of changes to optimizing,So For now just installing dependencies manually here.)
RUN apt-get update && \
  apt-get install -y \
  libgtk2.0-0 \
  libnotify-dev \
  libgconf-2-4 \
  libnss3 \
  libxss1 \
  libasound2 \
  xvfb

# Adding node_modules binary to PATH.
ENV PATH /app/node_modules/.bin:$PATH


# ******************************************* SUB BUILD STAGE - For Development/Testing ******************************************* 
FROM base as dev

# Exposing Ports For
#   3000 - Local Development Server
#   9009 - Storybook Server
EXPOSE 3000 9009

# Copying Source Code.
COPY . ./

CMD npm start

# ******************************************* SUB BUILD STAGE - For Produce React Artifacts ******************************************* 
FROM dev as build

# Building React Prodcution Files.
RUN npm run build

# ******************************************* FINAL BUILD STAGE - Production Build *******************************************
# Loading official Node Alpine image as final image (For Smaller Finzlized Image).
FROM nginx:1.14-alpine as prod
EXPOSE 80

# Copying React build artifacts from previous stage.
COPY --from=build /app/build /usr/share/nginx/html