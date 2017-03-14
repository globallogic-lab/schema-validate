import babel from 'rollup-plugin-babel'

export default {
  entry: 'src/index.js',
  moduleName: 'schema-validator',
  plugins: [
    babel()
  ],
  targets: [
    {dest: 'out/schema-validator.js', format: 'umd'},
    {dest: 'out/schema-validator.next.js', format: 'es'}
  ]
}
