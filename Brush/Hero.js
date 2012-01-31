/*
	Hero by Logan Wilkerson
*/
(function(window){
	/**
		Hero is a subclass of Actor that contains
		some useful base code and logic for creating
		a player characters. (Hero movements tend to be 
		the most logical if they're made first and are
		the first object in the phyObjects)
		The hero is set up to be able to jump and land
		on both boundaries and structures. If you decide
		to extend the Hero class it will be useful to
		override the following methods:
		
		initialize: To create your own hero you will
		probably not want to use the parent initialize 
		as is. You will want to make your own to set up
		the aabb and DisplayObject. However, remember to
		add this object to the phyObject and tickObject
		arrays as well as to BrushEvent
		
		Delta Properties: You can change the numerous
		Delta values to help your hero move slower or faster.
		Note that collisions are glitchy at high speeds as
		the AABoundingBox does not current preform sweeping
		collisions.
		
		Collide: It might be useful to call Hero's collide first
		before doing your own collide work. Collide handles both
		Boundaries and Structures.
		
		onKey<Up, Down>: Currently uses Up, Left, and Right for
		movement, but you can easily call the parent method and
		then check for any other key.
		
	*/
	var Hero = function(){
		this.initialize();
	}
	
	Hero.prototype = new Actor();
	
	// Public Properties:
	Hero.prototype.type = 'hero';
	
	Hero.prototype.leftHeld = false;
	Hero.prototype.rightHeld = false;
	Hero.prototype.jumpHit = false;
	
	Hero.prototype.runDelta = 6;
	Hero.prototype.jumpDelta = 15;
	Hero.prototype.initialJumpDelta = 0;
	
	Hero.prototype.maxDeltaX = 6;
	Hero.prototype.maxDeltaY = 12;
	
	Hero.prototype.jumpStartTime = 0;
	Hero.prototype.inAir = false;
	
	Hero.prototype.curPlatform = null;
	Hero.prototype.onPlatform = false;
	
	//Used to avoid overriding parent initialize function
	Hero.prototype.Actor_initialize = Hero.prototype.initialize;
	
	/**
		Initialize method
		@method initialize
	*/
	Hero.prototype.initialize = function(){
		this.Actor_initialize();
		
		this.aabb = new AABoundingBox(0,0, 10, 15);
		
		var g = new Graphics();
		g.beginStroke(Graphics.getRGB(0,0,0));
		g.drawRect(0,0, 20, 30);
		this.displayObject = new Shape(g);
		
		this.positionDisplayObject(0,0);
		this.positionAABB(10, 15);
	}
	
	/**
		Overides PhysicalGameObject
		attach method;
	*/
	Hero.prototype.attach = function(){	
		BrushEvent.addListener('keyUp', this);
		BrushEvent.addListener('keyDown', this);
		
		this.addToPhyObjects();
		this.addToTickObjects();
	}
	
	/**
		Overrides Actor tick method
		@method tick
	*/
	Hero.prototype.tick = function(){
		this.applyPhysics();
		this.move(this.dx, this.dy);
		this.onPlatform = false;
		this.checkCollisions();
		if(!this.onPlatform){
			this.curPlatform = null;
		}
	}
	
	/**
		Applies game physics to the object to determine dx and dy
		@method applyPhysics
	*/
	Hero.prototype.applyPhysics = function(){
		if(this.rightHeld){
			this.dx = this.runDelta;
		}
		else if(this.leftHeld){
			this.dx = -this.runDelta;
		}
		else{
			this.dx = 0;
		}		
		if(this.curPlatform){
			if(this.curPlatform.dx){
				this.move(this.curPlatform.dx, 0);
			}
		}
		
		if(!this.inAir){
			if(!this.curPlatform){
				this.inAir = true;
				this.jumpStartTime = Ticker.getTime();
				this.initialJumpDelta = 0;
			}
			else if(this.jumpHit){
				console.log('hello');
				this.jumpHit = false;
				this.inAir = true;
				this.jumpStartTime = Ticker.getTime();
				this.initialJumpDelta = this.jumpDelta;
				this.onPlatform = false;
				this.curPlatform = false;
			}
			else{
				this.dy = 0;
			}
		}
		if(this.inAir){
			if(this.curPlatform){
				this.inAir = false;
				this.dy = 0;
			}
			else{
				this.jumpHit = false;
				this.dy = Math.min(9.81 * (Ticker.getTime() - this.jumpStartTime)/500 - this.initialJumpDelta, this.maxDeltaY);
			}
		}
	}
	
	/**
		Overrides the PhysicalGameObject collide method
		@method collide
	*/
	Hero.prototype.collide = function(phyObject, rVector){
		switch(phyObject.type){
			case 'boundary':
			case 'structure':
				console.log(rVector);
				//Land on platform
				if(rVector[1] < 0 && this.dy >= 0){
					this.curPlatform = phyObject;
				}
				if(rVector[1] > 0 && this.dy < 0){
					this.jumpStartTime = Ticker.getTime();
					this.initialJumpDelta = 0;
				}
				if(phyObject == this.curPlatform){
					this.onPlatform = true;
				}
				this.move(rVector[0], rVector[1]);
			break;
		}
	}
	
	/**
		Handles a keyDown event
		@method onKeyDown
		@param {Event} the keyDown event
	*/
	Hero.prototype.onKeyDown = function(e){
		if(!e){ var e = window.event; }
		switch(e.keyCode){
			case BrushEvent.KEYCODE_LEFT:
				this.leftHeld = true;
			break;
			case BrushEvent.KEYCODE_RIGHT:
				this.rightHeld = true;
			break;
			case BrushEvent.KEYCODE_UP:
				this.jumpHit = true;
			break;
			case BrushEvent.KEYCODE_DOWN:
			break;
		}
	}
	
	/**
		Handles a keyUp event
		@method onKeyUp
		@param {Event} the keyUp event
	*/
	Hero.prototype.onKeyUp = function(e){
		switch(e.keyCode){
			case BrushEvent.KEYCODE_LEFT:
				this.leftHeld = false;
			break;
			case BrushEvent.KEYCODE_RIGHT:
				this.rightHeld = false;
			break;
			case BrushEvent.KEYCODE_UP:
			break;
			case BrushEvent.KEYCODE_DOWN:
			break;
		}
	}
	
	window.Hero = Hero;
}(window));