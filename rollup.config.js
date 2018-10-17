import typescript from 'typescript'
import rollupTypescript from 'rollup-plugin-typescript'
import babel from 'rollup-plugin-babel';
import postcss from 'rollup-plugin-postcss';
import commonjs from 'rollup-plugin-commonjs';
import uglify from 'rollup-plugin-uglify';
import eslint from 'rollup-plugin-eslint';

const env = process.env.NODE_ENV;

const config = {
    entry: './src/lib/virtualList/index.tsx',
    external: ['react', 'prop-types', 'classnames', 'react-dom'],
    format: 'umd',
    globals: {
        react: 'React',
        'prop-types': 'PropTypes',
        classnames: 'classnames',
        'react-dom': 'ReactDOM',
    },
    output: {
        file: './lib/ReactVirtualList.js',
        format: 'umd',
        name: 'ReactVirtualList',
        globals: {
            react: 'React',
            'react-dom': 'ReactDOM',
        },
    },
    plugins: [
        // less(),
        rollupTypescript({ typescript, importHelpers: true }),
        postcss({
            // extract: true,
            plugins: [],
        }),
        // eslint({
        //     exclude: [/\.(less)$/, '**/examples/**', 'lib/**', '**/node_modules/**', 'asert/**'],
        // }),
        babel({
            exclude: '**/node_modules/**',
            plugins: ['external-helpers'],
            babelrc: false,
            // presets: [['env', { modules: false }]],
        }),
        commonjs(),
    ],
};

if (env === 'production') {
    config.plugins.push(uglify({
        compress: {
            pure_getters: true,
            unsafe: true,
            unsafe_comps: true,
            warnings: false,
        },
    }));
}

export default config;
