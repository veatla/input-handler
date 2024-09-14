class Config {
    fontSize = "14px";

    lineHeight = "19px";

    letterSpacing = "0px";
    
    fontWeight = "normal";
    
    fontFamily = `"Fira Code", "Droid Sans Mono", "monospace", monospace`;

    get font() {
        return `${this.fontWeight} ${this.fontSize} / ${this.lineHeight} ${this.fontFamily}`
    }
}


const CONFIG = new Config();
export default CONFIG;