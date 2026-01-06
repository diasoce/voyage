import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/voyage/', // GitHub 레포지토리 이름을 여기에 적으세요
})