import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import replace from 'rollup-plugin-replace';
import { uglify } from 'rollup-plugin-uglify';

const config = {
  output: {
    format: 'umd',
    name: 'AST-AST',
  },
  plugins: [
    nodeResolve( {
      jsnext: true
    } ),
    // @see https://github.com/rollup/rollup/wiki/Troubleshooting#name-is-not-exported-by-module
    commonjs( {
      include: 'node_modules/**',
      namedExports: { './node_module/invariant.js': ['default'] }
    } ),
    babel( {
      exclude: 'node_modules/**'
    } ),
    replace( {
      'process.env.NODE_ENV': JSON.stringify( process.env.NODE_ENV )
    } )
  ]
}

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(
    uglify({
      compress: {
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        warnings: false
      }
    })
  )
}

export default config
