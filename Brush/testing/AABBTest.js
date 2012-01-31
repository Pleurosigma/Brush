(function(window){
	var AABBTest = function(stage){
		this.initialize(stage);
	}
	
	var p = AABBTest.prototype;
	
	var g = new Graphics();
	g.beginStroke(Graphics.getRGB(0,0,0));
	g.drawRect(0,0, 100, 100);
	var g2 = new Graphics();
	g2.beginStroke(Graphics.getRGB(0,0,0));
	g2.drawRect(0,0,40, 4);
	p.do1 = new Shape(g);
	p.aabb1;
	p.do2 = new Shape(g2);
	p.aabb2;
	p.aabb3;
	
	p.dX = 0;
	p.dY = 0;
	
	p.stage;
	
	
	p.initialize = function(stage){
		this.stage = stage;
	}
	
	p.startGame = function(){
		this.aabb1 = new AABoundingBox(50, 50, 50, 50);
		this.aabb2 = new AABoundingBox(220,202, 20, 2);
		this.aabb3 = new AABoundingBox(300, 402, 300, 2);
		this.aabb4 = new AABoundingBox(-1, 200, 1, 200);
		this.do2.x = 200;
		this.do2.y = 200;
		this.stage.addChild(this.do1);
		this.stage.addChild(this.do2);
		BrushEvent.attachToDOM();
		BrushEvent.addListener('keyUp', this);
		BrushEvent.addListener('keyDown', this);
		Ticker.addListener(this);
	}
	
	p.tick = function(){
		this.move(this.dX, this.dY);
		var a = this.aabb1.checkForCollision(this.aabb2, true);
		if(a){
			this.move(a[0], a[1]);
		}
		console.log(this.aabb3);
		var b = this.aabb1.checkForCollision(this.aabb3, true);
		if(b){
			this.move(b[0], b[1]);
		}
		
		var c = this.aabb1.checkForCollision(this.aabb4, true);
		if(c){
			this.move(c[0], c[1]);
		}
		this.stage.update();
	}
	
	p.move = function(dX, dY){
		this.do1.x += dX;
		this.do1.y += dY;
		this.aabb1.x += dX;
		this.aabb1.y += dY;
	}
	
	p.onKeyDown = function(){
		if(!e){ var e = window.event; }
		switch(e.keyCode){
			case BrushEvent.KEYCODE_UP:
				this.dY = -10;
			break;
			case BrushEvent.KEYCODE_DOWN:
				this.dY = 10;
			break;
			case BrushEvent.KEYCODE_LEFT:
				this.dX = -10;
			break;
			case BrushEvent.KEYCODE_RIGHT:
				this.dX = 10;
			break;
		}
	}
	
	p.onKeyUp = function(){
		if(!e){ var e = window.event; }
		switch(e.keyCode){
			case BrushEvent.KEYCODE_UP:
				this.dY = 0;
			break;
			case BrushEvent.KEYCODE_DOWN:
				this.dY = 0;
			break;
			case BrushEvent.KEYCODE_LEFT:
				this.dX = 0;
			break;
			case BrushEvent.KEYCODE_RIGHT:
				this.dX = 0;
			break;
		}
	}
	
	window.AABBTest = AABBTest;
}(window));