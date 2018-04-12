# variableFont.js
JavaScript library for using variable fonts. Extends the functionality of [opentype.js](https://github.com/nodebox/opentype.js).
You must also install opentype.js to use this library.

## Demo

The demo folder contains a web page called VariableFontViewer.html. This page shows how to use the features of variableFont.js. You do not have to use it with a server. 

Simply save the folder locally then open VariableFontViewer.html in a compatible web browser (for example, Chrome version 62 or higher). Drag and drop a variable font onto the top section. It will change to show the axes and sliders to control the settings for the sample text. You can edit the sample text. 

The demo page is also available for viewing at http://monotype.github.io/variableFont.js/demo/.

## Getting started with script tags

This project has a hard dependency on [opentype.js](https://github.com/nodebox/opentype.js). Please follow [instruction](https://github.com/nodebox/opentype.js#using-bower) on the opentype.js site to include it in your page. Opentype.js must be included before including variablefont.js in the html page. variableFont.js functions depend on opentype.js.

## Getting started with npm

If you are managing your project dependencies with npm, run the following command in your own project:

```sh
npm install --save variablefont.js opentype.js
```

This will install the variablefont.js and the required opentype.js peer dependency, and save those requirements to your `package.json` file.

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
