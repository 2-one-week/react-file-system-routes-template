import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

const tsconfig = require('./tsconfig.json')

type TSConfig = {
    compilerOptions: {baseUrl: string; paths: {[key: string]: string[]}}
}

const {
    compilerOptions: {baseUrl, paths},
}: TSConfig = tsconfig
function getTsConfigAlias() {
    const alias: {[key in string]: string} = {}

    for (const [aliasPath, [rawRelativePath]] of Object.entries(paths)) {
        const relativePathWithBaseUrl = `${baseUrl}/${rawRelativePath}`
        const relativePath = relativePathWithBaseUrl.replace(/\/\*$/, '')
        const absolutePath = path.resolve(__dirname, relativePath)
        const aliasKey = aliasPath.replace(/\/\*$/, '')
        alias[aliasKey] = absolutePath
    }

    return alias
}

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: getTsConfigAlias(),
    },
    plugins: [react()],
})
