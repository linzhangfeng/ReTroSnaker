/**
 * Created by chaoge on 15/6/19.
 */
/**
 * Created by chaoge on 15/6/19.
 */

var AboutLayer = cc.Layer.extend({
    sprite:null,
    size:null,
    ctor:function () {
        this._super();

        size = cc.winSize;

        var labjiumiao = new cc.LabelTTF("9秒课堂", "Arial", 38);
        var ketang = new cc.MenuItemLabel(labjiumiao,function(){
            window.location.href = "http://www.9miaoketang.com";
        });
        ketang.setPosition(cc.p(size.width/2,size.height-200));

        var h5kaifa = new cc.LabelTTF("COCOS2D-HTML5 游戏开发", "Arial", 38);
        var H5 = new cc.MenuItemLabel(h5kaifa,function(){
            window.location.href = "http://h5.9miao.com";
        });
        H5.setPosition(cc.p(size.width/2,size.height/2));


        var menu = new cc.Menu(ketang,H5);
        menu.x = 0;
        menu.y = 0;
        this.addChild(menu, 1);


        var goBack = new cc.LabelTTF("GO BACK", "Arial", 38);
        var backMenu = new cc.MenuItemLabel(goBack,function(){
            cc.director.runScene(new MenuGame());
        });
        backMenu.x = size.width / 2;
        backMenu.y = size.height/2-300;
        var menuBack = new cc.Menu(backMenu);
        menuBack.x = 0;
        menuBack.y = 0;
        this.addChild(menuBack, 2);

        // add "HelloWorld" splash screen"
        this.sprite = new cc.Sprite(res.helpGame);
        this.sprite.attr({
            x: size.width / 2,
            y: size.height / 2
        });
        this.addChild(this.sprite, 0);


    }
});
var AboutGame = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new AboutLayer();
        this.addChild(layer);
    }
});
