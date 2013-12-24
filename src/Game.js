
BasicGame.Game = function (game) {

    // A BitmapData for the face
    this.backgroundBM = null;
    this.skullBM = null;
    this.faceBM = null;

    this.sprites = null; // the source texture atlas

    this.attacked = false;
    this.postAttackDelay = 1000;
    this.postAttack = this.postAttackDelay;

    this.gun = {
        timeUntilFire: 0,
        bulletDelay: 1000.0/6
    };

    this.shock = false;

    this.allowAttack = false;

    this.configs = {
        skull: ['skull'],
        eyes: [
            {
                normal: 'eye_1_normal',
                normalY: 150,
                shock: 'eye_1_wide',
                shockY: 120,
                leftEye: {x: 195, y: 155 },
                rightEye: {x: 275, y: 155 }
            },

            {
                normal: 'eye_2_normal',
                normalY: 150,
                shock: 'eye_2_wide',
                shockY: 120,
                leftEye: {x: 195, y: 155 },
                rightEye: {x: 275, y: 155 }
            }
        ],
        face: [
            {
                normal: 'face_1_normal',
                shock: 'face_1_wide'
            }  
        ],
        hair: ['hair_1_front', 'hair_2_front'],
        nose: ['nose_1', 'nose_2'],
        mouth: [
            {
                normal: 'mouth_1_normal',
                normalY: 270,
                shock: 'mouth_1_wide',
                shockY: 290,
            }
            // { normal: 'mouth_2_normal', shock: 'mouth_2_wide'},
        ]
    };

    this.dudeConfig = {
        
    };

    this.replacements = {

        ambiguouser: ['edgier', 'smoother', 'fizzier', 'more WOW!', 'more... shazam!', 'more... extreme'],
        balls: ['balls', 'nuts', 'bangs', 'asaurus', 'alicious', 'enstein'],
        I: ['I', 'my {rello}', 'we'],
        cani: ['can {I}', "can't {I} just", "why can't {I}"],
        canipayyouin: ['{cani} pay you in', '{doyou} accept payment in'],
        canyou: ['can {you}', "can't {you} just", 'how about you', "why can't {you}", "wouldn't it be simple to just"],
        concepts: ['concepts', 'ideas', 'designs'],
        content: ['the content', 'some content', 'some text', 'photos', 'requirements'],
        designeditem: ['logo', 'website', 'cover', 'business card', 'ident', 'annual report'],
        doyou: ['do {you}', "don't {you}", "why don't {you}"],
        eballs: ['eballs', 'enuts', 'ebangs', 'asaurus', 'ercision', 'enstein'],
        format: ['pdf', 'Word file', 'bitmap', 'floppy disk', 'ZIP disk'],
        getitdoneby: ['get my {designeditem} done by', 'be done by', 'get it printed by'],
        it: ['it', 'the {nicething}', 'the {scarything}', 'the {designeditem}', 'my {designeditem}'],
        mybosses: ["my boss's", "the director's", "my"],
        nastier: ['edgier', 'more aggressive', 'less toothy', 'less innocent', 'wetter', 'older', 'nastier', 'meaner'],
        nicer: ['more friendly', 'happier', 'more cheerful', 'younger', 'more tween', 'more hip', 'funnier'],
        nicething: ['baby', 'puppy', 'children', 'Santa', 'elderly couple'],
        paymentin: ['beer', 'backrubs', 'pirated DVDs', 'cheese', 'bitcoin', 'pizza', '2018'],
        photoshop: ['photoshop', 'photochop', 'tweak'],
        rello: ['nephew', 'cousin', 'wife', 'daughter', 'son', 'mother', 'father'],
        rellotype: ['colourblind', 'artisty', 'creative', 'artsy-fartsy'],
        relative: ['{rellotype} {rello}', '{rello}'],
        scarything: ['dragon', 'pitbull', 'spikes', 'old lady'],
        software: ['Windows PC', 'Word', 'Adobes', 'Powerpoint', 'Publisher'],
        somethingstupid: ['totes {stupidthing}', '{stupidthing}', 'uber {stupidthing}'],
        stupidthing: ['amaz{eballs}', 'rad{balls}', 'YOLO{balls}', 'cray-cray'],
        tech: ['Adobes', 'Microsoft', 'Word', 'Comic Sans', 'Windows PCs', 'crayons', 'computers', 'Apples'],
        tightdeadline: ['tomorrow', '5 pm', 'tomorrow morning', 'Friday'],
        weirdlooking: ['weird', 'green', 'dark', 'fuzzy', 'squinty'],
        won: ['were the best', 'won', 'were amazing', 'are awesome'],
        you: ['you guys', 'you people', 'you', 'your designers'],
        wrongword: ["Youre", "havvoc", "colaborate", "errotica", "niples"],
        slogan: ['slogan', 'byline', 'catchcry'],
        awfulslogan: [
            'Put the FUN back in fungus', 'Dial C for Chlamydia', 'Open up and say "Beef"',
            '2 Cheesy 4 U', 'Now with Flavour-Cysts', 'Tight like a Nun']
    };

    this.quotes = [
        "I think {you} should use {tech}.",
        "{doyou} work with {tech}?",
        "{canyou} send me a {format} so {I} can edit it in {software}?",
        "It looks too {weirdlooking} in my {software}.",
        "I'll send you {content} next week, but I need proofs by {tightdeadline}.",
        "{canyou} {photoshop} the {scarything} to be {nicer}?",
        "{canyou} make the {nicething} {nastier}?",
        "Your {concepts} {won}, but we're going with {mybosses} {relative}.",
        "{canyou} make {it} {ambiguouser}?",
        "Make it {nicer}, but also {nastier}.",
        "My {relative} thinks {it} should be {ambiguouser}.",
        "If {you} could {getitdoneby} {tightdeadline} would be {somethingstupid}.",
        "Our {designeditem} needs to say \"{somethingstupid}!\"",
        "The {designeditem} needs our {slogan}: '{awfulslogan}!'",
        "{canipayyouin} {paymentin}?",
        "I'm pretty sure you spelled \"{wrongword}\" wrong",
    ];
};

var NaiveWordWrap = function(text, wrapPosition)
{
    var lines = [];
    var left = text;

    while(left.length > wrapPosition)
    {
        var index = wrapPosition;
        while(left.charAt(index) !== ' ' && index > 0) {
            index--;
        }
        if(index < 0) { index = wrapPosition; }

        lines.push(left.substring(0, index));
        while(left.charAt(index) == ' ' && index < left.length)
        {
            index++;
        }
        if(index < left.length)
        {
            left = left.substring(index);    
        } else {
            left = '';
        }
    }
    if(left.length > 0)
    {
        lines.push(left);    
    }

    // orphan control
    var lastLineWords = lines[lines.length-1].split(' ');
    if(lines.length > 1 && lastLineWords.length == 1)
    {
        var sndLast = lines[lines.length-2].split(' ');
        var newLast = sndLast[sndLast.length - 1] + ' ' + lines[lines.length-1];
        var newSndLast = sndLast.slice(0, -1).join(' ');
        if(newLast.length < wrapPosition && newSndLast.length < wrapPosition)
        {
            lines[lines.length-1] = newLast;
            lines[lines.length-2] = newSndLast;
        }
    }

    return lines.join('\n');
};

BasicGame.Game.prototype = {

    getQuote: function()
    {
        if(typeof(this.quotesUntilShuffle) === 'undefined') { this.quotesUntilShuffle = 0; }

        if(this.quotesUntilShuffle == 0)
        {
            Phaser.Math.shuffleArray(this.quotes);
            this.quotesUntilShuffle = this.quotes.length;
        }



        var q = this.quotes.shift();
        this.quotes.push(q);

        var regex = /\{(.*?)\}/;
        var replacements = this.replacements;
        var rnd = this.game.rnd;

        var repl = function(m, t) {
            return rnd.pick(replacements[t]);
        };

        while(q.indexOf('{') >= 0)
        {
            q = q.replace(regex, repl);
        }

        this.quotesUntilShuffle -= 1;

        return q.charAt(0).toUpperCase() + q.slice(1);
    },

    getFrame: function(frameName, shock)
    {
        return this.game.cache.getFrameByName('dude', frameName);
    },

    drawFrame: function(ctx, frame, x, y)
    {
        ctx.drawImage(
            this.sprites,
            frame.x, frame.y, frame.width, frame.height,
            x, y, frame.width, frame.height);
    
    },

    drawMirrored: function(ctx)
    {
        ctx.save();
        ctx.translate(ctx.canvas.width, 0);
        ctx.scale(-1, 1);
    },

    endMirrored: function(ctx)
    {
        ctx.restore();
    },

    newDudeConfig: function() {
        var cfg = this.dudeConfig;

        cfg.skull = this.game.rnd.pick(this.configs.skull);

        var eyes = this.game.rnd.pick(this.configs.eyes);


        cfg.eyes = eyes.normal;
        cfg.eyesNormalY = eyes.normalY;

        cfg.leftEye = eyes.leftEye;
        cfg.rightEye = eyes.rightEye;

        cfg.eyesShock = eyes.shock;
        cfg.eyesShockY = eyes.shockY;

        var face = this.game.rnd.pick(this.configs.face);

        cfg.face = face.normal;
        cfg.faceShock = face.shock;
        
        cfg.nose = this.game.rnd.pick(this.configs.nose);

        var mouth = this.game.rnd.pick(this.configs.mouth);

        cfg.mouth = mouth.normal;
        cfg.mouthNormalY = mouth.normalY;
        cfg.mouthShock = mouth.shock;
        cfg.mouthShockY = mouth.shockY;
        
        cfg.hairFront = this.game.rnd.pick(this.configs.hair);
    },

    createDude: function() {

        var ctx;
        var canvas;
        var cache = this.game.cache;
        var cfg = this.dudeConfig;
        var frame;
        var x, y;

        // skull first
        ctx = this.skullBM.context;
        canvas = ctx.canvas;
        this.skullBM.clear();

        var centreLine = canvas.width / 2;

        frame = this.getFrame(cfg.skull);
        this.drawFrame(ctx, frame, centreLine - frame.width, canvas.height - frame.height);
        this.drawMirrored(ctx);
        this.drawFrame(ctx, frame, centreLine - frame.width, canvas.height - frame.height);
        this.endMirrored(ctx);
        
        // position the eyes
        this.leftEye.x = cfg.leftEye.x;
        this.leftEye.y = cfg.leftEye.y;
        this.leftEye.ddY = this.leftEye.dX = this.leftEye.dY = 0;

        this.rightEye.x = cfg.rightEye.x;
        this.rightEye.y = cfg.rightEye.y;
        this.rightEye.ddY = this.rightEye.dX = this.rightEye.dY = 0;

        // then face
        ctx = this.faceBM.context;
        canvas = ctx.canvas;

        this.faceBM.clear();

        // draw the face
        frame = this.getFrame(cfg.face);
        this.drawFrame(ctx, frame, centreLine - frame.width, canvas.height - frame.height);

        if(this.shock)
        {
            frame = this.getFrame(cfg.faceShock);
            this.drawFrame(ctx, frame, centreLine - frame.width, canvas.height - frame.height);
        }

        // draw the left eye
        if(this.shock)
        {
            frame = this.getFrame(cfg.eyesShock);   
            y = cfg.eyesShockY;
        } else {
            frame = this.getFrame(cfg.eyes);
            y = cfg.eyesNormalY;
        }

        x = centreLine - frame.width - 20;

        ctx.clearRect(x+4, y, frame.width-5, frame.height);
        this.drawFrame(ctx, frame, x, y);

        // and the flip side
        this.drawMirrored(ctx);
        
        frame = this.getFrame(cfg.face);
        this.drawFrame(ctx, frame, centreLine - frame.width, canvas.height - frame.height);

        if(this.shock)
        {
            frame = this.getFrame(cfg.faceShock);
            this.drawFrame(ctx, frame, centreLine - frame.width, canvas.height - frame.height);
        }

        // draw the right eye
        if(this.shock)
        {
            frame = this.getFrame(cfg.eyesShock);   
            y = cfg.eyesShockY;
        } else {
            frame = this.getFrame(cfg.eyes);
            y = cfg.eyesNormalY;
        }
        

        x = centreLine - frame.width - 20;
        

        ctx.clearRect(x+4, y, frame.width-5, frame.height);
        this.drawFrame(ctx, frame, x, y);

        this.endMirrored(ctx);

        // add a nose
        frame = this.getFrame(cfg.nose);
        this.drawFrame(ctx, frame, centreLine - frame.width / 2, 230 - frame.height);

        // and a mouth
        if(this.shock)
        {
            frame = this.getFrame(cfg.mouthShock);    
            y = cfg.mouthShockY - frame.height;
        } else {
            frame = this.getFrame(cfg.mouth);
            y = cfg.mouthNormalY - frame.height;
        }
        
        this.drawFrame(ctx, frame, centreLine - frame.width / 2, y);

        // and some hair
        frame = this.getFrame(cfg.hairFront);
        this.drawFrame(ctx, frame, centreLine - frame.width / 2, 20);

        // resort the facial features
        this.faceGroup.bringToTop(this.skull);
        this.faceGroup.bringToTop(this.leftEye);
        this.faceGroup.bringToTop(this.rightEye);
        this.faceGroup.bringToTop(this.face);

        if(!this.shock) {
            this.lookAtSomething();
        }
        

        
    },  

	create: function () {

        this.sprites = this.game.cache.getImage('dude');

        this.backgroundBM = this.game.add.bitmapData(this.game.width, this.game.height);
        this.background = this.game.add.sprite(0, 0, this.backgroundBM);

        this.skullBM = this.game.add.bitmapData(400, 384);
		this.faceBM = this.game.add.bitmapData(400, 384);

        this.faceGroup = this.game.add.group();
        this.faceGroup.y = this.game.height + 1;

        this.newDudeConfig();
        this.showNextDude();

        this.skull = this.faceGroup.create((this.game.width - 400)/2, 0, this.skullBM);

        this.leftEye = this.faceGroup.create(this.dudeConfig.leftEye.x, this.dudeConfig.leftEye.y, 'dude', 'eyeball');
        this.rightEye = this.faceGroup.create(this.dudeConfig.rightEye.x, this.dudeConfig.rightEye.y, 'dude', 'eyeball');

        this.face = this.faceGroup.create((this.game.width - 400)/2, 0, this.faceBM);

        this.talkboxGroup = this.game.add.group();

        this.talkbox = this.talkboxGroup.create(0, 0, 'loadingAtlas', 'loading_bar');

        this.talkbox.x = 10;
        this.talkbox.width = this.game.width - 20;
        this.talkbox.height = this.game.height / 4;
        this.talkbox.y = this.game.height - 60;

        this.talkboxText = this.game.add.bitmapText(this.game.width / 2, this.game.height - 40,
            NaiveWordWrap(this.getQuote(), 40),
            {
                font: 'small_black',
                wordWrap: true,
                wordWrapWidth: this.talkbox.width - 20,
                align: 'center' 
            });
        this.talkboxText.anchor.x = 0.5;
        this.talkboxGroup.add(this.talkboxText);

        this.talkboxGroup.y = 100;

        // this.talkboxGroup.add(this.talkboxText);
	},

    lookAtSomething: function() {

        if(this.attacking) {
            return;
        }

        var lookAtX = this.rnd.integerInRange(-3, 3);
        var lookAtY = this.rnd.integerInRange(-3, 3);

        this.leftLookatTween = this.game.add.tween(this.leftEye).to({
            x: this.dudeConfig.leftEye.x + lookAtX,
            y: this.dudeConfig.leftEye.y + lookAtY,
        }, 100, Phaser.Easing.Quadratic.InOut, true, 650);

        this.rightLookatTween = this.game.add.tween(this.rightEye).to({
            x: this.dudeConfig.rightEye.x + lookAtX,
            y: this.dudeConfig.rightEye.y + lookAtY,
        }, 150, Phaser.Easing.Quadratic.InOut, true, 600);

        this.rightLookatTween.onComplete.add(this.lookAtSomething, this);
    },

    drawSpatter: function(x, y) {
        // Blood spatter!
        var ctx = this.backgroundBM.context;
        bloodFrameName = this.game.rnd.pick(['spatter_1', 'spatter_2', 'spatter_3', 'spatter_4']);
        frame = this.getFrame(bloodFrameName);
        this.drawFrame(ctx, frame, x - frame.width / 2, y - frame.height / 2);

    },

    startAttack: function() {
        if(!this.shock) {
            this.shock = true;
            this.createDude();

            this.game.add.tween(this.talkboxGroup)
                .to({y:100}, 400, Phaser.Easing.Quadratic.InOut, true);

            this.game.sound.play(this.game.rnd.pick(['scream_1', 'scream_2', 'scream_3']));
        }

        if(this.leftLookatTween) {
            this.leftLookatTween.stop();
            this.rightLookatTween.stop();

            this.leftLookatTween = this.rightLookatTween = null;
        }

        this.attacked = true;
        this.postAttack = this.postAttackDelay;
    },

    bullet: function(x, y) {
        // face first
        var ctx;
        var frame;

        this.startAttack();

        this.drawSpatter(x, y);
        this.drawSpatter(x + 150, y);
        this.drawSpatter(x - 150, y);
        this.drawSpatter(x, y - 150);
        this.drawSpatter(x, y + 150);

        // eyeball pop!
        if(Phaser.Rectangle.contains(this.leftEye.bounds, x, y))
        {
            this.faceGroup.bringToTop(this.leftEye);
            this.leftEye.ddY = 1600;
            this.leftEye.dY = this.game.rnd.integerInRange(-100, -300);
            this.leftEye.dX = this.game.rnd.integerInRange(-300, 300);
        }

        // eyeball pop!
        if(Phaser.Rectangle.contains(this.rightEye.bounds, x, y))
        {
            this.faceGroup.bringToTop(this.rightEye);
            this.rightEye.ddY = 1600;
            this.rightEye.dY = this.game.rnd.integerInRange(-100, -300);
            this.rightEye.dX = this.game.rnd.integerInRange(-300, 300);
        }

        x = x - this.face.x;
        y = y - this.face.y;

        ctx = this.faceBM.context;
        ctx.save();
        frame = this.getFrame('raggedbullet');
        ctx.globalCompositeOperation = 'destination-out';
        this.drawFrame(ctx, frame, x - frame.width / 2, y - frame.height / 2);
        ctx.restore();

        ctx = this.skullBM.context;
        ctx.save();
        frame = this.getFrame('bullethole');
        ctx.globalCompositeOperation = 'destination-out';
        this.drawFrame(ctx, frame, x - frame.width / 2, y - frame.height / 2);

        ctx.restore();

        // shock!
        this.faceGroup.x = this.game.rnd.integerInRange(-10, 10);
        this.faceGroup.y = this.game.rnd.integerInRange(0, 10);

        this.game.sound.play('gunshot');


    },

    showNextDude: function() {

        this.allowAttack = false;

        var tween = this.game.add.tween(this.faceGroup)
            .to({
                y: this.game.height
            }, 300, Phaser.Easing.Quadratic.InOut, true);

        tween.onComplete.add(function() {
                this.shock = false;
                this.attacked = false;

                this.newDudeConfig();
                this.createDude();
                
                this.game.add.tween(this.faceGroup)
                    .to({
                        y: 0
                    }, 300, Phaser.Easing.Quadratic.InOut, true)
                    .onComplete.add(function() {
                        this.allowAttack = true;

                        this.talkboxText.setText(NaiveWordWrap(this.getQuote(), 40));

                        this.game.add.tween(this.talkboxGroup)
                            .to({y:0}, 400, Phaser.Easing.Quadratic.InOut, true);

                    }, this);

            }, this);
    },

	update: function () {

        this.postAttack -= this.game.time.elapsed;

        if(this.attacked && this.allowAttack && this.postAttack < 0)
        {
            this.showNextDude();
        }

        this.leftEye.x += this.leftEye.dX * this.game.time.physicsElapsed;
        this.leftEye.y += this.leftEye.dY * this.game.time.physicsElapsed;
        this.rightEye.x += this.rightEye.dX * this.game.time.physicsElapsed;
        this.rightEye.y += this.rightEye.dY * this.game.time.physicsElapsed;

        this.leftEye.dY += this.leftEye.ddY * this.game.time.physicsElapsed;
        this.rightEye.dY += this.rightEye.ddY * this.game.time.physicsElapsed;
        

        if(this.allowAttack)
        {
            this.faceGroup.x = Math.floor(this.faceGroup.x * 0.95);
            this.faceGroup.y = Math.floor(this.faceGroup.y * 0.95);

            if(this.game.input.activePointer.isDown) {
                this.gun.timeUntilFire -= this.game.time.elapsed;
                if(this.gun.timeUntilFire < 0) {
                    this.gun.timeUntilFire = this.gun.bulletDelay;
                    this.bullet(this.game.input.activePointer.x, this.game.input.activePointer.y);
                }
            } else {
                this.gun.timeUntilFire = 0;
            }
        }

	},

	quitGame: function (pointer) {

		//	Here you should destroy anything you no longer need.
		//	Stop music, delete sprites, purge caches, free resources, all that good stuff.

		//	Then let's go back to the main menu.
		this.game.state.start('MainMenu');

	}

};
