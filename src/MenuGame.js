/**
 * Created by chaoge on 15/6/19.
 */

var MenuLayer = cc.Layer.extend({
    sprite:null,
    helloLabel:null,
    size:null,
    ctor:function () {
        this._super();

        size = cc.winSize;

        //开始按钮
        var start = new cc.MenuItemImage(
            res.start,
            res.start,
            function () {
                cc.log("Menu is clicked!");
                cc.director.runScene(new GameScene());

            }, this);
        start.attr({
            x: size.width/2,
            y: size.height/2-120,
            anchorX: 0.5,
            anchorY: 0.5
        });

        //关于按钮
        var about = new cc.MenuItemImage(
            res.about,
            res.about,
            function () {
                cc.log("Menu is clicked!");
                cc.director.runScene(new AboutGame());

            }, this);
        about.attr({
            x: size.width/2,
            y: size.height/2-280,
            anchorX: 0.5,
            anchorY: 0.5
        });

        var menu = new cc.Menu(start,about);
        menu.x = 0;
        menu.y = 0;
        this.addChild(menu, 1);


        //滚动菜单
        helloLabel = new cc.LabelTTF("看谁最长", "Arial", 38);
        // position the label on the center of the screen
        helloLabel.x = size.width / 2;
        helloLabel.y = size.height-100;
        // add the label as a child to this layer
        this.addChild(helloLabel, 5);

        // add "HelloWorld" splash screen"
        this.sprite = new cc.Sprite(res.zhuye);
        this.sprite.attr({
            x: size.width / 2,
            y: size.height / 2
        });
        this.addChild(this.sprite, 0);

        this.schedule(this.LabelMove,0.2);
    },
    LabelMove : function(){
        helloLabel.setPositionX(helloLabel.getPositionX()-10);
        if(helloLabel.getPositionX() <= -50){
            helloLabel.setPositionX(size.width);
        }

    }
});
var MenuGame = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new MenuLayer();
        this.addChild(layer);
    }
});
