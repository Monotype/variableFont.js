/**
 * @class VariableFont
 */
class VariableFont implements IFontInfo {
    ascender: number = 0;
    descender: number = 0;
    encoding: any = {};
    glyphNames: any = {};
    glyphs: any = {};
    kerningPairs: any = {};
    numGlyphs: number = 0;
    numberOfHMetrics: number = 0;
    outlinesFormat: string = "truetype";
    substitution: any = {};
    unitsPerEm: number = 0;
    names: any = {};
    url: string = '';
    tables: IFontTable;
    hinting: any;

    /**
     * @param openTypeFont the `Font` object of opentype.js
     */
    constructor(public openTypeFont: IFontInfo) {
        console.log("Copying properties...");
        Object.assign(this, openTypeFont);
        (this as any).prototype = openTypeFont;
        console.log("Copied properties constructor : %o", this);
    }

    /**
     * Get fvar table.
     */
    getFvarTable() {
        return this.tables["fvar"];
    }

    /**
     * Get Axes info. from fvar table.
     */
    getAxes() {
        var fvar = this.getFvarTable();
        if (fvar) {
            return fvar.axes;
        }
        return null;
    }

    /**
     * Get instances from fvar table.
     */
    getInstances() {
        var fvar = this.getFvarTable();
        if (fvar) {
            return fvar.instances;
        }
        return null;
    }

    /**
     * Get number of instances in fvar table.
     */
    getInstancesCount() {
        var fvar = this.getFvarTable();
        if (fvar) {
            if (fvar.instances && (fvar.instances.length > 0)) {
                return fvar.instances.length
            }
        }
        return 0;
    }

    /**
     * Get number of axes in fvar table.
     */
    getAxesCount() {
        var fvar = this.getFvarTable();
        if (fvar) {
            if (fvar.axes && (fvar.axes.length > 0)) {
                return fvar.axes.length
            }
        }
        return 0;
    }
}
