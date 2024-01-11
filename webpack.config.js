const path = require("path");

module: {
    rules: [
        {
            test: /\.(js|jsx)$/, loader: "babel-loader", exclude: /node_modules/
        }]
}