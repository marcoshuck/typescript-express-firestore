# TypeScript + Express + Firestore
An API REST created with Typescript and using Express and Firestore modules

## Getting started
This application was created using NodeJS, you can look at the package.json file for more information about what packages have been used.

You need to create a keys folder in the application root directory, and inside of it, you should move the .json file provided by Google Firestore. Read more information about this: [Google Firestore SDK documentation](https://firebase.google.com/docs/admin/setup?authuser=0). This file is required in [db.ts](https://github.com/marcoshuck/typescript-express-firestore/blob/master/src/db.ts#L3)


### Before start working on code
`yarn install` or `npm install`

### Building
`npm run build`
Get the ./build directory with js files.

### Source code analysis
`npm run lint`
Use lint to analyze the source code.

### Starting the application
`npm run start`
Run the application in a node instance.

### Watch mode
`npm run watch`
Compile and run the application every time some change has been made.

## Project structure
```
\---src
    |   app.ts
    |   db.ts
    |   index.ts
    |   
    +---controllers
    |   |   controller.ts
    |   |   example.controller.ts
    |   |   
    |   \---interfaces
    |           controller.interface.ts
    |           
    +---models
    |   |   example.model.ts
    |   |   
    |   \---interfaces
    |           example.interface.ts
    |           
    +---repositories
    |   |   firestore.repository.ts
    |   |   
    |   \---interfaces
    |           firestore.interface.ts
    |           
    +---routes
    |       example.routes.ts
    |       index.ts
    |       
    \---views

```

## ToDo
- JWT
- Model validation
- View rendering