(function(window){
	var Boundary = function(stage, side){
		this.initialize(stage, side);
	}
	
	Boundary.prototype = new PhysicalGameObject();
	
	// Public Properties:
	Boundary.prototype.type = 'boundary';
		
	// Used to avoid overriding the parent initialize function
	Boundary.prototype.PhysicalGameObject_initialize = Boundary.prototype.initialize;
	
	/**
		The initialize method
		@method initialize
		@param {Stage} The stage for this Boundary
		@param {String} 'top, 'right', 'bottom', or 'left'
				defines the side for the boundary
	*/
	Boundary.prototype.initialize = function(stage, side){
		var halfWidth = stage.canvas.width / 2;
		var halfHeight = stage.canvas.height / 2;
		var oobValue = 20;
		switch(side){
			case 'top':
				this.aabb = new AABoundingBox(halfWidth, -oobValue, halfWidth, oobValue);
			break;
			case 'right':
				this.aabb = new AABoundingBox(halfWidth*2 + oobValue, halfHeight, oobValue, halfHeight);
			break;
			case 'bottom':
				this.aabb = new AABoundingBox(halfWidth, halfHeight*2 + oobValue, halfWidth, oobValue);
			break;
			case 'left':
				this.aabb = new AABoundingBox(-oobValue, halfHeight, oobValue, halfHeight);
			break;
		}
		this.addToPhyObjects(this);
	}
	
	window.Boundary = Boundary;
}(window));