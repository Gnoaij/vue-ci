module.exports = {
  '*': ['prettier --write --ignore-unknown --ignore-path .gitignore'],
  '**/*.{css,scss,vue}': ['stylelint --fix --ignore-path .gitignore']
}
