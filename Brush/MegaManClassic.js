(function(window){
	var MegaManClassic = function(){
		this.initialize();
	}
	MegaManClassic.prototype = new Hero();
	
	// Public Methods:
	MegaManClassic.prototype.movementState = MovementState.JUMP;
	MegaManClassic.prototype.direction = Direction.RIGHT;
	
	//Used to prevent overriding parent method
	MegaManClassic.prototype.Hero_initialize = MegaManClassic.prototype.initialize;
	
	/**
		initialize method
		@method initialize
	*/
	MegaManClassic.prototype.initialize = function(){
		this.Hero_initialize();
	}
	
	/**
		Sets the loaded image for the sprite sheet
		and sets up the display Object.
		@method setImage
	*/
	MegaManClassic.prototype.setImage = function(image){
		var spriteSheet = new SpriteSheet({
			images: [image],
			frames: {width: 58, height: 60},
			animations:{
				standRight: {
					//The double zero frames seems to be needed
					//to get it to go to next.
					frames: [0,0],
					next: 'blinkRight',
					frequency: 30
				},
				standLeft: {
					//The double zero frames seems to be needed
					//to get it to go to next.
					frames: [13,13],
					next: 'blinkLeft',
					frequency: 30
				},
				blinkRight: {
					frames: [1,1],
					next: 'standRight'
				},
				blinkLeft: {
					frames: [12,12],
					next: 'standLeft'
				},
				startRunRight: {
					frames: [2,3],
					next: 'runRight',
					frequency: 3
				},
				startRunLeft: {
					frames : [11, 10],
					next: 'runLeft',
					frequency: 3
				},
				runRight: {
					frames: [4, 5, 4, 3],
					next: 'runRight',
					frequency: 3
				},
				runLeft: {
					frames: [9,10,9,8],
					next: 'runLeft',
					frequency: 3
				},
				jumpRight: {
					frames: [6, 6],
					next: 'jumpRight'
				},
				jumpLeft: {
					frames: [7,7],
					next: 'jumpLeft'
				}
			}
		});
		var ani = new BitmapAnimation(spriteSheet);
		this.aabb = new AABoundingBox(0,0,20, 28);
		this.displayObject = ani;	
		this.displayObject.gotoAndPlay('jumpRight');
		this.positionDisplayObject(0,0);
		this.positionAABB(29, 31);
	}
	
	//Use to prevent overriding parent method
	MegaManClassic.prototype.Hero_tick = MegaManClassic.prototype.tick;
	
	/**
		tick method
		@method tick
	*/
	MegaManClassic.prototype.tick = function(){
		this.Hero_tick();
		this.determineAnimation();
	}
	
	/**
		Determines the current correct animation
		based off the deltaX and deltaY
		@method determineAnimation
	*/
	MegaManClassic.prototype.determineAnimation = function(){
		if(this.inAir){
			if(this.movementState != MovementState.JUMP){
				if(this.direction == Direction.RIGHT){
					this.displayObject.gotoAndPlay('jumpRight');
				}
				else{
					this.displayObject.gotoAndPlay('jumpLeft');
				}
				this.movementState = MovementState.JUMP;
			}
		}
		else{
			if(this.dx > 0){
				if(this.movementState != MovementState.RUN ||
					this.direction == Direction.LEFT){
					this.displayObject.gotoAndPlay('startRunRight');
					this.movementState = MovementState.RUN;
				}
			}
			else if(this.dx < 0){
				if(this.movementState != MovementState.RUN ||
					this.direction == Direction.RIGHT){
					this.displayObject.gotoAndPlay('startRunLeft');
					this.movementState = MovementState.RUN;
				}
			}
			else{
				if(this.movementState != MovementState.STAND){
					if(this.direction == Direction.RIGHT){
						this.displayObject.gotoAndPlay('standRight');
					}
					else{
						this.displayObject.gotoAndPlay('standLeft');
					}
					this.movementState = MovementState.STAND;
				}
			}
		}
		if(this.dx > 0){
			this.direction = Direction.RIGHT;
		}
		else if(this.dx < 0){
			this.direction = Direction.LEFT;
		}
	}
	window.MegaManClassic = MegaManClassic;
}(window));