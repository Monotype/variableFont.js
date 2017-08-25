///<reference  path="variablefont.d.ts" />
(function (global) {
    var _requestedFontFile = "";

    function LoadVariableFont(fontFile: string, callback: (err: any, font: VariableFont) => void) {
        if (!opentype)
            throw "opentype.js is requried!";
        _requestedFontFile = fontFile;
        opentype.load(fontFile, function (err, fnt) {
            var vf = null;
            fnt.url = fontFile;
            if (!err) {
                
                vf = new VariableFont(fnt);
            }
            callback(err, vf);
        });
    }

    class VariableFont {
        private font: IFontType;
        constructor(font: IFontInfo) {
            var FontType: IFontType = {
                "fontFamily": "AvenirNext_Variable",
                "menuName": "AvenirNext_Variable",
                "axes": [],
                "instances": [],
                "names": [],
                "type": "system",
                "url": ""
            };
            //this.font = Object.assign(font, FontType);/// review
            console.log("VariableFont constructor : %o", font);
            this.font = Object.assign(font, FontType);
            var fvarTable = font.tables.fvar;
            ParseAxesAndInstances(this.font, fvarTable);
        }

        getAxis() {

            for (var a in this.font.axes) {
                switch (this.font.axes[a].tag) {
                    case "wght": this.font.axes[a].name = "Weight"; break;
                    case "wdth": this.font.axes[a].name = "Width"; break;
                    case "opsz": this.font.axes[a].name = "Optical size"; break;
                    case "ital": this.font.axes[a].name = "Italic"; break;
                    case "slnt": this.font.axes[a].name = "Slant"; break;
                }
            }
            return this.font.axes;
        }

        getInstances() {

            return this.font.instances;
        }

        getInstancesCount() {
            if (this.font.instances.length > 0)
                return this.font.instances.length
            else
                return 0;
        }

        getAxesCount() {
            if (this.font.axes.length > 0)
                return this.font.axes.length;
            else
                return 0;
        }

        getFontVariationSettingsProperties(propertyName) {
            var axesOfPropertyName: IFontAxis = {
                max: 0,
                min: 0,
                tag: '',
                name: '',
                default: 0
            };

            if (this.font.axes.length > 0) {
                var axes = this.font.axes;
                for (var index = 0; index < axes.length; index++) {
                    if (axes[index].tag == propertyName) {
                        axesOfPropertyName = axes[index];
                    }
                }
            }
            return axesOfPropertyName;
        }

        getFontVariationSettingsInstances(propertyName) {
            var instanceOfPropertyName = {};
            if (this.font.instances.length > 0) {
                var instances = this.font.instances;
                for (var index = 0; index < instances.length; index++) {
                    if (instances[index].name == propertyName) {
                        instanceOfPropertyName = instances[index];
                    }
                }
            }
            return instanceOfPropertyName;
        }

        async getSettings(fontSize, width, content) {
            //TBD pass fontFamily as function parameter.
            //create @font-face and append on head.
            //Check whether font is loaded or not. -> Done with calling isFontAvailable function
            var self = this;
            await this.waitForFontToBeAvailable('AvenirNext_Variable', _requestedFontFile);
            //var setting=
            var spanElement = document.createElement('span')
            spanElement.innerHTML = content;
            spanElement.style.fontSize = fontSize;
            spanElement.setAttribute("id", "testDiv");
            var cssStyle = "position: absolute;height: auto;width: auto;font-family:'AvenirNext_Variable';white-space: nowrap;"
            spanElement.setAttribute("style", cssStyle);
            var body = document.body;
            body.insertBefore(spanElement, body.firstChild);
            return self.calculateSetting(spanElement, fontSize, width);
        }

        calculateSetting(spanElement, fontSize, expectedWidth) {
            var axis = this.font.axes[0];
            var axis1 = this.font.axes[1];
            var setting0 = (axis.min + axis.max) / 2;// get mid point
            var setting1 = (axis1.min + axis1.max) / 2;// get mid point
            spanElement.style.fontVariationSettings = "'" + axis.tag + "' " + setting0 + ",'" + axis1.tag + "'" + setting1;
            spanElement.style.fontSize = fontSize;
            var contentWidth = spanElement.clientWidth;

            if (contentWidth == expectedWidth) {
                var setting = {};
                setting[axis.tag] = setting0;
                setting["wdth"] = setting1;
                return Promise.resolve(setting);
            } else {
                if (contentWidth > expectedWidth) {
                    //decrease width
                    return decreaseSetting(spanElement, fontSize, axis, contentWidth, expectedWidth, setting0, setting1);
                } else {
                    //increase width
                    return increaseSetting(spanElement, fontSize, axis, contentWidth, expectedWidth, setting0, setting1);
                }

            }
        }

        waitForFontToBeAvailable(fontFamily: string, fontURL: string) {
            // Simple check if the browser understands the API
            // Is there a better/more reliable way of checking support?
            if (document.fonts) {
                // Define a new FontFace
                //var fontURL=requestedFontFile;
                var ff = new FontFace(fontFamily, 'url(' + fontURL + ')');

                // Add the FontFace to the FontFaceSet
                document.fonts.add(ff);

                // Load the FontFace
                ff.load();

                // Get the current status of the Fontface
                // (should be 'loading' or 'loaded' if cached)

                // Wait until the font has been loaded, log the current status.
                ff.loaded.then((fontFace) => {
                    console.info('Current status', fontFace.status);
                    console.log(fontFace.family, 'loaded successfully.');

                    // Add a class to the body element
                    //  document.body.classList.add('AvenirNext_Variable-loaded');

                    // Throw an error if loading wasn't successful
                }, (fontFace) => {
                    console.error('Current status', ff.status);
                });

                // Track if all fonts (if there are multiple) have been loaded
                // The 'ready' promise resolves if this is the case
                return document.fonts.ready;

            } else {
                console.error('Sorry, unsupported browser');
            }

        }

        //get content width with axis min/max/default values.
        async getContentWidthForDefaultValues(fontSize, content, presetAxis) {
            var axis = this.font.axes[0];
            var spanElement = document.getElementById("testDiv");
            if (spanElement == null) {
                spanElement = document.createElement('span');
                var body = document.body;
                body.insertBefore(spanElement, body.firstChild);
            }
            else {
                spanElement = document.createElement('span');
                spanElement.removeAttribute("id");
                spanElement.setAttribute("id", "testDiv" + presetAxis);
                var body = document.body;
                body.insertBefore(spanElement, body.firstChild);

            }
            spanElement.innerHTML = content;
            spanElement.style.fontSize = fontSize;
            var cssStyle = "position: absolute;height: auto;width: auto;font-family:'AvenirNext_Variable';white-space: nowrap;"
            spanElement.setAttribute("style", cssStyle);
            var style = "'" + axis.tag + "' " + (presetAxis == "min" ? axis.min : (presetAxis == "max" ? axis.max : axis.default)) + ",'wdth' 100";
            spanElement.style.fontVariationSettings = style;
            await wait(10);
            var contentWidth = spanElement.clientWidth;
            return contentWidth;

        }
    }

    async function decreaseSetting(spanElement, fontSize, axis, contentWidth, width, setting0, setting1) {
        var setting = {};
        while (contentWidth > width && setting0 > axis.min) {
            setting0--;
            spanElement.style.fontVariationSettings = "'" + axis.tag + "' " + setting0 + ",'wdth'" + setting1;
            spanElement.style.fontSize = fontSize;
            console.log(spanElement.style.fontVariationSettings);
            await wait();
            contentWidth = spanElement.clientWidth;


        }
        setting[axis.tag] = setting0;
        setting["wdth"] = setting1;
        return setting;
    }

    async function increaseSetting(spanElement, fontSize, axis, contentWidth, width, setting0, setting1) {
        var setting = {};
        while (contentWidth < width && setting0 < axis.max) {
            setting0++;
            spanElement.style.fontSize = fontSize;
            spanElement.style.fontVariationSettings = "'" + axis.tag + "' " + setting0 + ",'wdth'" + setting1;
            await wait(0);
            contentWidth = spanElement.clientWidth;
        }

        if (setting0 > axis.max) {
            setting0 = axis.max;
        }

        setting[axis.tag] = setting0;
        setting["wdth"] = setting1;
        return setting;
    }

    function wait(timeout = 500) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(1);
            }, timeout);
        });
    }



    function getName(font, nameId) {
        return (nameId >= 0 && nameId < font.names.length) ? font.names[nameId] : false;
    }

    function getAxisName(font, tag, nameId) {
        // it's not clear whether registered axis names have precedence over stored axis names (so maybe the if…else blocks should be reversed)
        //var nameId = $(jNameId).length ? parseInt($(jNameId).text()) : false;
        if (nameId !== false) {
            var axisName = getName(font, nameId);
            return axisName !== false ? axisName : tag;
        }
        else {
            switch (tag) {
                case "wght": return "Weight";
                case "wdth": return "Width";
                case "opsz": return "Optical size";
                case "ital": return "Italic";
                case "slnt": return "Slant";
                default: return tag;
            }
        }
        //return false; // should not get here
    }

    function ParseAxesAndInstances(font: IFontType, fvarTable) {
        // get axes
        if (fvarTable !== undefined) {
            var axes = fvarTable.axes;
            for (var index = 0; index < axes.length; index++) {
                var nameId = parseInt(axes[index]["NameID"]) || false;//$(this).find("NameID").length ? parseInt($(this).find("NameID").text()) : false;
                var axisName = getAxisName(axes[index].name.en, axes[index].tag, nameId);
                font.axes.push({
                    tag: axes[index].tag,
                    min: 1.0 * axes[index].minValue,
                    max: 1.0 * axes[index].maxValue,
                    "default": 1.0 * axes[index].defaultValue,
                    name: axisName
                });
            }



            // get instances
            var instances = fvarTable.instances;
            for (var index = 0; index < instances.length; index++) {

                var instance = {
                    name: instances[index].name.en,
                    tuple: []
                };
                var coordinates = instances[index].coordinates;
                for (var a in coordinates) {
                    instance.tuple.push(coordinates[a]);
                }

                font.instances.push(instance);
            }
        }

    }

    global["VariableFonts"] = {
        load: LoadVariableFont
    };
})(this);
