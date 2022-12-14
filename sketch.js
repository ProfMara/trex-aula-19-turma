var soloSprite, soloImagem;
var trexSprite, trexCorrendo, trexColidido;
var nuvemImagem, nuvemSprite;
var gameOverImagem, gameOverSprite;
var restartImagem, restartSprite;
var o1, o2, o3, o4, o5, o6;

var JOGAR = 1;
var FIM = 0;
var estadoJogo = JOGAR;

var grupoCactos, grupoNuvens;

//cria a variável

var somFim;
var somCheckPoint;
var pontos = 0; 

function preload() {
    //carregar as imagens
    soloImagem     = loadImage("solo.png");
    nuvemImagem    = loadImage("nuvem.png");
    gameOverImagem = loadImage("gameOver.png");
    restartImagem  = loadImage("restart.png");

    o1 = loadImage("obstaculo1.png");
    o2 = loadImage("obstaculo2.png");
    o3 = loadImage("obstaculo3.png");
    o4 = loadImage("obstaculo4.png");
    o5 = loadImage("obstaculo5.png");
    o6 = loadImage("obstaculo6.png");

    //carregar as animações    
    trexCorrendo = loadAnimation("trex1.png","trex2.png","trex3.png");
    trexColidido = loadAnimation("trex_colidido.png");

    //nome do som = loadSound("arquivo.mp3");
    somFim = loadSound("fim.mp3");
    somPulo = loadSound("pulo.mp3");
    somCheckPoint = loadSound("checkPoint.mp3");


    


}


function setup() {
    createCanvas(600, 200);
    //cria a sprite do solo
    soloSprite = createSprite(300, 180, 300, 40);
    soloSprite.addImage(soloImagem);
    soloSprite.velocityX = -3;

    //cria a sprite do trex
    trexSprite = createSprite(50,170,50,50);
    trexSprite.addAnimation("correndo",trexCorrendo);
    trexSprite.addAnimation("parado", trexColidido);
    trexSprite.setCollider("circle",0, 0, 50);
    trexSprite.scale = 0.5;

    //cria a sprite gameOver
    gameOverSprite = createSprite(300, 80, 300, 40);
    gameOverSprite.addImage(gameOverImagem);
    gameOverSprite.scale = 0.5;
    //deixe essa sprite invísivel aqui


    restartSprite = createSprite(300, 120, 300, 40);
    restartSprite.addImage(restartImagem);
    restartSprite.scale = 0.5;
    //deixe essa sprite invisível aqui


    //cria os grupos
    grupoCactos = new Group();
    grupoNuvens = new Group();

}


var aleatorio = 0;

var pontos = 0;
function draw() {
    background("white");

    fill ('black');
    textSize(30);
    text(pontos, 500, 50)
    if(estadoJogo === JOGAR){
        pontos += Math.round(frameCount/60);

        soloSprite.velocityX = -(3 + pontos/100);

        if(pontos % 100 == 0 && pontos >0){
            somCheckPoint.play();
        }

        if(soloSprite.x < 0 ){
            soloSprite.x = 300;
        }

        if(keyDown("space")){
            trexSprite.velocityY = -10;
            somPulo.play()
        }

        gerarCactos();
        criarNuvens();

        if(trexSprite.isTouching(grupoCactos)){
            somFim.play();
            estadoJogo = FIM;
        }
    }
    //verIFica se o estado de jogo é fim
    if(estadoJogo === FIM){
        //condição acima for cumprida, lê os comandos a seguir
         console.log("FIM DE JOGO");
         soloSprite.velocityX = 0;
         grupoNuvens.setVelocityXEach(0);
         grupoCactos.setVelocityXEach(0);
         grupoNuvens.setLifetimeEach(-1);
         grupoCactos.setLifetimeEach(-1);   
         trexSprite.changeAnimation("parado");
         
         //deixe a sprite de gameOver e restart VISÍVEIS


         //adicione o código para verificar se o jogador clicou em restart
        

    }
   
    //dá gravidade para o trex
    trexSprite.velocityY += 0.8;

    //manda o trex colidir com o solo
    trexSprite.collide(soloSprite);


    drawSprites();
}

function criarNuvens(){
    if(frameCount % 30 == 0){
        aleatorio = Math.round(random(0,100));
        nuvemSprite = createSprite(600,aleatorio);
        nuvemSprite.addImage(nuvemImagem);
        nuvemSprite.velocityX = -3;
        nuvemSprite.scale = 0.5;
        trexSprite.depth = nuvemSprite.depth + 1;
        nuvemSprite.lifetime = 250;
        grupoNuvens.add(nuvemSprite)

    };
}
var a = 0;
function gerarCactos(){
    if(frameCount % 60 == 0){
        a = Math.round(random(1,6));
        cactoSprite = createSprite(600, 170);
        cactoSprite.velocityX = soloSprite.velocityX;
        cactoSprite.scale = 0.5;
        
        switch (a) {
            case 1:
                cactoSprite.addImage(o1);
                break;
            case 2:
                cactoSprite.addImage(o2);      
            case 3:
                cactoSprite.addImage(o3);                      
            case 4:
                cactoSprite.addImage(o4);
                break;
            case 5:
                cactoSprite.addImage(o5);      
            case 6:
                cactoSprite.addImage(o6);                    
            default:
                break;
        }
        
        cactoSprite.lifetime = 250;
        grupoCactos.add(cactoSprite)
    }   
}
//é aqui que cria a função
