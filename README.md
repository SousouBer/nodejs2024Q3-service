# Home Library Service - Part 3

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
- Docker - [Download & Install Docker](https://docs.docker.com/engine/install/).

## Deployed Docker image repo:

- [Follow the link](https://hub.docker.com/repository/docker/sousouu/nestjs-home-library-final)

## Installing and downloading the app locally

```
git clone git@github.com:SousouBer/nodejs2024Q3-service.git
```

## Switch to the following remote development branch

```
git checkout feat/implement-jwt-and-logging
```

## Installing NPM modules/dependencies

```
npm install
```

## Create .env file, and copy all .env.example values

# Running application

## Run the multi-container app:

```
docker-compose up
```

### If you encounter Already in use error, please stop processes that are using the following ports - 4000 or 5432.

## To shut down the containers:

```
docker-compose down
```

## To perfom vulnerability scan:

```
npm run docker-scan
```

## Testing

To run all tests with authorization:

```
npm run test:auth
```

To run all tests without authorization:

```
npm run test
```

### To format the text and see any errors/warnings, run linter

```
npm run lint
```

```
npm run format
```
