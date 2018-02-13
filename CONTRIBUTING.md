# Contributing

We are happy to have others contribute to the development of this library. It is currently in its infancy. Please check out the ROADMAP.md for ideas on how you can add functionality. We welcome additional ideas as well.

## Source code

The variableFont.js libary source is written in TypeScript. It is located in the `src` directory.

TypeScript is available on npm at https://www.npmjs.com/package/typescript

### Compiling

First install [nodejs](https://nodejs.org/en/) which will by default include `npm`. Then install latest typescript compiler on system, using following `npm` command.

```
npm install --global typescript
```

In the src folder of this project execute following command to compile. (current variablefont.js is generated using tsc version `2.5.3`).

```
tsc
```
OR
```
tsc --project ./tsconfig.json
```
The output file is `variablefont.js` in the root folder.

## How to modify the source for contribution

1. On our [GitHub page](https://github.com/Monotype/variableFont.js), click the "Fork" button to create your personal fork
   of the variableFont.js repository.

2. Clone your repository:

    git clone git://github.com/Monotype/variableFont.js.git

3. Create a new branch for your feature. For example: `git checkout -b newfeature`.
    A dedicated branch for your pull request means you can develop multiple features at the same time, and ensures
    that your pull request is stable even if you later decide to develop an unrelated feature.

4. Install typescript:

```
npm install --global typescript
```

5. Make some changes to the source files

6. Build variableFont.js
```
tsc
```
OR
```
tsc --project ./tsconfig.json
```
The output file is `variablefont.js` in the root folder.

7. Test your changes in the demo program. Modify it if needed.

8. Commit your changes

    git add --all && git commit

9. Submit your pull request -- and thanks in advance!

## Dependency

This project has a hard dependency on [opentype.js](https://github.com/nodebox/opentype.js). Please follow [instruction](https://github.com/nodebox/opentype.js#using-bower) on the opentype.js site to include it in your page. Opentype.js must be included before including variableFont.js in an html page. variableFont.js functions depend on opentype.js.

Some feature changes may be more appropriately made in [opentype.js](https://github.com/nodebox/opentype.js). If so, consider contributing to that project.
