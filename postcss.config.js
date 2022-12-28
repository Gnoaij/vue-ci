module.exports = {
  plugins: [
    require('postcss-preset-env'),
    require('@minko-fe/postcss-pxtoviewport')({
      viewportWidth: 1536
    })
  ]
}
