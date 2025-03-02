function td_setup() {
    if(sceneState === "td") {
        new p5(top_down);

        //TBD
    }
}

function td_draw() {
    if(sceneState === "td") {
        //game functions are called here
        td_player_draw();
        td_combat();
        openplayerMenu();
        td_transistion_draw();
        npc_Collision();
        //npc_Spawn();
    }
}

var top_down = function(sketch) {
    sketch.setup = function() {
        let screen = this.createCanvas(800, 450);
        screen.position(0,0);

        //game objects are called here
        td_player = new this.Sprite(400, 225, 50, 50);
        td_player.rotationLock = true;

        td_transistion = new this.Sprite(100, 400, 25, 25);
        td_transistion.color = 'purple';
        td_transistion.collider = 'k';

        td_swing = new this.Group();

        npc = new this.Group();
        npc.collider = 'kinematic';

        npc_Spawn();

        npc_df = new Group();
        npc_df.d = 150;
        npc_df.debug = true;
        npc_df.visible = true;
        npc_df.collider = 'n';

       for(let i=0; i<npc.length; i++) {
        new npc_df.Sprite(npc.x, npc.y);
       }

        /*text_b = new Group();
        text_b = new this.Sprite(100, 100, 250, 50);
        text_b.textSize = 40;
        text_b.text = "Helllooooo";
        text_b.color = 'white';
        text_b.visible = false; */

        //box=[new Sprite(400,225,200,50), new Sprite(400,225,200,50)];
        

    }

    sketch.draw = function() {
        this.background("black");

        for(let i=0; i<npc.length;i++) {
            npc_df[i].x = npc[i].x;
            npc_df[i].y = npc[i].y;
        }
        console.log(npc.length);

        //for scene switching
        if(clear === true) {
            game_clear(sketch);
            clear = false;
        }

        if(did_player_swing_td === true) {
            if(playerPPosition === "down") {
                td_player_swing = new this.Sprite(td_player.x, td_player.y+50, 100, 25);
            }else if(playerPPosition === "left") {
                td_player_swing = new this.Sprite(td_player.x-50, td_player.y, 25, 100);
            }else if(playerPPosition === "up") {
                td_player_swing = new this.Sprite(td_player.x, td_player.y-50, 100, 25);
            }else if(playerPPosition === "right") {
                td_player_swing = new this.Sprite(td_player.x+50, td_player.y, 25, 100);
            }
    
            //td_player_swing.visible = false;
    
            allSprites.overlaps(td_swing);
    
            td_swing.add(td_player_swing);
            did_player_swing_td = false;
        }else if(did_player_swing_td === false) {
            if(this.frameCount % 1 === 0) {
                td_swing.removeAll();
            }
        }
    }
}