# Home Library Service - Part 1

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Installing and downloading the app locally

```
git clone git@github.com:SousouBer/nodejs2024Q3-service.git
```

## Switch to the following remote development branch

```
git checkout feat/implement-functionalities
```

## Installing NPM modules/dependencies

```
npm install
```

## Create .env file, and copy .env.example values

The default application's port is stored in the .env file.

## Running application

```
npm start
```

## Testing

After running the above command, open a new terminal and enter:

To run all tests without authorization (Which is current week's task)

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

### And that is basically it.
