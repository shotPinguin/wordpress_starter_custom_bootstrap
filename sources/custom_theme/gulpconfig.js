// ==== CONFIGURATION ==== //

// The directory name for your theme; change this at the very least!
var project = 'custom_theme',
  // dev || prod
  env = 'dev',
  // Templates files; do not delete this folder!
  theme = 'templates/',
  // The raw material of your theme: custom scripts, SCSS source files, images, etc.; do not delete this folder!
  assets = 'assets/',
  // Where the project is build
  build = '../../wp-content/themes/' + project + '/',
  // Where node modules are install
  node_modules = '../node_modules/',
  // Plugins are not on npmjs
  plugins = 'plugins/',
  // BrowserSync, local dev url
  localUrl = 'http://www.starter.local/';

// Project settings
module.exports = {

  ftp: {
    env: env,
    login: {
      host: 'beta-nd.com',
      user: 'test', // Creer les identifiants sur beta-nd.com qui pointe directement dans le dossier site-....
      password: '123456', // Voir l'utilisateur FTP "test" sur beta-nd.com
      port: 21
    },
    files: [
      {
        src: [
          build + '**/*'
        ],
        dest: '/wp-content/themes/'
      },
      {
        src: [
          '../../wp-content/plugins/and.test/**/*'
        ],
        dest: '/wp-content/plugins/'
      }
    ]
  },

  plugins: {
    env: env,
    css: {
      dest: build + 'css/',
      name: 'plugins.css',
      src: [
        node_modules + 'owl.carousel/dist/assets/owl.carousel.min.css',
        // plugins + 'bxslider/jquery.bxslider.css'
        assets + 'scss/vendor/aos.scss'
      ]
    },
    js: {
      dest: build + 'js/',
      name: 'plugins.js',
      src: [
        assets + 'js/vendor/jquery-3.3.1.min.js',
        node_modules + 'owl.carousel/dist/owl.carousel.js',
        assets + 'js/vendor/jquery.touchSwipe.min.js',
        assets + 'js/vendor/jquery.lazy.js',
        assets + 'js/vendor/aos.js',
        node_modules + 'toastr/build/toastr.min.js',
        node_modules + 'intersection-observer/intersection-observer.js',
        assets + 'js/vendor/alert.js',
        assets + 'js/vendor/button.js',
        assets + 'js/vendor/carousel.js',
        assets + 'js/vendor/collapse.js',
        assets + 'js/vendor/dropdown.js',
        assets + 'js/vendor/modal.js',
        assets + 'js/vendor/popover.js',
        assets + 'js/vendor/scrollspy.js',
        assets + 'js/vendor/tab.js',
        assets + 'js/vendor/toast.js',
        assets + 'js/vendor/tooltip.js',
        assets + 'js/vendor/utils.js',
        assets + 'js/vendor/index.js'
      ]
    },
    // copyJS: {
    //     src: [
    //         assets + 'js/woo-commerce-custom.js',
    //     ],
    //     dest: build + 'js/',
    // },
    images: {
      'owl.carousel': {
        dest: build + 'css/',
        src: node_modules + 'owl.carousel/dist/assets/**/*(*.png|*.jpg|*.jpeg|*.gif)'
      },
      // 'bxslider': {
      //     dest: build + 'images/',
      //     src: plugins + 'bxslider/images/**/*(*.png|*.jpg|*.jpeg|*.gif)'
      // }
    }
  },

  scripts: {
    env: env,
    clean: [build + 'js/*.map'],
    build: {
      src: assets + 'js/**/*.js',
      dest: build + 'js/'
    },
    lint: {
      src: [assets + 'js/**/*.js'] // Linting checks the quality of the code; we only lint custom scripts, not those under the various modules, so we're relying on the original authors to ship quality code
    },
    chunks: { // Chunks are arrays of paths or globs matching a set of source files; this way you can organize a bunch of scripts that go together into pieces that can then be bundled (above)
      // The core chunk is loaded no matter what; put essential scripts that you want loaded by your theme in here
      core: []
    }
  },

  styles: {
    env: env,
    clean: [build + 'css/*.map'],
    build: {
      src: assets + 'scss/**/*.scss',
      dest: build + 'css/'
    },
    autoprefixer: {
      browsers: ['last 20 versions']
    },
    config: {
      // Adds NPM directories to the load path so you can @import directly
      includePaths: [node_modules],
      precision: 6
    }
  },

  images: {
    env: env,
    clean: [assets + 'images/*.scss'],
    build: { // Copies images from `src` to `build`; does not optimize
      src: assets + 'images/**/*(*.png|*.jpg|*.jpeg|*.gif)',
      dest: build + 'images/',
      srcSprites: assets + 'images/sprites/*.png',
      destSprites: assets + 'images/',
      destScss: assets + 'scss/configs/'
    },
    config: {
      imagemin: {
        optimizationLevel: 7,
        progressive: true,
        interlaced: true,
        use: []
      },
      sprites: {
        imgName: 'sprite.png',
        imgPath: '../images/sprite.png',
        // retinaImgName: 'sprite@2x.png',
        // retinaImgPath: '../images/sprite@2x.png',
        // retinaSrcFilter: [assets + 'images/sprites/*@x2.png'],
        cssName: '_sprites.scss',
        padding: 5
      }
    }
  },

  svg: {
    env: env,
    clean: [],
    build: {
      src: assets + 'svg/*.svg',
      dest: build + 'svg/',
      srcSprites: assets + 'svg/sprites/*.svg',
      destSprites: assets
    },
    config: {
      // https://www.npmjs.com/package/gulp-svgmin
      svgmin: {
        plugins: [{
          removeDoctype: false
        },
          {
            removeComments: false
          },
          {
            cleanupNumericValues: {
              floatPrecision: 2
            }
          },
          {
            convertColors: {
              names2hex: false,
              rgb2hex: false
            }
          }
        ]
      },
      // https://github.com/jkphl/gulp-svg-sprite
      svgsprites: {
        shape: {
          // Set maximum dimensions
          dimension: {
            maxWidth: 100,
            maxHeight: 100
          },
          spacing: {
            // Add padding
            padding: 10
          }
        },
        mode: {
          view: {         // Activate the «view» mode
            dest: '', // relative to pathOutSvg
            bust: false,
            layout: 'horizontal',
            render: {
              scss: {
                dest: 'scss/configs/_sprites-svg.scss',
                template: assets + 'scss/templates/_sprites-svg-template.scss'
              } // relative to pathOutSvg
            },
            dimensions: true // include dimensions in css class
          },
          //symbol: true, // Activate the «symbol» mode ( /!\ Needed for IE9-11 : https://github.com/jonathantneal/svg4everybody)
          stack: false
        }
      }
    }
  },

  iconfont: {
    name: 'and-icon',
    build: {
      src: assets + 'svg/fonts/**/*.svg',
      dest: assets + 'scss/configs/',
      font: build + 'fonts/'
    },
    template: assets + 'scss/templates/_iconfont-template.css'
  },

  theme: {
    env: env,
    build: {
      src: theme + '**/*', // This simply copies PHP files over; both this and the previous task could be combined if you like
      dest: build
    }
  },

  browsersync: {
    files: [build + '**', '!' + build + '**.map'], // Exclude map files
    notify: false, // In-line notifications (the blocks of text saying whether you are connected to the BrowserSync server or not)
    open: true, // Set to false if you don't like the browser window opening automatically
    port: 3000, // Port number for the live version of the site; default: 3000
    proxy: localUrl, // We need to use a proxy instead of the built-in server because WordPress has to do some server-side rendering for the theme to work
    watchOptions: {
      debounceDelay: 2000 // This introduces a small delay when watching for file change events to avoid triggering too many reloads
    }
  },
  //copyJSsrc: assets + 'js/woo-commerce-custom.js',
  watch: { // What to watch before triggering each specified task; if files matching the patterns below change it will trigger BrowserSync or Livereload
    src: {
      styles: assets + 'scss/**/*.scss',
      scripts: assets + 'js/**/*.js', // You might also want to watch certain dependency trees but that's up to you
      //copyJS: assets + 'js/woo-commerce-custom.js', // You might also want to watch certain dependency trees but that's up to you
      images: assets + 'images/**/*(*.png|*.jpg|*.jpeg|*.gif)',
      svg: assets + 'svg/**/*(*.svg)',
      theme: theme + '**/*'
    },
    watcher: 'browsersync'
  }
};