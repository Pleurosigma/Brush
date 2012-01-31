/*
	PhysicalgameObject by Logan Wilkerson
*/
(function(window){
	/**
		PhysicalGameObject is an abstract class. It should be used
		for any object that has a physical presence on the stage
		such as structures, boundaries, and actors. A physical
		object need not have a display object.
	*/
	var PhysicalGameObject = function(){
		this.initialize();
	}
	
	// Public Properties:
	
	/**
		The type of PhysicalGameObject. This is mainly useful
		for collisions. For example there may be different
		types of "baddies" in a game, but colliding with 
		all of them does the same thing. So in the 
		collision of hero to "baddie" you only need to
		check the type.
		@property type
		@type String
		@default 'phyobject'
		
		
	*/
	PhysicalGameObject.prototype.type = 'phyobject';
	
	/**
		The AABoundingBox object that defines the actual
		boundaries of the PhysicalGameObject.
	*/
	PhysicalGameObject.prototype.aabb = null;
	
	// Static Properties:
	
	/**
		The list of PhysicalGameObjects in the current game.
		This is the list that will be used to check
		for collisions.
		@property phyObjects
		@type Array
		@default []
		@static
	*/
	PhysicalGameObject.phyObjects = [];
	
	/**
		The list of PhysicalGameObjects that have a tick
		method that should be called.
		@property tickObjects
		@type Array
		@default []
		@static
	*/
	PhysicalGameObject.tickObjects = [];
	
	/**
		Initialize the PhysicalGameObject
		@method initialize
	*/
	PhysicalGameObject.prototype.initialize = function(){}	
	
	/**
		Attaches this PhysicalGameObject to the correct
		data structures such as tickObjects and/or phyObjects.
		Also adds this to BrushEvents if it should be done so.
		This method is object specific and should be called
		direction AFTER initilizing the object.
	*/
	PhysicalGameObject.prototype.attach = function(){}
	
	/**
		Positions the AABoundingBox of this
		PhysicalGameObject
		@method positionAABB
		@param {Number} The x position to move the aabb to.
		@param {Number} The y position to move the aabb to.
	*/
	PhysicalGameObject.prototype.positionAABB = function(x, y){
		this.aabb.x = x;
		this.aabb.y = y;
	}
	
	/**
		Adds self to the PhysicalGameObject.phyObjects array
		@method addToPhyObjects
	*/
	PhysicalGameObject.prototype.addToPhyObjects = function(){
		PhysicalGameObject.phyObjects.push(this);
	}
	
	/**
		Adds self to the PhysicalGameObject.tickObjects array
		@method addToTickObjects
	*/
	PhysicalGameObject.prototype.addToTickObjects = function(){
		PhysicalGameObject.tickObjects.push(this);
	}
	
	
	/**
		Checks for collisions against all other
		PhysicalGameObjects in the phyObjects array.
		On a collision it calls the collide method with
		both the PhysicalGameObject and the response vector.
		@method checkCollisions
	*/
	PhysicalGameObject.prototype.checkCollisions = function(){
		var l = PhysicalGameObject.phyObjects.length;
		for(var i = 0; i < l; i++){
			var phyObject = PhysicalGameObject.phyObjects[i];
			if(phyObject != this){
				var rVector = this.getAABB().checkForCollision(phyObject.getAABB(), true);
				if(rVector){
					this.collide(phyObject, rVector)
				}
			}
		}
	}
	
	/**
		Handles a collision between this PhysicalGameObject
		and another
		@method collide
		@abstract
		@param {PhysicalGameObject} The PhysicalGameObject this
				is colliding with.
		@param {Array} The response vector. Should be in the
				form [dX, dY]
	*/
	PhysicalGameObject.prototype.collide = function(phyObject, rVector){}
	
	/**
		Returns the AABB for this PhysicalGameObject
		@method getAABB
		@return {AABoundingBox} This objects AABB
	*/
	PhysicalGameObject.prototype.getAABB = function(){
		return this.aabb;
	}
	
	window.PhysicalGameObject = PhysicalGameObject;
}(window));