const x = module.exports

x.babel = function * (fly) {
  yield fly
    .source('src/*.js')
    .babel({preload: true})
    .target('out')
}
