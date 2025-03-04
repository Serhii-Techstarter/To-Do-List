// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })


// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// export default defineConfig({
//   plugins: [react()],
//   server: {
//     proxy: {
//       '/api': 'http://127.0.0.1:5000',  // Замените URL на адрес вашего Python-сервера
//     },
//   },
// });


import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://127.0.0.1:5000',  // прокси на Flask
    },
  },
});
// export default defineConfig({
//   server: {
//     proxy: {
//       "/api": {
//         target: "http://127.0.0.1:5000",
//         changeOrigin: true
//       }
//     }
//   }
// });