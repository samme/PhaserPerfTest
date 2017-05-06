(function() {
    window.GAME = new Phaser.Game(800, 400, Phaser.AUTO, "phaser", {
        init: init,
        preload: preload,
        create: create,
        update: update,
        render: render
    }, false, false);

    function init() {
        // SET THE NUMBER OF TEXT OBJECTS YOU WANT TO HAVE CREATED INITIALLY
        // YOU CAN CREATE 50 MORE BY CLICKS / TOUCHES
        this.number_of_text_objects = 1000;
        
        // ADD STATS
        // this.benchmark = new Stats();
        // this.viewport = document.getElementById("phaser");
        // this.viewport.appendChild(this.benchmark.domElement);
        
        // should the game loop force a logic update, regardless of the delta timer
        // phaser.io/docs/2.6.2/Phaser.Game.html#forceSingleUpdate
        this.game.forceSingleUpdate = false;
        
        // phaser.io/docs/2.6.2/Phaser.Input.html#maxPointers
        this.input.maxPointers = 1;
        
        // round coordinates to whole pixels
        this.game.renderer.renderSession.roundPixels = true;
        
        // clear the canvas each frame before rendering the display list.
        // phaser.io/docs/2.6.2/Phaser.Game.html#clearBeforeRender
        this.game.clearBeforeRender = false;
        
        this.time.advancedTiming = true;
                  
    }

    
    function preload() {}

    function create() {
        // The first text object which always exists
        this.textDebug1 = this.game.add.text(100, 0, "Phaser: " + Phaser.VERSION + " | Render: " + this.game.renderType + " | AntiAlias: " + this.stage.smoothed, { fontSize: 24, fill: "#FF0000" });
        this.textDebug2 = this.game.add.text(100, 30, "Text no.: " + Math.max(1, this.number_of_text_objects), { fontSize: 24, fill: "#FFFF00" });
        this.fpsText = this.add.text(300, 30, "", {fill: "aqua", font: "24px monospace"});
        // Additional text objects
        for (var i = 1; i < this.number_of_text_objects; i++) {
            this.game.add.text(Math.random() * 400, 50 + (Math.random() * 300), "Text object #" + (i + 1), { fontSize: 18, fill: "#FFFFFF" });
        }
        var game = this.game;
        var profileName = "v"+Phaser.VERSION + " " + this.number_of_text_objects + " text objects";
        var profileDur = 5000;
        console.log("Starting profile ("+profileDur/1000+"s)")
        console.profile(profileName);
        this.time.events.add(profileDur, function () {
          console.profileEnd(profileName);
          console.log("fps", game.time.fps);
          console.log("suggestedFps", game.time.suggestedFps);
        });
    }

    function update() {
        this.fpsText.text = "FPS: " + this.time.fps + " (" + this.time.suggestedFps + ")";
        // this.benchmark.begin();
    }

    function render() {
        // this.benchmark.end();
    }

})();