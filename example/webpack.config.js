module.exports = {
    entry: {
        test: './test.md'
    },
    module: {
        rules: [
            {
                test: /\.(md)$/,
                loader: ['..', {
                    loader: "marked-frontmatter-loader"
                }],
                exclude: /node_modules/
            }, {
                test: /\.(jpg)$/,
                loader: [{
                    loader: "file-loader"
                }],
                exclude: /node_modules/
            }
        ]
    }
}