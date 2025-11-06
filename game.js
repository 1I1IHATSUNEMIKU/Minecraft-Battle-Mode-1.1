const config ={
    type: Phaser.AUTO,
    width: 1340,
    height: 630,
    physics:{
        default:"arcade",
        arcade:{
            gravity:{y:0},
            debug:false
        }
    },
    scene:{
        preload:preload,
        create:create,
        update:update
    }
}

const game = new Phaser.Game(config);

let player;
let cursors;

function preload(){
    this.load.image("player",'Steve.png');
}

function create(){
    player = this.physics.add.sprite(40,300,"player");
    player.setScale(0.5);

    cursors = this.input.keyboard.createCursorKeys();
}

function update(){
    if(cursors.left.isDown){
        player.x -= 3;
    }
    else if(cursors.right.isDown){
        player.x += 3;
    }
    else if (cursors.up.isDown){
        player.y -= 3;
    }
}

