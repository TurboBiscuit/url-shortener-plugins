module.exports.generate = async (url, code, done) => {
    try {
        var fetch = require('node-fetch')
        var resp = await fetch("http://gg.gg/check", {
            "headers": {
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            },
            "referrer": "http://gg.gg/",
            "body": `custom_path=${code?code:''}&use_norefs=0&long_url=${encodeURIComponent(url)}&app=site&version=0.1`,
            "method": "POST",
        });
        var text = await resp.text()
        if (text == 'ok') {
            var resp1 = await fetch("http://gg.gg/create", {
                "headers": {
                    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                },
                "body": `custom_path=${code?code:''}&use_norefs=0&long_url=${encodeURIComponent(url)}&app=site&version=0.1`,
                "method": "POST",
            });
            if (resp1.status !== 200) return done(Error(`GG.GG returned status code "${resp.status}"`))
            else return done(null, (await resp1.text()).slice('http://gg.gg/'.length))
        } else if (text == 'Link with this path already exist. Choose another path.') {
            done(new Error('This short code is already in use on this domain!'))
        } else {
            done(new Error('GG.GG Failed URL check with unknown error.'))
        }
    } catch (error) {
        done(error)
    }
}

module.exports.options = {
    domain: 'gg.gg',
    custom_codes: true,
    https: false
}
module.exports.requires = [
    'node-fetch'
]