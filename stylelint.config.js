module.exports = {
  extends: [
    'stylelint-config-standard-scss',
    'stylelint-config-recess-order',
    'stylelint-config-html/html',
    'stylelint-config-standard-vue/scss',
    'stylelint-config-prettier-scss'
  ],
  rules: {
    'color-hex-length': 'long'
  }
}
