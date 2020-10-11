module.exports.generate = async (url, code, done) => {
    try {
        var fetch = require('node-fetch')
        var resp = await fetch(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(url)}${code?`&alias=${code}`:''}`)
        if (resp.status !== 200) return done(Error(`TinyURL returned status code "${resp.status}"`))
        else return done(null, (await resp.text()).slice('https://tinyurl.com/'.length))
    } catch (error) {
        done(error)
    }
}

module.exports.options = {
    domain: 'tinyurl.com',
    custom_codes: true,
    https: true
}
module.exports.requires = [
    'node-fetch'
]