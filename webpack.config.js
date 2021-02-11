const path = require('path');

module.exports = {
    mode: 'none',
    watch: true,
    entry: {
        app: './src/app.js',
        event: './src/event.js',
  },

    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
  },
};