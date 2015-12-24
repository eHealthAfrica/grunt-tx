[![Build Status](https://travis-ci.org/eHealthAfrica/grunt-tx.svg?branch=master)](https://travis-ci.org/eHealthAfrica/grunt-tx)

# Grunt-Tx

Grunt tasks to download translations and upload resources to [Transifex](https://www.transifex.com)

## Requirements

* node.js `>= 0.10.x` or io.js `>=1.8.1` (You might need [node-gyp-install](https://www.npmjs.com/package/node-gyp-install) for io.js)
* grunt `~0.4.5`

### On Linux

Since we depend on `node-keytar`, you might need to install a package there to make the installation work. Please refer to [their README](https://github.com/atom/node-keytar#on-linux) for instructions.

## Getting started

In your project run: `npm install --save grunt-tx`.

Then go to your `Gruntfile.js`, include this plugin and add the configuration. Example:

```javascript
// load the plugin
grunt.loadNpmTasks('grunt-tx');

grunt.initConfig({
  /*
    Transifex configuration
   */
  tx: {
    // note: this takes an array, so you can have multiple
    // resources per project
    //
    // if you need more than one project, just add another
    // key with the other project slug
    'YOUR_PROJECT_SLUG': [
      {
        // path to the source resource
        sourceFile: './po/template.pot',
        // target directory & path where we put the downloaded translations to
        // _lang_ will be replaced with the language code (`en` for example)
        // _type_ will be replaced with the lowercased type of the resource (`po` for example)
        targetFilePath: './po/_lang_._type_',
        // the i18n_type of your resource at Transifex
        // See http://docs.transifex.com/formats
        type: 'PO',
        // this is completely optional. If not set, we default to download
        // every available language for the resource
        languages: ['en', 'fr']
      }
    ]
  },
});
```

The plugin exposes two tasks:

- `grunt tx:download` – downloads all translations for every configured project and their resources
- `grunt tx:upload` – uploads all configured projects' resources

The plugin accepts `TRANSIFEX_USER` & `TRANSIFEX_PASSWORD` as environment variables. If they're not present, it'll prompt the user for their credentials and stores them in their keychain.

**Note**: if you need to support multiple projects with different credentials, this is totally supported by this plugin. However if you pass in the credentials via ENV, they'll take precedence over everything. This means, if you want to include this plugin into your CI workflow, you'll have to grant access to all projects configured to the user identified by the credentials provided in ENV.

## Development

You're interested in helping out this project? You rock! Hope this little guide helps you to get started. If not, just ping us, we're very happy to help!

The module is written in ES2015 with the help of the fantastic [babel](https://babeljs.io). The source code can be found in the [src](src/) directory. It's the only code that you should touch.

### Setup

If you follow these three steps, you should be ready to go:

1. `git clone http://github.com/eHealthAfrica/grunt-tx`
2. `cd grunt-tx`
3. `npm install`

### Building

Run `npm run build`. Build output will be in `lib` and `tasks` directories. During development you can also use `npm run watch`, which watches for file changes in `src` and automatically builds everything.

`npm run lint` lints the code in `src` with the help of [standard](https://www.npmjs.com/package/standard) and [babel-eslint](https://github.com/babel/babel-eslint)

### Test

`npm test` lints the code and runs the test.

### Conventions

`grunt-tx` is using the wonderful [semantic-release](https://github.com/boennemann/semantic-release) to automate its releases. To make that work, please stick to the [Angular commit guidelines](https://docs.google.com/document/d/1QrDFcIiPjSLDn3EL15IJygNPiHORgU1_OOAqWjiDU5Y)

## Alternatives / Shoutouts

Thank you to:

- [grunt-transifex](https://github.com/erasys/grunt-transifex)
- [grunt-tx-source-upload](https://github.com/CoursePark/grunt-tx-source-upload)
- [grunt-transifex-resjson](https://github.com/futurice/grunt-transifex-resjson)

which are great projects that you should definitely look at if you're looking to integrate Transifex within your workflow. We had different needs and this is how this project came to be.

Also big thanks to [Inquirer.js](https://github.com/SBoudrias/Inquirer.js) and [node-keytar](https://github.com/atom/node-keytar), which enabled this project to prompt the user for their credentials and to save them into the keychain.

## License

Apache 2.0, see [LICENSE](/LICENSE)

## Author

© 2015 [Robin Mehner](http://coding-robin.de) for [eHealth Systems Africa](http://ehealthafrica.org)
