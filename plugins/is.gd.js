module.exports.generate = async (url, code, done) => {
    try {
        var fetch = require('node-fetch')
        var resp = await fetch(`https://is.gd/create.php?format=simple&url=${encodeURIComponent(url)}${code?`&shorturl=${code}`:''}`)
        if (resp.status !== 200) return done(Error(`IS.GD returned status code "${resp.status}"`))
        else return done(null, (await resp.text()).slice('https://is.gd/'.length))
    } catch (error) {
        done(error)
    }
}

module.exports.options = {
    domain: 'is.gd',
    custom_codes: true,
    https: true
}
module.exports.requires = [
    'node-fetch'
]