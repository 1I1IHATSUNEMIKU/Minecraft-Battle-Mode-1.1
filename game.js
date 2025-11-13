const config ={
    type: Phaser.AUTO,
    width: 1340,
    height: 630,
    physics:{
        default:"arcade",
        arcade:{
            gravity:{y:1500},
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
let ground;

function preload(){
    this.load.image("player",'Steve.png');
    this.load.image("enemy",'Garrett.png');
    this.load.image("arena",'Arena.jpg');
    this.load.image("ground",'ground.png');
    this.load.image("Sword1",'Sword1.gif');
    this.load.image("Sword2",'Sword2.png');
}

function create(){
    const bg = this.add.image(670,315,'arena');
    bg.setDisplaySize(1340,630);

    ground = this.physics.add.staticGroup();
    ground.create(650,400,"ground").setScale(2).refreshBody();

    player = this.physics.add.sprite(40,300,"player");
    player.setScale(0.5);
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
    this.physics.add.collider(player,ground)

    enemy = this.physics.add.sprite(1300,300,"enemy");
    enemy.setScale(0.25);
    enemy.setBounce(0.2);
    enemy.setCollideWorldBounds(true);
    this.physics.add.collider(enemy,ground)

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

