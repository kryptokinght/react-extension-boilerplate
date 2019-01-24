# React Extension Boilerlplate for Chrome and Firefox

[![Fork](https://img.shields.io/github/forks/kryptokinght/react-extension-boilerplate.svg) ](https://github.com/kryptokinght/react-extension-boilerplate/network/members)
[![Issues](https://img.shields.io/github/issues/kryptokinght/react-extension-boilerplate.svg) ](https://github.com/kryptokinght/react-extension-boilerplate/issues)
[![Stars](https://img.shields.io/github/stars/kryptokinght/react-extension-boilerplate.svg) ](https://github.com/kryptokinght/react-extension-boilerplate/stargazers)
[![Watchers](https://img.shields.io/github/watchers/kryptokinght/react-extension-boilerplate.svg) ](https://github.com/kryptokinght/react-extension-boilerplate/watchers)
[![MIT license](https://img.shields.io/github/license/GirlScriptSummerOfCode/Upay.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](https://github.com/kryptokinght/react-extension-boilerplate/pulls)



React Extension Boilerplate is a modern web extension template for building 
Mozilla and Chrome extensions using ReactJS.

Allows smooth and fast development of extension using on-the-go loading, building, packaging and publishing. 
<br/> 
Implements all the best Javascript practises with ESLint, Jest, React-StoryBook, Webpack and lots more. 

* Homepage: ...
* Source: [https://github.com/kryptokinght/react-extension-boilerplate](https://github.com/kryptokinght/react-extension-boilerplate)
* Twitter: ...


## Installation

```bash
# clone the git repo
$ git clone https://github.com/kryptokinght/react-extension-boilerplate.git

# Install dependencies
$ npm install
```

## Development

* Run script
```bash
# build files to './dev' 
# and launches the web ext in a new chrome instance, watches for changes and updates
$ npm run start:chrome
# launches in firefox
$ npm run start:mozilla
# runs storybook
$ npm run storybook
```
* If you want to load your unpacked extension by yourself, then run `npm run dev`. This will create the extension inside an **dev** folder in `development` mode and will watch the `src` folder for changes.   
* [Load unpacked extensions](https://developer.chrome.com/extensions/getstarted#unpacked) with `./dev` folder. Though you have to reload the extension by yourself every time the `./dev` folder updates.

## Build

```bash
# build files to './extension'
$ npm run build
```

## Compress

```bash
# compress build folder to {manifest.name}.zip and crx
$ npm run build
$ npm run compress -- [options]
```

[MORE CONTENT TO BE ADDED LATER]

## Features

## Contributing

Contributions are highly welcome. Please take some timeto read the guidelines mentioned here [contribute](CONTRIBUTING.md).

## License

The code is available under the [MIT license](LICENSE).