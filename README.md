# Blog Posts - Example React Project

## React + TypeScript + Vite

This project is a sample React project for a blog list page using the (https://jsonplaceholder.typicode.com/) API for data fetching.
It features a list of posts with associated comments and a post details page.
It's not using any third party UI or State management libraries.

## Tools

NodeJS: https://nodejs.org/

VSCode: https://code.visualstudio.com/

## IDE Setup

- Recommended VS extensions: Prettier - Code Prettier, ESLint, Jest
- Recommended workspace settings:

```
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode"
}
```

## Project Setup

Run these commands from your shell

```
git clone https://github.com/Rumir125/posts-example.git

cd posts-example

npm install

npm run dev
```

## Build

For production version run:

`npm run build`

and to start production build run:

`npm run preview`

## Testing

We are using Jest for testing purposes

`npm run test` or `npm run test:watch`

## Environment

By default, .env is not ignored by git since why are using only the placeholder API(https://jsonplaceholder.typicode.com/) in this project.
However, usually the .env should be ignored by git since it would include secret variables such as
auth and server credentials

## Logger

Every UI component has a logger attached to it and will log `${propsMessage}${componentName}` every time it is initially rendered. Default propsMessage variable is defined in `src/config/constants.ts` and is called DEFAULT_PROPS_MESSAGE which can be changed and all components will console log that same message. To override the propsMessage you can you need to override the propsMessage prop in the component you want to change. For example:

```
<PostCard propsMessage="Hi" />
```

## UI - Library

In src/ui-library you can use generic components which could be useful for other projects and could be
used in the future as a separate UI component library
