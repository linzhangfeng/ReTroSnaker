/**
 * Created by chaoge on 15/6/19.
 */
/**
 * Created by chaoge on 15/6/19.
 */
/**
 * Created by chaoge on 15/6/19.
 */

var GameLayer = cc.Layer.extend({
    sprite:null,
    size:null,
    _head:null,
    _food:null,
    _snakeBody:null,
    score:null,
    m_score:null,
    ctor:function () {
        this._super();
        director.resume();

        //播放背景音乐
        cc.audioEngine.playMusic(res.bg_mp3,true);

        size = cc.winSize;
        cc.eventManager.addListener({
            event:cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches:false,
            onTouchBegan:this.onTouchBegan,
            onTouchMoved:this.onTouchMoved,
            onTouchEnded:this.onTouchEnded
        },this);

        var goBack = new cc.LabelTTF("GO BACK", "Arial", 38);
        var backMenu = new cc.MenuItemLabel(goBack,function(){
            cc.director.runScene(new MenuGame());
        });
        backMenu.x = size.width / 2;
        backMenu.y = size.height/2-450;
        var menuBack = new cc.Menu(backMenu);
        menuBack.x = 0;
        menuBack.y = 0;
        this.addChild(menuBack, 2);


        // add "HelloWorld" splash screen"
        this.sprite = new cc.Sprite(res.bg);
        this.sprite.attr({
            x: size.width / 2,
            y: size.height / 2
        });
        this.addChild(this.sprite, 0);
        this.setAnchorPoint(0.5,0.5);


        //添加九宫格，添加背景
        var lc = cc.LayerColor.create(cc.color(175,175,175,75),630,630);
        lc.setPosition(cc.p(5,300));
        lc.setAnchorPoint(cc.p(0,0));
        lc.setTag(111);
        this.addChild(lc);
        //绘画九宫格
        for(var i = 0;i <= 10; i++){
            //横线
            var node = cc.DrawNode.create();
            node.drawSegment(cc.p(0,i*63),cc.p(630,i*63),1,cc.color(1,1,1,255));
            lc.addChild(node);
            //竖线
            var node1 = cc.DrawNode.create();
            node1.drawSegment(cc.p(i*63,0),cc.p(i*63,630),1,cc.color(1,1,1,255));
            lc.addChild(node1);
        }

        //添加蛇头
        this._head = new SnakeGame(1);
        this._head.setScale(0.9);
        this._head.now_row = Math.round(Math.random()*9);
        this._head.now_col = Math.round(Math.random()*9);
        this._head.setPosition(cc.p(this._head.now_col*63,this._head.now_row*63));
        lc.addChild(this._head,3);

        //添加食物
        this._food = new SnakeGame(3);
        this._food.setScale(0.9);
        this._food.now_row = Math.round(Math.random()*9);
        this._food.now_col = Math.round(Math.random()*9);
        this._food.setPosition(cc.p(this._food.now_col*63,this._food.now_row*63));
        lc.addChild(this._food,3);

        //添加蛇头移动
        this.schedule(this.updateHead,0.5);
        dir = SNAKE_DIR.RIGHT;

        //清空数组
        SNAKE_BODY = [];

        //添加分数
        score = new cc.LabelTTF("分数:0", "Arial", 50);
        score.setPosition(cc.p(winSize.width/2,winSize.height - 130));
        this.addChild(score,4);

        //温馨小提示
        var tishi = new cc.LabelTTF("温馨小提示：该游戏不能反走噢！", "Arial", 40);
        tishi.setPosition(cc.p(winSize.width/2,winSize.height/2 - 350));
        this.addChild(tishi,4);



    },
    updateHead:function(){
        //蛇头移动
        switch (dir){
            case SNAKE_DIR.UP:
                this._head.now_row = this._head.now_row + 1;
                break;
            case SNAKE_DIR.DOWN:
                this._head.now_row = this._head.now_row - 1;
                break;
            case SNAKE_DIR.LEFT:
                this._head.now_col = this._head.now_col - 1;
                break;
            case SNAKE_DIR.RIGHT:
                this._head.now_col = this._head.now_col + 1;
                break;
            default :break;
        }
        this._head.setPosition(cc.p(this._head.now_col*63,this._head.now_row*63));

        //走出边界，游戏结束
        if(this._head.now_col < 0 || this._head.now_row < 0 || this._head.now_col >= 10 || this._head.now_row >= 10){
            this.onGameOver();
        }

        //检测蛇是否吃到食物
        if(this._head.now_col==this._food.now_col && this._head.now_row==this._food.now_row){
            //播放音效
            cc.audioEngine.playEffect(res.bg_effect);
            cc.log("蛇吃到了食物！");
            //添加分数
            this.m_score += 100;
            score.setString("分数:"+this.m_score);
            //重置食物的位置
            this._food.now_row = Math.round(Math.random()*9);
            this._food.now_col = Math.round(Math.random()*9);
            this._food.setPosition(cc.p(this._food.now_col*63,this._food.now_row*63));

            //添加蛇的身体
            this._snakeBody = SnakeGame.create(2);
            this._snakeBody.setScale(0.9);
            if(SNAKE_BODY.length == 0 || SNAKE_BODY.length == null){
                switch (dir){
                    case SNAKE_DIR.UP:
                        this._snakeBody.now_row = this._head.now_row - 1;
                        this._snakeBody.now_col = this._head.now_col;
                        break;
                    case SNAKE_DIR.DOWN:
                        this._snakeBody.now_row = this._head.now_row + 1;
                        this._snakeBody.now_col = this._head.now_col;
                        break;
                    case SNAKE_DIR.LEFT:
                        this._snakeBody.now_row = this._head.now_row;
                        this._snakeBody.now_col = this._head.now_col + 1;
                        break;
                    case SNAKE_DIR.RIGHT:
                        this._snakeBody.now_row = this._head.now_row;
                        this._snakeBody.now_col = this._head.now_col - 1;
                        break;
                    default :break;
                }
                cc.log("里面没有身体，添加一个！");

            }else{
                switch (dir){
                    case SNAKE_DIR.UP:
                        this._snakeBody.now_row = this._snakeBody.now_row - 1;
                        this._snakeBody.now_col = this._snakeBody.now_col;
                        break;
                    case SNAKE_DIR.DOWN:
                        this._snakeBody.now_row = this._snakeBody.now_row + 1;
                        this._snakeBody.now_col = this._snakeBody.now_col;
                        break;
                    case SNAKE_DIR.LEFT:
                        this._snakeBody.now_row = this._snakeBody.now_row;
                        this._snakeBody.now_col = this._snakeBody.now_col + 1;
                        break;
                    case SNAKE_DIR.RIGHT:
                        this._snakeBody.now_row = this._snakeBody.now_row;
                        this._snakeBody.now_col = this._snakeBody.now_col - 1;
                        break;
                    default :break;
                }
                cc.log("里面有身体，添加一个！");
            }
            //添加到数组中去
            SNAKE_BODY.push(this._snakeBody);
            this.getChildByTag(111).addChild(this._snakeBody,2);
            this._snakeBody.setPosition(cc.p(this._snakeBody.now_col*63,this._snakeBody.now_row*63));
        }

        //移动所有的身体
        if(SNAKE_BODY.length != 0){
            var Snode = null;
            for(var i = SNAKE_BODY.length - 1; i >= 0; i--){
                Snode = SNAKE_BODY[i];
                if(i == 0){
                    switch (dir){
                        case SNAKE_DIR.UP:
                            Snode.now_row = this._head.now_row - 1;
                            Snode.now_col = this._head.now_col;
                            break;
                        case SNAKE_DIR.DOWN:
                            Snode.now_row = this._head.now_row + 1;
                            Snode.now_col = this._head.now_col;
                            break;
                        case SNAKE_DIR.LEFT:
                            Snode.now_row = this._head.now_row;
                            Snode.now_col = this._head.now_col + 1;
                            break;
                        case SNAKE_DIR.RIGHT:
                            Snode.now_row = this._head.now_row;
                            Snode.now_col = this._head.now_col - 1;
                            break;
                        default :break;
                    }
                }else{
                    Snode.now_col = SNAKE_BODY[i-1].now_col;
                    Snode.now_row = SNAKE_BODY[i-1].now_row;
                }
                Snode.setPosition(cc.p(Snode.now_col*63,Snode.now_row*63));
            }
        }

        //蛇头碰到蛇尾，游戏结束
        if(SNAKE_BODY.length != 0){
            for(var i = SNAKE_BODY.length - 1; i >= 0; i--){
                if(this._head.now_col == SNAKE_BODY[i].now_col && this._head.now_row == SNAKE_BODY[i].now_row){
                    this.onGameOver();
                }
            }
        }

    },
    onGameOver:function(){
        director.pause();
        var gameOver = new cc.LabelTTF("Game Over!", "Arial", 50);
        var over = new cc.MenuItemLabel(gameOver,function(){
            window.location.href = "http://h5.9miao.com";
        });
        over.setPosition(cc.p(size.width/2,size.height/2));
        var menu = new cc.Menu(over);
        menu.x = 0;
        menu.y = 0;
        this.addChild(menu, 5);

    },
    onTouchBegan:function(touch,event){
        //cc.log("你点击了当前的屏幕！");
        var target = event.getCurrentTarget();
        var mx = Math.abs((touch.getLocation().x - 5) - target._head.now_col*63);
        var my = Math.abs((touch.getLocation().y - 300) - target._head.now_row*63);
        if(mx > my){//左右移动
            if((touch.getLocation().x - 5) > target._head.now_col*63){
                //向右移动
                dir = SNAKE_DIR.RIGHT;
            }else{
                //向左移动
                dir = SNAKE_DIR.LEFT;
            }

        }else{//上下移动
            if((touch.getLocation().y - 300) > target._head.now_row*63){
                //向上移动
                dir = SNAKE_DIR.UP;
            }else{
                //向下移动
                dir = SNAKE_DIR.DOWN;
            }

        }
    },
    onTouchMoved:function(touch,event){

    },
    onTouchEnded:function(touch,event){

    }

});
var GameScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new GameLayer();
        this.addChild(layer);
    }
});
