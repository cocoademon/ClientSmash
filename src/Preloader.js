
BasicGame.Preloader = function (game) {

    this.background = null;
    this.preloadBar = null;

    this.ready = false;

};

BasicGame.Preloader.prototype = {

    preload: function () {
        Phaser.Canvas.setImageRenderingCrisp(this.game.canvas);
        Phaser.Canvas.setSmoothingEnabled(this.game.context, false);
        
        this.skullFire = this.add.sprite(0, 0, 'loadingAtlas', 'skull_flames');
        this.skull = this.add.sprite(0, 0, 'loadingAtlas', 'skull');

        this.skullFire.x = this.skull.x =  (this.game.width - this.skullFire.width) / 2;
        this.skullFire.y = this.skull.y =  (this.game.height - this.skullFire.height) / 2;

        this.game.add.tween(this.skullFire).to({alpha: 0.5}, 300, Phaser.Easing.Quadratic.InOut, true, 0, 1000, true);

        this.loadingText = this.add.sprite(0, 0, 'loadingAtlas', 'loading');
        this.loadingText.x = (this.game.width - this.loadingText.width) / 2;
        this.loadingText.y = this.skullFire.y - this.loadingText.height -  3;

        this.preloadBar = this.add.sprite(this.game.width / 2, this.skullFire.y + 40, 'loadingAtlas',  'loading_bar');
        this.preloadBar.x -= this.preloadBar.width / 2;

        //  This sets the preloadBar sprite as a loader sprite.
        //  What that does is automatically crop the sprite from 0 to full-width
        //  as the files below are loaded in.
        this.load.setPreloadSprite(this.preloadBar);

        //  Here we load the rest of the assets our game needs.
        //  As this is just a Project Template I've not provided these assets, swap them for your own.
        
        /// this.load.audio('titleMusic', ['audio/main_menu.mp3']);

        this.load.bitmapFont('title', 'assets/fonts/title.png', 'assets/fonts/title.fnt');
        this.load.bitmapFont('green_m', 'assets/fonts/green_m.png', 'assets/fonts/green_m.fnt');
        this.load.bitmapFont('small_black', 'assets/fonts/small_black.png', 'assets/fonts/small_black.fnt');
        
        this.game.load.atlasJSONHash('sprites', 'assets/atlas/sprites.png', 'assets/atlas/sprites.json');
        this.game.load.atlasJSONHash('dude', 'assets/atlas/dude.png', 'assets/atlas/dude.json');

        // load some sounds
        this.game.load.audio('gunshot', ['assets/sounds/gunshot.mp3']);
        this.game.load.audio('scream_1', ['assets/sounds/scream_1.mp3']);
        this.game.load.audio('scream_2', ['assets/sounds/scream_2.mp3']);
        this.game.load.audio('scream_3', ['assets/sounds/scream_3.mp3']);

    },

    create: function () {

        //  Once the load has finished we disable the crop because we're going to sit in the update loop for a short while as the music decodes
        this.preloadBar.cropEnabled = false;

    },

    update: function () {

        //  You don't actually need to do this, but I find it gives a much smoother game experience.
        //  Basically it will wait for our audio file to be decoded before proceeding to the MainMenu.
        //  You can jump right into the menu if you want and still play the music, but you'll have a few
        //  seconds of delay while the mp3 decodes - so if you need your music to be in-sync with your menu
        //  it's best to wait for it to decode here first, then carry on.
        
        //  If you don't have any music in your game then put the game.state.start line into the create function and delete
        //  the update function completely.
        
        // if (this.cache.isSoundDecoded('gunshot') && this.ready == false)
        {
            this.ready = true;
            this.game.state.start('MainMenu');
        }

    }

};
