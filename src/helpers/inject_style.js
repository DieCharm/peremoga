export const inject_style = (style) => {
    const css = document.createElement('style');
    css.type = 'text/css';

    if (css.styleSheet) {
        console.log("add as css text");
        css.styleSheet.cssText = style;
    }
    else {
        console.log("add as text node");
        css.appendChild(document.createTextNode(style));
    }

    document.getElementsByTagName("head")[0].appendChild(css);
    console.log("injected");
    console.log(style);
}