interface IFontAxis {
    tag: string,
    min: number,
    max: number,
    default: number,
    name: string
}

interface IFontTable {
    fvar: {
        axes: IFontAxis[],
        instances: any[],
    }
}
interface IFontInfo {
    url: string | null,
    tables: IFontTable,
    axes: IFontAxis[],
    instances: any[],
}

interface IFontType {
    fontFamily: string,
    menuName: string,
    axes: IFontAxis[],
    instances: any[],
    names: any[],
    type: string,
    url: string
}

declare var opentype: {
    load: (fontUrl: string, callback: (err: any, font: IFontInfo) => void) => void
}
