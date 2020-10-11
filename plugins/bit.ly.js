module.exports.generate = async (url, done) => {
    try {
        var fetch = require('node-fetch')
        var resp = await fetch('https://bitly.com/')
        var xsrf = resp.headers.get('set-cookie').split(';')[0].slice('_xsrf='.length)
        var resp1 = await fetch("https://bitly.com/data/anon_shorten", {
            "headers": {
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                "X-XSRFToken": xsrf,
                "Referer": "https://bitly.com/",
                "Cookie": `_xsrf=${xsrf}`
            },
            "body": `url=${encodeURIComponent(url)}`,
            "method": "POST",
        });
        var text = await resp1.text()
        var json = JSON.parse(text)
        if (resp1.status !== 200) return done(Error(`Bitly returned status code "${resp.status}"`))
        else return done(null, json.data.id.slice('bit.ly/'.length))
    } catch (error) {
        done(error)
    }
}
module.exports.options = {
    domain: 'bit.ly',
    custom_codes: false,
    https: true
}
module.exports.requires = [
    'node-fetch'
]