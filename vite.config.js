import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        nested: resolve(__dirname, 'src/my-place/index.html'),
      },
      // output: {
      //   main: resolve(__dirname, 'dist', 'index.html'),
      //   nested: (__dirname, 'dist', 'my-place/index.html'),
      // },
    },
  },

  // base: '/share_my_place/',
  // define: {
  //   ...Object.keys(process.env).reduce((prev, key) => {
  //     if (!key.startsWith('VITE_')) return prev;
  //     return (
  //       (prev[`import.meta.env.${key}`] = JSON.stringify(process.env[key])),
  //       prev
  //     );
  //   }, {}),
  // },
});
