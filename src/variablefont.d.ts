interface IFontTable {
    [name: string]: any;
}

interface IFontInfo {
    url: string | null,
    names: any,
    tables: IFontTable,
    ascender: number,
    descender: number,
    encoding: any,
    glyphNames: any,
    glyphs: any,
    kerningPairs: any,
    numGlyphs: number,
    numberOfHMetrics: number,
    outlinesFormat: string
    substitution: any,
    unitsPerEm: number
}

declare var opentype: {
    load: (fontUrl: string, callback: (err: any, font: IFontInfo) => void) => void,
    parse: (fontBuffer: ArrayBuffer) => IFontInfo
}
