(function(window){
	/**
		A basic structure class. Designed to easily add
		platforms or structures.
	*/	
	var Structure = function(){
		this.initialize();
	}
	
	Structure.prototype = new PhysicalGameObject();
	
	// Public Properties:
	
	/**
		The DisplayObject for the structure. This is the
		DisplayObject that should be used to render the 
		structure to the stage. Note that this property 
		should not be used for any physical interactions.
		@property displayObject
		@type DisplayObject
		@default null
	*/
	Structure.prototype.displayObject = null;
	
	/**
		The type of the PhysicalGameObject
	*/
	Structure.prototype.type = 'structure';
	
	// Used to avoid overriding parent initialize function
	Structure.prototype.PhysicalGameObject_initialize = Structure.prototype.initialize;
	
	/**
		Initialize Method
		@method initialize
	*/
	Structure.prototype.initialize = function(){
		this.PhysicalGameObject_initialize();
		this.addToPhyObjects();
	}
	
	/**
		Sets the dimensions for a basic box structure.
		Best used only for testing and quick
		structures. Child classes should use their
		own methods for setting up the DisplayObject
		and AABoundingBox
		@method setStructureRectangle
		@param {Rectangle} The Rectangle for the 
				DisplayObject and AABoundingBox
	*/
	Structure.prototype.setStructureRectangle = function(rect){
		var g = new Graphics();
		g.beginStroke(Graphics.getRGB(0,0,0));
		g.drawRect(0,0, rect.width, rect.height);
		this.displayObject = new Shape(g);
		this.positionDisplayObject(rect.x, rect.y);
		var halfWidth = rect.width/2;
		var halfHeight = rect.height/2;
		this.aabb = new AABoundingBox(rect.x + halfWidth, rect.y + halfHeight, halfWidth, halfHeight);
	}
	
	/**
		Positions the DisplayObject belonging to this
		Structure
		@method positionDisplayObject
		@param {Number} the x position to move the DisplayObject to.
		@param {Number} the y position to move this DisplayObject to.
	*/
	Structure.prototype.positionDisplayObject = function(x, y){
		this.displayObject.x = x;
		this.displayObject.y = y;
	}
	
	window.Structure = Structure;
}(window));