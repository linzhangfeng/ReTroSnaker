/**
 * Created by chaoge on 15/6/23.
 */
var SnakeGame = cc.Node.extend({
    _type:null,
    ctor:function(type){
        this._super();
        this._type = type;
        var sp = cc.Sprite.create();
        //1蛇头 2身体  3食物
        switch (this._type){
            case 1:
                sp = cc.Sprite.create(res.snakeHead);
                break;
            case 2:
                sp = cc.Sprite.create(res.snakeBody);
                break;
            case 3:
                sp = cc.Sprite.create(res.snakeFood);
                break;
            default :break;
        }
        sp.setAnchorPoint(0,0);
        sp.setPosition(0,0);
        this.addChild(sp);
    }
});

SnakeGame.create = function(arg){
    var snakeGame = new SnakeGame(arg);
    return snakeGame;
};
