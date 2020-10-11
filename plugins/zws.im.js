module.exports.generate = async (url, done) => {
    try {
        var fetch = require('node-fetch')
        var resp = await fetch(`https://zws.im/api/shortenURL?url=${encodeURIComponent(url)}`);
        if (resp.status !== 200) return done(Error(`zws.im returned status code "${resp.status}"`))
        else return done(null, (await resp.json()).short)
    } catch (error) {
        done(error)
    }
}

module.exports.options = {
    domain: 'zws.im',
    custom_codes: false,
    https: true
}
module.exports.requires = [
    'node-fetch'
]