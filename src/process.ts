export default class Process {
    constructor(private config: any) { }
    private regPx: RegExp = /([-]?[\d.]+)p(x)?/;
    private regPxAll: RegExp = /([-]?[\d.]+)px/g;

    convert(text: string) {
        let match = text.match(this.regPx)
        if (!match) return '';
        return this.px2vw(match[1]);
    }

    convertAll(text: string): string {
        if (!text) return text;
        return text.replace(this.regPxAll, (word: string) => {
            const res = this.px2vw(word);
            if (res) return res.vw;
            return word;
        });
    }

    private px2vw(text: string) {
        const pxValue = parseFloat(text);

        let vw: string = +(pxValue / this.config.width * 100).toFixed(this.config.toFixedNum) + 'vw';
        return {
            px: text,
            pxValue: pxValue,
            vw: vw
        }
    }
}