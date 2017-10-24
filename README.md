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

A global object `VariableFonts` is made available when variablefont.js is added in a page. This object can be used to load the font files.

Loading from url:

```js

VariableFonts.load('./url_to_font_file', function(err, font) {
    var noOfAxes = font.getAxesCount();
    // ... 
});
```
Using arraybuffer support:

```js
function drop(ev) {
    ev.stopPropagation();
    ev.preventDefault();
    var files = ev.dataTransfer.files;
        
    for (var i=0, file; file=files[i]; i++) {
        var reader = new FileReader();

        reader.onload = function(e2) {
            try {
                var fontBuffer = e2.target.result;
                var font = VariableFonts.parse(fontBuffer);
                var noOfAxes = font.getAxesCount();
                // ...
            } catch (err) {
                console.log(err);
            }
        }

        reader.readAsArrayBuffer(file);
    }
}
```

## Dependency

This project has a hard dependency on [opentype.js](https://github.com/nodebox/opentype.js). Please follow [instruction](https://github.com/nodebox/opentype.js#using-bower) on the opentype.js site to include it in your page. Opentype.js must be included before including variablefont.js in the html page. variableFont.js functions depend on opentype.js.

## Contributing

This project contains a single source file as of now (Oct 18, 2017), at `src\index.ts`.
