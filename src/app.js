
var HelloWorldLayer = cc.Layer.extend({
    jugador1:null,    
    jugador2:null,
   // bool1: this.collide,
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
            this.pelota.runAction(cc.sequence(cc.moveBy(60, cc.p(-1090, -150))));
            
        }else{
            this.pelota.runAction(cc.sequence(cc.moveBy(60, cc.p(1967, 200))));
            
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
    moveball: function()
    {
        this.pelota.setPosition(size.width / 2,size.height / 2);
        if(this.random(0,9) > 5){
                        this.pelota.runAction(cc.sequence(cc.moveBy(70, cc.p(-1090, -150))));

                    }else{
                        this.pelota.runAction(cc.sequence(cc.moveBy(70, cc.p(1967, 200))));
                    }
        
    },
    movep2: function()
    {//ver la position de la bola
        
        if(this.pelota.getPositionY() < 300)
        {
            if(this.jugador2.getPositionY() <= 500)
             {
               this.jugador2.setPosition(this.jugador2.getPositionX(), this.jugador2.getPositionY() + 50);
                
             }
            
        }else if(this.jugador2.getPositionY() >= 30){
            this.jugador2.setPosition(this.jugador2.getPositionX(), this.jugador2.getPositionY() - 50);
        }
    }
    ,    
    movePlayer: function(keyCode, event){
        var target = event.getCurrentTarget();
        var size = cc.winSize;

        
        // Boton Up presionado THIS WORKS
        if(keyCode == 38)
        {
           if(target.jugador1.getPositionY() <= 500)
             {
               
               target.jugador1.setPosition(target.jugador1.getPositionX(), target.jugador1.getPositionY() + 50);
                 target.movep2();
                //comprobar limites de pelota
                if(target.pelota.getPositionX() > 700 || target.pelota.getPositionX() < 100)
                {
                    target.moveball();
                }
                 cc.log("Player1 X:" + target.jugador1.getPositionX() + " Y:" + target.jugador1.getPositionY());

                 
              }
        }
        
        // Boton Down presionado THIS WORKS
        if(keyCode == 40)
        {
         if(target.jugador1.getPositionY() >= 30)
            {
                target.jugador1.setPosition(target.jugador1.getPositionX(), target.jugador1.getPositionY() - 50);
                target.movep2();
                //comprobar limites de la pelota
                if(target.pelota.getPositionX() > 700 || target.pelota.getPositionX() < 100)
                {
                    target.moveball();
                 //target.inicializar();   Si esto se hace dibuja todo de nuevo  
                }
                cc.log("Player1 X:" + target.jugador1.getPositionX() + " Y:" + target.jugador1.getPositionY());
            }
        }
        
        //choca jugador1
       /*
            if(cc.rectIntersectsRect(J1Place, ballPlace))
            {
                cc.log("Chocaste");
                //this.inicializar;
              
            }
       
            if(cc.rectIntersectsRect(J2Place, ballPlace))
            {
                cc.log("Choco");
                //this.inicializar;
              
            }
       */
    },
//    collide:function() 
//    {
//        var b = cc.rectIntersectsRect(this.jugador1.getBoundingBox(), this.pelota.getBoundingBox());
//        return b;
//    },
    ctor:function () {
        this._super();
        this.inicializar();
        //aqui escucha el teclado...:D
        cc.eventManager.addListener
        (
            {
			event: cc.EventListener.KEYBOARD,
			onKeyPressed:  this.movePlayer//bola: this.pelota.getBoundingBox()
		    }, 
        this);

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

