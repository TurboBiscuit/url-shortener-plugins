# url-shortener-plugins

## Dont see a url shortener you want? Make an issue! (Someone might make it!) If you want to add your own make a PR!

Plugin Without Custom Codes

```js
module.exports.generate = async (url, done) => {
  done(null, "shorturl");
  done(Error("error")); //If something failed while creating the short url
};

module.exports.options = {
  domain: "example.com",
  custom_codes: false,
  https: true,
};
module.exports.requires = []; //If your plugin requires something put them here
```

Plugin With Custom Codes

```js
module.exports.generate = async (url, code, done) => {
  done(null, code);
  done(Error("error")); //If something failed while creating the short url
};

module.exports.options = {
  domain: "example.com",
  custom_codes: true,
  https: true,
};
module.exports.requires = []; //If your plugin requires something put them here
```
