
var HelloWorldLayer = cc.Layer.extend({
    jugador1:null,    
    jugador2:null,    
    pelota:null,    
    puntuacion1:null,
    puntuacion2:null,
    inicializar:function(){
        var size = cc.winSize;
        var color = cc.color(100,100,100);
        //este sera el jugador
        this.jugador1 =  new cc.DrawNode();
        this.jugador1.drawRect(cc.p(0,0),cc.p(20,100),color,3);
        this.jugador1.setPosition(size.width * 0.1,size.height / 2);
        this.addChild(this.jugador1, 1);
        //Este sera el bot
        this.jugador2 =  new cc.DrawNode();
        this.jugador2.drawRect(cc.p(0,0),cc.p(20,100),color,3);
        this.jugador2.setPosition(size.width -(size.width * 0.1),size.height / 2);
        this.addChild(this.jugador2, 1);        

        var lineaDivisoria =  new cc.DrawNode();
        lineaDivisoria.drawSegment(cc.p(size.width/2,0),cc.p(size.width/2,size.height),3,color);
        this.addChild(lineaDivisoria,0);
        //se creacon un tag de -1
        this.pelota =  new cc.DrawNode();
        this.pelota.drawCircle(cc.p(0,0),5,0,100,false,10,color);
        this.pelota.setPosition(size.width / 2,size.height / 2);
        this.addChild(this.pelota, 1);
        if(this.random(0,9) > 5){
            this.pelota.runAction(cc.sequence(cc.moveBy(70, cc.p(-1090, -150))));
            
        }else{
            this.pelota.runAction(cc.sequence(cc.moveBy(70, cc.p(1967, 200))));
            
        }
        
        
        this.puntuacion1 = new cc.LabelTTF("0","Arial",24);
        this.puntuacion1.setPosition(size.width * 0.4, size.height - (size.height * 0.10));
        this.addChild(this.puntuacion1,0);
        
        this.puntuacion2 = new cc.LabelTTF("0","Arial",24);
        this.puntuacion2.setPosition(size.width - (size.width * 0.4), size.height - (size.height * 0.10));
        this.addChild(this.puntuacion2,0);
        
    },
    random: function getRandomInt(min, max) {
    	return Math.floor(Math.random() * (max - min + 1)) + min;
	},
    
//    moveBall: function(){
//        
//         this.pelota.runAction(cc.sequence(cc.moveBy(20, cc.p(-550, -12))));
//
//    },
    movePlayer: function(keyCode, event){
        
        var target = event.getCurrentTarget();
        var size = cc.winSize;

        // Boton Up presionado THIS WORKS
        if(keyCode == 38)
        {
           if(target.jugador1.getPositionY() <= 500)
             {
               
               target.jugador1.setPosition(target.jugador1.getPositionX(), target.jugador1.getPositionY() + 50);
            //comprobar limites
            cc.log("Player1 X:" + target.jugador1.getPositionX() + " Y:" + target.jugador1.getPositionY());
               //cc.log("Bola X:" + target.pelota.getPositionX() + " Y:" + target.pelota.getPositionY());
             }
               
        }
        
        // Boton Down presionado THIS WORKS
        if(keyCode == 40)
        {
         if(target.jugador1.getPositionY() >= 30)
            {
                target.jugador1.setPosition(target.jugador1.getPositionX(), target.jugador1.getPositionY() - 50);
            //comprobar limites
            cc.log("Player1 X:" + target.jugador1.getPositionX() + " Y:" + target.jugador1.getPositionY());
            
            }
        }
        
        //choca jugador1
        var J1Place = target.jugador1.getBoundingBox();
        for(var ball of target.pelota){
            var ballPlace = ball.getBoundingBox();
            if(cc.rectIntersectsRect(ballPlace,J1Place) == true){
                
              cc.log("Colision weje");
            }
        }
        
        //choca jugador2
        var J2Place = target.jugador2.getBoundingBox();
        for(var ball of target.pelota){
            var ballPlace = ball.getBoundingBox();
            if(cc.rectIntersectsRect(ballPlace,J2Place) == true){
                
              cc.log("Colision weje");
            }
        }
    },
    ctor:function () {
        this._super();
        this.inicializar();
        //aqui escucha el teclado...:D
        cc.eventManager.addListener({
			event: cc.EventListener.KEYBOARD,
			onKeyPressed:  this.movePlayer
		}, this);

        return true;
    }
});

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});

