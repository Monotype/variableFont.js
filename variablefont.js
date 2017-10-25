var VariableFont = /** @class */ (function () {
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
    return VariableFont;
}());
