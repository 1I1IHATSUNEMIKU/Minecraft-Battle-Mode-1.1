const config ={
    type: Phaser.AUTO,
    width: 1340,
    height: 630,
    physics:{
        default:"arcade",
        arcade:{
            gravity:{y:800},
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
let swords;
let playerDirection = "right";
let playerLife =20;
let playerInvincible=false

function preload(){
    this.load.image("player",'Steve.png');
    this.load.image("enemy",'Garrett.png');
    this.load.image("arena",'Arena.jpg');
    this.load.image("ground",'ground.png');
    this.load.image("sword1",'Sword1.gif');
    this.load.image("sword2",'Sword2.png');
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

    enemy = this.physics.add.sprite(1300,290,"enemy");
    enemy.setScale(0.25);
    enemy.setBounce(0.2);
    enemy.setCollideWorldBounds(true);
    this.physics.add.collider(enemy,ground)
    enemy.setVelocityX(500)

    swords = this.physics.add.group({
        defaultKey:"sword1",
        maxSize:5,
        runChildUpdate:true
    })

     swords2 = this.physics.add.group({
        defaultKey:"sword2",
        maxSize:5,
        //runChildUpdate:true
    })

    cursors = this.input.keyboard.createCursorKeys();
    
    this.time.addEvent({
        delay:4000,
        callback: enemySword,
        callbackScope:this,
        loop: true
    })

    this.physics.world.on('worldbounds',(body) => {
        body.gameObject.setActive(false);
        body.gameObject.setVisible(false)
    })

    this.physics.add.overlap(player,swords2,hitPlayer,null,this)
}

function update(){
    if(cursors.left.isDown){
        player.x -= 3;
        playerDirection ="left"
    }
    else if(cursors.right.isDown){
        player.x += 3;
        playerDirection ="right"
    }
    else if (cursors.up.isDown){
        player.y -= 3;
    }
    if(enemy.body.blocked.left){
        enemy.setVelocityX(150)
    }
    if(enemy.body.blocked.right){
        enemy.setVelocityX(-150)
    }
    if(Phaser.Input.Keyboard.JustDown(cursors.space)){
        playerSwords();
    }
}

function playerSwords(){
    const sword = swords.get(player.x,player.y-20);
    if(sword){
        sword.setActive(true).setVisible(true).setScale(0.3);
        sword.body.enable = true;
        sword.body.allowGravity = false;
        if(playerDirection === 'right'){
            sword.setVelocityX(300)
        }
        else{
            sword.setVelocityX(-300)
        }
    }
}

function enemySword(){
    const sword = swords2.get(enemy.x,enemy.y);
    if(!sword) return;
    
    sword.setActive(true);
    sword.setVisible(true);
    sword.setScale(0.15);

    sword.body.enable = true;
    sword.body.allowGravity=false;
    sword.setCollideWorldBounds(true);
    sword.body.onWorldBounds=true;

    const direction = player.x < enemy.x ? -250 : 250;
    sword.setVelocityX(direction);
}

function hitPlayer(player,sword){
    if (playerInvincible) return;

    playerInvincible = true;
    playerLife -= 10;

    sword.setActive(false);
    sword.setVisible(false);
    sword.body.enable = false;

    player.setTint(0xff0000);

    player.scene.time.delayedCall(1000,() => {
        player.clearTint();
        playerInvincible = false
    })
}