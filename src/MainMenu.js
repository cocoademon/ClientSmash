
BasicGame.MainMenu = function (game) {

	this.music = null;
	this.playButton = null;

};

BasicGame.MainMenu.prototype = {

	create: function () {

		//	We've already preloaded our assets, so let's kick right into the Main Menu itself.
		//	Here all we're doing is playing some music and adding a picture and button
		//	Naturally I expect you to do something significantly better :)

		//this.music = this.add.audio('titleMusic');
		//this.music.play();

		//this.add.sprite(0, 0, 'titlepage');
		this.game.stage.backgroundColor = '#00fffb';//DS.Colours.menu.background;

		this.fist = this.game.add.sprite(0, 0, 'sprites', 'fist');
		this.fist.x = (this.game.width - this.fist.width) / 2;
		this.fist.y = this.game.height;

		var graphics = this.add.graphics(0, this.game.height);
		graphics.beginFill(0x5e361c, 1);
		graphics.drawRect(0, 0, this.game.width, this.game.height / 2);

		

		this.titleText = this.game.add.bitmapText(0, -60, 'Client Smash!',
			{ font: 'title', align: 'center' });

		this.titleText.x = (this.game.width - this.titleText.width) / 2;

		this.game.add.tween(this.titleText).to({
			y: this.game.height / 2 - this.titleText.height
		}, 1200, Phaser.Easing.Bounce.Out, true);

		this.game.add.tween(graphics).to({
			y: this.game.height / 2
		}, 400, Phaser.Easing.Linear.None, true);

		this.subtitleText = this.game.add.bitmapText(this.game.width, this.game.height / 2 + 10, "Take 'em out!",
			{ font: 'title', align: 'center' });

		this.startText = this.game.add.bitmapText(0, this.game.height - 60, "Tap to start smashin'",
			{ font: 'subtitle', align: 'center' });

		this.startText.x = -this.startText.width;

		this.game.add.tween(this.subtitleText).to({
			x: (this.game.width - this.subtitleText.width) / 2
		}, 400, Phaser.Easing.Linear.None, true, 1500);

		this.game.add.tween(this.startText).to({
			x: (this.game.width - this.startText.width) / 2
		}, 400, Phaser.Easing.Linear.None, true, 1500);

		this.game.add.tween(this.fist).to({
			y: (this.game.height / 2) - this.fist.height
		}, 400, Phaser.Easing.Linear.None, true, 1500);


		this.playButton = this.add.button(
			(this.game.width - this.subtitleText.width) / 2,
			this.game.height / 2 + 10,
			null, this.startGame, this, null, null, null);
		// this.playButton.width = this.subtitleText.width;

	},

	update: function () {

		if(this.input.activePointer && this.input.activePointer.justPressed())
		{
			this.startGame();
		}

	},

	startGame: function (pointer) {

		//	Ok, the Play Button has been clicked or touched, so let's stop the music (otherwise it'll carry on playing)
		//this.music.stop();

		//	And start the actual game
		this.game.state.start('Game');

	}

};
