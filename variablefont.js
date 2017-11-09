/**
 * @class VariableFont
 */
var VariableFont = /** @class */ (function () {
    /**
     * @param openTypeFont the `Font` object of opentype.js
     */
    function VariableFont(openTypeFont) {
        this.openTypeFont = openTypeFont;
        this.ascender = 0;
        this.descender = 0;
        this.encoding = {};
        this.glyphNames = {};
        this.glyphs = {};
        this.kerningPairs = {};
        this.numGlyphs = 0;
        this.numberOfHMetrics = 0;
        this.outlinesFormat = "truetype";
        this.substitution = {};
        this.unitsPerEm = 0;
        this.names = {};
        this.url = '';
        console.log("Copying properties...");
        Object.assign(this, openTypeFont);
        this.prototype = openTypeFont;
        console.log("Copied properties constructor : %o", this);
        if (this.tables) {
            var fvar = this.tables["fvar"];
            if (fvar && fvar.axes && (fvar.axes.length > 0)) {
                var sortedInstances = fvar.instances.sort(function (a, b) {
                    var condition = 0;
                    var tags = Object.keys(a.coordinates);
                    var i = 0;
                    while (condition == 0 && i < tags.length) {
                        condition = ((a.coordinates[tags[i]] > b.coordinates[tags[i]]) ? 1 : ((b.coordinates[tags[i]] > a.coordinates[tags[i]]) ? -1 : 0));
                        i++;
                    }
                    return condition;
                });
            }
        }
    }
    /**
     * Get fvar table.
     */
    VariableFont.prototype.getFvarTable = function () {
        return this.tables["fvar"];
    };
    /**
     * Get Axes info. from fvar table.
     */
    VariableFont.prototype.getAxes = function () {
        var fvar = this.getFvarTable();
        if (fvar) {
            return fvar.axes;
        }
        return null;
    };
    /**
     * Get number of axes in fvar table.
     */
    VariableFont.prototype.getAxesCount = function () {
        var fvar = this.getFvarTable();
        if (fvar) {
            if (fvar.axes && (fvar.axes.length > 0)) {
                return fvar.axes.length;
            }
        }
        return 0;
    };
    /**
 * Get axis name string from fvar table.
 */
    VariableFont.prototype.getAxis = function (i) {
        var fvar = this.getFvarTable();
        if (fvar) {
            return fvar.axes[i];
        }
        return null;
    };
    /**
     * Get axis name string from fvar table.
     */
    VariableFont.prototype.getAxisName = function (i) {
        var fvar = this.getFvarTable();
        if (fvar) {
            return fvar.axes[i].name.en;
        }
        return null;
    };
    /**
     * Get instances from fvar table.
     */
    VariableFont.prototype.getInstances = function () {
        var fvar = this.getFvarTable();
        if (fvar) {
            return fvar.instances;
        }
        return null;
    };
    /**
     * Get number of instances in fvar table.
     */
    VariableFont.prototype.getInstancesCount = function () {
        var fvar = this.getFvarTable();
        if (fvar) {
            if (fvar.instances && (fvar.instances.length > 0)) {
                return fvar.instances.length;
            }
        }
        return 0;
    };
    /**
     * Get named instance string from fvar table.
     */
    VariableFont.prototype.getInstanceName = function (i) {
        var fvar = this.getFvarTable();
        if (fvar) {
            return fvar.instances[i].name.en;
        }
        return null;
    };
    /**
     * Get named instance string from fvar table.
     */
    VariableFont.prototype.getNamedInstance = function (i) {
        var fvar = this.getFvarTable();
        if (fvar) {
            return fvar.instances[i];
        }
        return null;
    };
    /**
     * Get the font-variation-settings string for a named instance string from fvar table.
     */
    VariableFont.prototype.getNamedInstanceSetting = function (i) {
        var fvar = this.getFvarTable();
        if (fvar) {
            var settings = [];
            var values = fvar.instances[i].coordinates;
            for (var i = 0; i < fvar.axes.length; i++) {
                settings.push("'" + fvar.axes[i].tag + "' " + values[fvar.axes[i].tag].toString());
            }
            return settings.join();
        }
        return null;
    };
    return VariableFont;
}());
