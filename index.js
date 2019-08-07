const loaderUtils = require("loader-utils");
const htmlLoader = require('html-loader');

function requireFromString(src) {
    let Module = module.constructor;
    let m = new Module();
    m._compile(src, randomIdent());
    return m.exports;
}

function randomIdent() {
    return "xxxHTMLLINKxxx" + Math.random() + Math.random() + "xxx";
}

function interpolate(content) {
    // 走 html-loader 抄来的 interpolate
    let data = {};
    let reg = /"[\s+]*require\([^)]*\)[\s+]*"/g;
    let result;
    let reqList = [];
    while (result = reg.exec(content)) {
        reqList.push({
            length: result[0].length,
            start: result.index,
            value: result[0]
        })
    }
    reqList.reverse();
    content = [content];
    reqList.forEach(function (link) {
        let x = content.pop();
        do {
            var ident = randomIdent();
        } while (data[ident]);


        data[ident] = link.value; //.substring(11, link.length - 3)
        content.push(x.substr(link.start + link.length));
        content.push(ident);
        content.push(x.substr(0, link.start));
    });
    content.reverse();
    content = content.join("");
    return {
        content,
        data
    }
}

module.exports = function (source) {
    this.cacheable && this.cacheable(true);

    // 取出 marked-frontmatter-loader 结果
    html = requireFromString(source);

    // 处理外部资源
    let { content, data } = interpolate(htmlLoader.call(this, html.content));

    html.content = requireFromString(content);

    return `module.exports = ` + JSON.stringify(html).replace(/xxxHTMLLINKxxx[0-9\.]+xxx/g, function (match) {
        if (!data[match]) return match;
        return data[match];
    }) + ";";;
};