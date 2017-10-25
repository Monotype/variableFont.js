# variableFont.js
JS library for handling variable fonts through use of opentype.js

## Compiling

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

## API:

A global class `VariableFont` is made available when variablefont.js is added in a page. This class can be used to extend opentype.js Font object.


```js
var vf = new VariableFont(font); // Where font is the "font" object of opentype.js library
var otFont = vf.openTypeFont; // Get access to original font object.

// Extra functionalities provided by VariableFont are:

vf.getAxes(); // get axes field from fvar table.
vf.getInstances(); // get instances field from fvar table.
vf.getInstancesCount(); // get number of instances entries from fvar table.
vf.getAxesCount(); // get number of axes entries from fvar table.
```


## Dependency

This project has a hard dependency on [opentype.js](https://github.com/nodebox/opentype.js). Please follow [instruction](https://github.com/nodebox/opentype.js#using-bower) on the opentype.js site to include it in your page. Opentype.js must be included before including variablefont.js in the html page. variableFont.js functions depend on opentype.js.

## Contributing

This project contains a single source file as of now (Oct 18, 2017), at `src\index.ts`.
