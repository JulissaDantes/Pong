var HelloWorldLayer = cc.Layer.extend({
    jugador1:null,    
    jugador2:null,    
    pelota:null,    
    puntuacion1:null,
    puntuacion2:null,
    speed:null,
    
    random: function getRandomInt(min, max) {
    	return Math.floor(Math.random() * (max - min + 1)) + min;
	},
    
    inicializar:function(){
        this.speed = 5;
        var size = cc.winSize;
        var color = cc.color(100,100,100);

        this.jugador1 =  new cc.DrawNode();
        this.jugador1.drawRect(cc.p(0,0),cc.p(20,100),color,3);
        this.jugador1.setPosition(size.width * 0.1,size.height / 2);
        this.addChild(this.jugador1, 1);

        this.jugador2 =  new cc.DrawNode();
        this.jugador2.drawRect(cc.p(0,0),cc.p(20,100),color,3);
        this.jugador2.setPosition(size.width -(size.width * 0.1),size.height / 2);
        this.addChild(this.jugador2, 1);        

        var lineaDivisoria =  new cc.DrawNode();
        lineaDivisoria.drawSegment(cc.p(size.width/2,0),cc.p(size.width/2,size.height),3,color);
        this.addChild(lineaDivisoria,0);
        
        this.pelota =  new cc.DrawNode();
        this.pelota.drawCircle(cc.p(0,0),5,0,100,false,10,color);
        this.pelota.setPosition(size.width / 2, size.height / 2);
        this.addChild(this.pelota, 1);
        var moveto = cc.moveTo(this.speed, -10, this.random(0, size.height));
        this.pelota.runAction(moveto);

        this.puntuacion1 = new cc.LabelTTF("0","Arial",24);
        this.puntuacion1.setPosition(size.width * 0.4, size.height - (size.height * 0.10));
        this.addChild(this.puntuacion1,0);
        
        this.puntuacion2 = new cc.LabelTTF("0","Arial",24);
        this.puntuacion2.setPosition(size.width - (size.width * 0.4), size.height - (size.height * 0.10));
        this.addChild(this.puntuacion2,0);
    },
    
    mover : function(key, event){
        var target = event.getCurrentTarget();
        var size = cc.winSize;
        switch(key){
            case 38:
                target.jugador1.y += 50;
                break;
            case 40:
                target.jugador1.y -= 50;
                break;
        }
        
        target.jugador2.setPosition(this.jugador2.getPositionX(), this.pelota.getPositionY() - 50);
    },
    
    startPelota : function(){
        var curScene = cc.director.getRunningScene();
        var allChildren = curScene.getChildren();
        var moveto = cc.moveTo(allChildren[0].speed, -10, allChildren[0].random(0, cc.winSize.height));
        allChildren[0].pelota.stopAllActions();
        allChildren[0].pelota.runAction(moveto);
        cc.director.resume();
    },
    
    collision : function(){
        if( Math.abs(this.pelota.x - this.jugador1.x) <= 10 && Math.abs(this.pelota.y - this.jugador1.y) <= 100){
            var moveto = cc.moveTo(this.speed, cc.winSize.width+10, this.random(0, cc.winSize.height));
            this.pelota.stopAllActions();
            this.pelota.runAction(moveto);
        }
        if( Math.abs(this.pelota.x - this.jugador2.x) <= 10 &&  Math.abs(this.pelota.y - this.jugador2.y) <= 100){
            var moveto = cc.moveTo(this.speed, -10, this.random(0, cc.winSize.height));
            this.pelota.stopAllActions();
            this.pelota.runAction(moveto);
        }
    },
    
    perder : function(){
        if(this.pelota.x <= cc.winSize.width*0.1 - 10){
            var num = parseInt(this.puntuacion2.string);
            num++;
            this.puntuacion2.string = num;
            this.pelota.setPosition(cc.winSize.width / 2, cc.winSize.height / 2);
            cc.director.pause();
            setTimeout(this.startPelota, 2000);
//            /Punto para bot
//            this.p2p = this.p2p + 1;
//            this.puntuacion2.setString(this.p2p.toString());
            //this.puntuacion2 = cc.LabelTTF(this.p2p.toString(),"Arial",24)
            //this.puntuacion2._originalText = this.p2p.toString();
            //cc.log("puntuacion 2: " + this.puntuacion2._updateString(this.p2p.toString()));
        }
        if(this.pelota.x >= cc.winSize.width - (cc.winSize.width * 0.1) + 10){
            var num = parseInt(this.puntuacion1.string);
            num++;
            this.puntuacion1.string = num;
            this.pelota.setPosition(cc.winSize.width / 2, cc.winSize.height / 2);
            cc.director.pause();
            setTimeout(this.startPelota, 2000);
            // this.puntuacion1 = cc.LabelTTF(this.p1p.toString(),"Arial",24)
            //this.puntuacion1._originalText = this.p1p.toString();//this works
            //cc.log("puntuacion 2: " + this.puntuacion1._updateString(this.p1p.toString()));
        }
    },
    
    ctor:function () {
        this._super();
        this.inicializar();
        
        cc.eventManager.addListener(
        {
            event: cc.EventListener.KEYBOARD,
            onKeyPressed: this.mover
        }, this);
        
        this.schedule(this.collision, 1/60);
        this.schedule(this.perder, 1/60);
        
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
