# ******************************************* BUILD STAGE 1 - Base Dependencies ******************************************* 
# Loading official Node image as base image (Insetead of lean alpine version) because we need build tools for run modules like cypress.
# Also its used as full fedged developer enviroment.

FROM node:10 as base

RUN mkdir /app
WORKDIR /app

# Copying dependencies(package.json & package-lock.json) first to make use of cache layer.
COPY package*.json ./

# Only installing product dependencies.
RUN npm install --only=production && npm install --only=development && npm cache clean --force

# Adding node_modules binary to PATH.
ENV PATH /app/node_modules/.bin:$PATH


# ******************************************* SUB BUILD STAGE - For Development/Testing ******************************************* 
FROM base as development

# Exposing Ports For
#   3000 - Local Development Server
#   9009 - Storybook Server
EXPOSE 3000 9009

# Copying Source Code.
COPY . ./

CMD npm start

# ******************************************* SUB BUILD STAGE - For Produce React Artifacts ******************************************* 
FROM development as build

# Building React Prodcution Files.
RUN npm run build

# ******************************************* FINAL BUILD STAGE *******************************************
# Loading official Node Alpine image as final image (For Smaller Finzlized Image).
FROM nginx:1.14-alpine as production
EXPOSE 80

# Copying React build artifacts from previous stage.
COPY --from=build /app/build /usr/share/nginx/html