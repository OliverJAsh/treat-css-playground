import * as CopyWebpackPlugin from 'copy-webpack-plugin';
import * as MiniCssExtractPlugin from 'mini-css-extract-plugin';
import * as pathHelpers from 'path';
import * as TreatPlugin from 'treat/webpack-plugin';
import { Configuration } from 'webpack';

// Expect `__dirname` to be `/config/target/`.
const ROOT_PATH = pathHelpers.resolve(__dirname, '..', '..');
const TARGET_PATH = pathHelpers.join(ROOT_PATH, './target/');
const SRC_PATH = pathHelpers.join(ROOT_PATH, './src/');

const ENTRY_FILENAME = 'index.ts';
const OUTPUT_FILENAME = 'index.js';

const RESOLVED_EXTENSIONS = [
    // start defaults
    '.js',
    '.json',
    // end defaults
    '.ts',
    '.tsx',
];

const config: Configuration = {
    mode: 'development',
    devtool: 'eval-source-map',
    entry: pathHelpers.resolve(SRC_PATH, ENTRY_FILENAME),
    output: {
        path: TARGET_PATH,
        filename: OUTPUT_FILENAME,
    },
    resolve: {
        extensions: RESOLVED_EXTENSIONS,
    },
    module: {
        rules: [{ test: /\.tsx?$/, loader: 'ts-loader' }],
    },
    plugins: [
        new CopyWebpackPlugin([
            {
                from: pathHelpers.resolve(SRC_PATH, './index.html'),
                to: 'index.html',
            },
        ]),

        new TreatPlugin({
            outputLoaders: [MiniCssExtractPlugin.loader],
        }),
        new MiniCssExtractPlugin(),
    ],
};

export default config;
