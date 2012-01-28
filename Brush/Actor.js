/*
	Actor by Logan Wilkerson
*/
(function(window){
	/**
		Actor is an abstract class. It should be used
		for any object that acts on the stage. This 
		includes the player, moving enemies, etc.
	*/
	var Actor = function(){
		this.initialize();
	}
	
	Actor.prototype = new PhysicalGameObject();
	
	// Public Properties:
	
	/**
		The DisplayObject for the actor. This is the 
		DisplayObject that should be used to render
		the actor to the stage. Note that this property
		should not be used for any physical interactions.
		@property displayObject
		@type DisplayObject
		@default null
	*/
	Actor.prototype.displayObject = null;
	
	/**
		The current x velocity for the Actor.
		@property dX
		@type Number
		@default 0
	*/
	Actor.prototype.dx = 0;
	
	/**
		The current y velocity for the Actor.
		@property dY
		@type Number
		@default 0;
	*/
	Actor.prototype.dy = 0;
	
	// Used to avoid overriding parent initialize function
	Actor.prototype.PhysicalGameObject_initialize = Actor.prototype.initialize;
	
	/**
		Initialize method
		@method initialize
	*/
	Actor.prototype.initialize = function(){
		this.PhysicalGameObject_initialize();
	}
	
	/**
		Moves both the AABounding-Box and
		the DisplayObject by the current dY and dX.
		@method move
	*/
	Actor.prototype.move = function(dx, dy){
		this.displayObject.x += dx;
		this.displayObject.y += dy;
		this.aabb.x += dx;
		this.aabb.y += dy;
	}
	
	/**
		Positions the DisplayObject belonging to
		this actor.
		@method positionDisplayObject
		@param {Number} the x position to move the DisplayObject to.
		@param {Number} this y position to move the DisplayObject to.
	*/
	Actor.prototype.positionDisplayObject = function(x, y){
		this.displayObject.x = x;
		this.displayObject.y = y;
	}
	
	
	// Abstract Methods:
	
	/**
		This method will be called on each tick. Should
		contain the actors logic
		@method tick
		@abstract
	*/
	Actor.prototype.tick = function(){}
	
	
	window.Actor = Actor;
}(window));