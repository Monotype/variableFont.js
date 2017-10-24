var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
///<reference  path="variablefont.d.ts" />
///<reference  path="chrome_post_lib.d.ts" />
(function (global) {
    function loadFromUrl(url, callback) {
        // Function copied from opentype.js
        var request = new XMLHttpRequest;
        request.open("get", url, true);
        request.responseType = "arraybuffer";
        request.onload = function () {
            if (request.status !== 200) {
                return callback("Font could not be loaded: " + request.statusText);
            }
            return callback(null, request.response);
        };
        request.onerror = function () {
            callback("Font could not be loaded");
        };
        request.send();
    }
    function LoadVariableFont(fontFile, callback) {
        if (!opentype)
            throw "opentype.js is requried!";
        loadFromUrl(fontFile, function (err, arrayBuffer) {
            if (err) {
                return callback(err, null);
            }
            var font;
            try {
                font = ParseFont(arrayBuffer);
            }
            catch (e) {
                return callback(e, null);
            }
            return callback(null, font);
        });
    }
    function ParseFont(fontBuffer) {
        if (!opentype)
            throw "opentype.js is requried!";
        return new VariableFont(fontBuffer);
    }
    function uint8ToBase64(buffer) {
        var binary = '';
        var len = buffer.byteLength;
        for (var i = 0; i < len; i++) {
            binary += String.fromCharCode(buffer[i]);
        }
        return window.btoa(binary);
    }
    var VariableFont = /** @class */ (function () {
        function VariableFont(font) {
            var FontType = {
                "fontFamily": "AvenirNext_Variable",
                "menuName": "AvenirNext_Variable",
                "axes": [],
                "instances": [],
                "names": [],
                "type": "system",
                "url": ""
            };
            if (font instanceof ArrayBuffer) {
                var fontBuffer = font;
                font = opentype.parse(fontBuffer);
                var tempUint8array = new Uint8Array(fontBuffer);
                this._requestedFontFile = "data:;base64," + uint8ToBase64(tempUint8array);
            }
            console.log("VariableFont constructor : %o", font);
            this.font = Object.assign(font, FontType);
            var fvarTable = font.tables.fvar;
            ParseAxesAndInstances(this.font, fvarTable);
        }
        VariableFont.prototype.getAxis = function () {
            for (var a in this.font.axes) {
                switch (this.font.axes[a].tag) {
                    case "wght":
                        this.font.axes[a].name = "Weight";
                        break;
                    case "wdth":
                        this.font.axes[a].name = "Width";
                        break;
                    case "opsz":
                        this.font.axes[a].name = "Optical size";
                        break;
                    case "ital":
                        this.font.axes[a].name = "Italic";
                        break;
                    case "slnt":
                        this.font.axes[a].name = "Slant";
                        break;
                }
            }
            return this.font.axes;
        };
        VariableFont.prototype.getInstances = function () {
            return this.font.instances;
        };
        VariableFont.prototype.getInstancesCount = function () {
            if (this.font.instances.length > 0)
                return this.font.instances.length;
            else
                return 0;
        };
        VariableFont.prototype.getAxesCount = function () {
            if (this.font.axes.length > 0)
                return this.font.axes.length;
            else
                return 0;
        };
        VariableFont.prototype.getFontVariationSettingsProperties = function (propertyName) {
            var axesOfPropertyName = {
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
        };
        VariableFont.prototype.getFontVariationSettingsInstances = function (propertyName) {
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
        };
        VariableFont.prototype.getSettings = function (fontSize, width, content) {
            return __awaiter(this, void 0, void 0, function () {
                var self, familyName, spanElement, cssStyle, body;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            self = this;
                            familyName = this.font.names.fontFamily.en;
                            return [4 /*yield*/, this.waitForFontToBeAvailable(familyName, this._requestedFontFile)];
                        case 1:
                            _a.sent();
                            spanElement = document.createElement('span');
                            spanElement.innerHTML = content;
                            spanElement.style.fontSize = fontSize;
                            spanElement.setAttribute("id", "testDiv");
                            cssStyle = "position: absolute;height: auto;width: auto;font-family:'" + familyName + "';white-space: nowrap;";
                            spanElement.setAttribute("style", cssStyle);
                            body = document.body;
                            body.insertBefore(spanElement, body.firstChild);
                            return [2 /*return*/, self.calculateSetting(spanElement, fontSize, width)];
                    }
                });
            });
        };
        VariableFont.prototype.calculateSetting = function (spanElement, fontSize, expectedWidth) {
            var axis = this.font.axes[0];
            var axis1 = this.font.axes[1];
            var setting0 = (axis.min + axis.max) / 2; // get mid point
            var setting1 = (axis1.min + axis1.max) / 2; // get mid point
            spanElement.style.fontVariationSettings = "'" + axis.tag + "' " + setting0 + ",'" + axis1.tag + "'" + setting1;
            spanElement.style.fontSize = fontSize;
            var contentWidth = spanElement.clientWidth;
            if (contentWidth == expectedWidth) {
                var setting = {};
                setting[axis.tag] = setting0;
                setting["wdth"] = setting1;
                return Promise.resolve(setting);
            }
            else {
                if (contentWidth > expectedWidth) {
                    //decrease width
                    return decreaseSetting(spanElement, fontSize, axis, contentWidth, expectedWidth, setting0, setting1);
                }
                else {
                    //increase width
                    return increaseSetting(spanElement, fontSize, axis, contentWidth, expectedWidth, setting0, setting1);
                }
            }
        };
        VariableFont.prototype.waitForFontToBeAvailable = function (fontFamily, fontURL) {
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
                ff.loaded.then(function (fontFace) {
                    console.info('Current status', fontFace.status);
                    console.log(fontFace.family, 'loaded successfully.');
                    // Throw an error if loading wasn't successful
                }, function (fontFace) {
                    console.error('Current status', ff.status);
                });
                // Track if all fonts (if there are multiple) have been loaded
                // The 'ready' promise resolves if this is the case
                return document.fonts.ready;
            }
            else {
                console.error('Sorry, unsupported browser');
            }
        };
        //get content width with axis min/max/default values.
        VariableFont.prototype.getContentWidthForDefaultValues = function (fontSize, content, presetAxis) {
            return __awaiter(this, void 0, void 0, function () {
                var axis, spanElement, body, body, familyName, cssStyle, style, contentWidth;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            axis = this.font.axes[0];
                            spanElement = document.getElementById("testDiv");
                            if (spanElement == null) {
                                spanElement = document.createElement('span');
                                body = document.body;
                                body.insertBefore(spanElement, body.firstChild);
                            }
                            else {
                                spanElement = document.createElement('span');
                                spanElement.removeAttribute("id");
                                spanElement.setAttribute("id", "testDiv" + presetAxis);
                                body = document.body;
                                body.insertBefore(spanElement, body.firstChild);
                            }
                            spanElement.innerHTML = content;
                            spanElement.style.fontSize = fontSize;
                            familyName = this.font.names.fontFamily.en;
                            cssStyle = "position: absolute;height: auto;width: auto;font-family:'" + familyName + "';white-space: nowrap;";
                            spanElement.setAttribute("style", cssStyle);
                            style = "'" + axis.tag + "' " + (presetAxis == "min" ? axis.min : (presetAxis == "max" ? axis.max : axis.default)) + ",'wdth' 100";
                            spanElement.style.fontVariationSettings = style;
                            return [4 /*yield*/, wait(10)];
                        case 1:
                            _a.sent();
                            contentWidth = spanElement.clientWidth;
                            return [2 /*return*/, contentWidth];
                    }
                });
            });
        };
        return VariableFont;
    }());
    function decreaseSetting(spanElement, fontSize, axis, contentWidth, width, setting0, setting1) {
        return __awaiter(this, void 0, void 0, function () {
            var setting;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        setting = {};
                        _a.label = 1;
                    case 1:
                        if (!(contentWidth > width && setting0 > axis.min)) return [3 /*break*/, 3];
                        setting0--;
                        spanElement.style.fontVariationSettings = "'" + axis.tag + "' " + setting0 + ",'wdth'" + setting1;
                        spanElement.style.fontSize = fontSize;
                        console.log(spanElement.style.fontVariationSettings);
                        return [4 /*yield*/, wait()];
                    case 2:
                        _a.sent();
                        contentWidth = spanElement.clientWidth;
                        return [3 /*break*/, 1];
                    case 3:
                        setting[axis.tag] = setting0;
                        setting["wdth"] = setting1;
                        return [2 /*return*/, setting];
                }
            });
        });
    }
    function increaseSetting(spanElement, fontSize, axis, contentWidth, width, setting0, setting1) {
        return __awaiter(this, void 0, void 0, function () {
            var setting;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        setting = {};
                        _a.label = 1;
                    case 1:
                        if (!(contentWidth < width && setting0 < axis.max)) return [3 /*break*/, 3];
                        setting0++;
                        spanElement.style.fontSize = fontSize;
                        spanElement.style.fontVariationSettings = "'" + axis.tag + "' " + setting0 + ",'wdth'" + setting1;
                        return [4 /*yield*/, wait(0)];
                    case 2:
                        _a.sent();
                        contentWidth = spanElement.clientWidth;
                        return [3 /*break*/, 1];
                    case 3:
                        if (setting0 > axis.max) {
                            setting0 = axis.max;
                        }
                        setting[axis.tag] = setting0;
                        setting["wdth"] = setting1;
                        return [2 /*return*/, setting];
                }
            });
        });
    }
    function wait(timeout) {
        if (timeout === void 0) { timeout = 500; }
        return new Promise(function (resolve) {
            setTimeout(function () {
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
    function ParseAxesAndInstances(font, fvarTable) {
        // get axes
        if (fvarTable !== undefined) {
            var axes = fvarTable.axes;
            for (var index = 0; index < axes.length; index++) {
                var nameId = parseInt(axes[index]["NameID"]) || false; //$(this).find("NameID").length ? parseInt($(this).find("NameID").text()) : false;
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
        load: LoadVariableFont,
        parse: ParseFont
    };
})(this);
