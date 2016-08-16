/**
 * Splash Scene - the opening scene of the game.
 * <p>
 * It cope with the navigation logic and the logos display.
 * </p>
 * 
 * @class
 * @extends cc.Scene
 */
var SplashScene = cc.Scene.extend(/** @lends SplashScene# */{

	/**
	 * Constructor of cc.Scene
	 */
	_className: "SplashScene",

	ctor: function () {
		cc.log("enter=SplashScene");
		this._super();
		this.init();
		var open = new GameOpeningLayer();
		open.bake();
		this.addChild(open, 1, 1);
		setTimeout(function(){
			cc.log("enter=GameMenuLayer");
			var layer = new GameMenuLayer();
			
			if(cc.sys.localStorage.getItem("username")){
				cc.log("enter=WelcomeScene");
				cc.director.runScene(new WelcomeScene());

			} else {
				cc.log("enter=InfoScene");
				cc.director.runScene(new InfoScene());

			}
		}.bind(this), 3000);
	}
});
