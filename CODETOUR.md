# Code Tour

A quick introduction to the folders and files in this repo.

## Project anatomy

The **source** files which you will need to build the extension are present inside the [`src`](src) folder. Run `npm run chrome-launch` or `npm run firefox-launch` to see the changes that you make inside your `src` folder live in the browser.

The project uses **Webpack** to bundle the project into a folder like `extension` in case of *production* build and `dev` in case of *development* build. A lot of different webpack plugins are used for the webpack bundling process which can be seen inside the [`config/webpack/plugins.js`](config/webpack/plugins.js) file.
A big thanks to the [`Memex`](https://github.com/WorldBrain/Memex) project for helping in setting up the boilerplate code and to  Facebook's [`create-react-app`](https://github.com/facebook/create-react-app) for helping in setup the webpack config.

## Source Organisation: [`src/`](src)

To keep things modular, the resources are divided into folders namely `/background`, `/content_scripts`, `/options`, `/popup`, `/sidebar` and `manifest.json`. We can obviously introduce more as required.

- ### [`/lib`](src/lib): Contains JS and CSS libraries which are not to be compiled and minified by webpack.

  The `/lib` folder is copied as it is to the build folder which is `extension` during production build and `dev` during development build. If you have vendor libraries like bootstrap.css, you can put it inside the lib folder. This comes handy when you have to used `chrome.tabs.executeScript()`, the script to be injected can be placed here.

  - [/lib/css](src/lib/css): Contains CSS files    
  - [/lib/js](src/lib/js): Contains JS files    

- ### [`background`](src/background/): Contains scripts relating to the extension background page. 

  - [**`index.js`**](src/background/index.js): All the contents of the background page go inside the [index.js](src/background/index.js) file.
  Webpack bundles the `index.js` into `background.js` in the build folder. This allows the use of `import` and `require` statements inside the background page. All others scripts for background are referenced here. 

- ### [`content_scripts`](src/content_scripts/): Contains scripts relating to the extension content_scripts page. 

  Webpack bundles the `index.js` into `content_scripts.js` in the build folder.

  - [`index.js`](src/content_scripts/index.js):  All the contents of the background page go inside the [index.js](src/content_scripts/index.js) file.
  Webpack bundles the `index.js` into `content.js` in the build folder. This allows the use of `import` and `require` statements inside the background page. All others scripts for content_scripts are referenced here.

- ### [`popup`](src/popup/): Contains scripts relating to the extension popup page. 

  Webpack bundles the `index.js` into `popup.js` in the build folder which is referenced inside the `popup.html`.

  - [`index.js`](src/popup/index.js): Main file which webpack looks for while bundling. All others scripts for popup are referenced here.
  - [`template.html`](src/popup/template.html) - Provides the base for popup.html. All scripts and CSS file tags are added dynamically using Webpack at compile time.

- ### [`options`](src/options/): Contains scripts relating to the extension options page. 

  Webpack bundles the `index.js` into `options.js` in the build folder which is referenced inside the `options.html`.

  - [`index.js`](src/options/index.js): Main file which webpack looks for while bundling. All others scripts for options are referenced here.
  - [`template.html`](src/options/template.html) - Provides the base for options.html. All scripts and CSS file tags are added dynamically using Webpack at compile time.

- ### [`fonts`](src/fonts/): Contains CSS files for fonts used in the extension. 
  
- ### [`images`](src/img/): Contains images used in the extension 

## [`Config folder`](config) : 

- [`webpack/`](config/webpack): Contains the webpack config file and all the files necessary for setting up the webpack config.
- [`env.js`](config/env.js): Loads environment variables from `.env`. Reference taken from https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/config/env.js 
- [`paths.js`](config/paths.js): Returns an API that provides absolute paths for different files inside this project. Reference taken from https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/config/paths.js 

## Other Config files

- [`package.json`](package.json) - Contains project dependencies, info about project and run commands.

- [`package-lock.json`](package-lock.json): npm config file (genertaed alongwith package.json). This shouldn't be modified unless you're adding new dependencies or updating them.
- [`.eslintrc.js`](.eslintrc.js): ESLint config file
- [`.eslintignore`](.eslintrc.js): Files to be ignored by ESLint.
- [`.babelrc`](.babelrc): Babel config file.
- [`.storybook`](.storybook): Config to setup storybook.

## Others

- [`.gitignore`](.gitignore): Contains a list of files and folders to be ignored by git. [More about gitignore..](https://medium.com/@haydar_ai/learning-how-to-git-ignoring-files-and-folders-using-gitignore-177556afdbe3)
- [`LICENSE`](LICENSE): license file. A software license tells others what they can and can't do with your source code. The most common licenses for open source projects are MIT, Apache, and GNU licenses. The license used in this project is the MIT license.

### MARKDOWNS

- [`README.md`](CONTRIBUTING.md): Introduction to this project along with instructions to build and contribute to this project.

- [`CONTRIBUTING.md`](CONTRIBUTING.md): Detailed instructions on contributing to this project.

- [`CODETOUR.md`](CODETOUR.md): A tour through all the files and folders of this project.

Please feel free to make changes to the above documentation :)
