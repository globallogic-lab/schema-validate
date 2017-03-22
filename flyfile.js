const x = module.exports

x.babel = function * (fly) {
  fly.source('src/**/*.js')
    .babel()
    .target('out')
}
