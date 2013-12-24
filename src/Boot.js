BasicGame = {};

BasicGame.Boot = function (game) {

};

BasicGame.Boot.prototype = {

    preload: function () {
        this.game.load.atlasJSONHash('loadingAtlas', 'assets/atlas/loading.png', 'assets/atlas/loading.json');
    },

    create: function () {

        this.game.input.maxPointers = 1;

        if (this.game.device.desktop)
        {
            //  If you have any desktop specific settings, they can go in here
            this.game.stage.scale.pageAlignHorizontally = true;
        }
        else
        {
           
        }

        this.game.stage.backgroundColor = DS.Colours.loading.background;


        Phaser.Canvas.setSmoothingEnabled(this.game.context, false);
        Phaser.Canvas.setImageRenderingCrisp(this.game.canvas);

         //  Same goes for mobile settings.
        //  In this case we're saying "scale the game, no lower than 480x260 and no higher than 1024x768"
        this.game.stage.scaleMode = Phaser.StageScaleMode.SHOW_ALL;

        this.game.stage.scale.maxWidth = 1024;
        this.game.stage.scale.maxHeight = 768;

        /* this.game.stage.scale.minWidth = 1024;
        this.game.stage.scale.minHeight = 768;
        
        
        this.game.stage.scale.forceLandscape = true;
        this.game.stage.scale.pageAlignHorizontally = true; */
        this.game.stage.scale.setScreenSize(true); 


        //  By this point the preloader assets have loaded to the cache, we've set the game settings
        //  So now let's start the real preloader going
        this.game.state.start('Preloader');

    }

};
