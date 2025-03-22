const { override, addWebpackAlias } = require('customize-cra')
const { resolve } = require('path')
const jsConfig = require('./jsconfig.json')
function resolveJsconfigPathsToAlias() {
    // Get paths of jsconfig
    const { paths } = jsConfig.compilerOptions
    // Get aliases
    const aliases = {}
    Object.keys(paths).forEach((item) => {
        const key = item.replace('/*', '')
        const value = resolve(
            __dirname,
            paths[item][0].replace('/*', '').replace('*', '')
        )
        aliases[key] = value
    })
    // Return aliases
    return aliases
}
module.exports = override(addWebpackAlias(resolveJsconfigPathsToAlias()))