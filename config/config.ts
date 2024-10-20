import devConfig from './config.dev';
import prodConfig from './config.prod';
import { defineConfig } from '@umijs/max';
import { minify } from 'terser';

const env = process.env;
const envConfig = env.mode === 'prod' ? prodConfig : devConfig;

export default defineConfig({
  alias: {
    '@': '/src',
    '@packages': '/packages',
  },
  chainWebpack: (config) => {
    config.plugin('copy-wps-plugins').use(require('copy-webpack-plugin'), [
      {
        patterns: [
          {
            from: 'wps-plugins/**/*',
            to: '',
            globOptions: {
              ignore: ['**/package.json', '**/package-lock.json']
            },
            transform: async (content, path) => {
              if (path.endsWith('.js')) {
                const { code } = await minify(content.toString(), {
                  mangle: {
                    toplevel: true,
                    keep_classnames: true,
                    keep_fnames: true
                  },
                  sourceMap: false,
                });
                return code;
              }
              return content;
            },
          }]
      },
    ]);
  },
  ...envConfig,
})
;
