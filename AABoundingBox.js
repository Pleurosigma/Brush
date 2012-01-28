(function(window){
	var AABoundingBox = function(x, y, halfWidth, halfHeight){
		this.initialize(x, y, halfWidth, halfHeight);
	}
	
	// Public Properties:
	AABoundingBox.prototype.x;
	AABoundingBox.prototype.y;
	AABoundingBox.prototype.halfWidth;
	AABoundingBox.prototype.halfHeight;
	
	AABoundingBox.prototype.initialize = function(x, y, halfWidth, halfHeight){
		this.x = x;
		this.y = y;
		this.halfWidth = halfWidth;
		this.halfHeight = halfHeight;
	}
	
	AABoundingBox.prototype.checkForCollision = function(box, getResponse){
		if(box == null){
			return false;
		}
		// Check the X axis
		var xV;
		if(this.x <= box.x){
			xV = box.x - box.halfWidth - this.x - this.halfWidth;
			if(xV > 0){
				return false;
			}
		}
		else{
			xV = box.x + box.halfWidth - this.x + this.halfWidth;
			if(xV < 0){
				return false;
			}
		}
		
		// Check the Y axis
		var yV;
		if(this.y <= box.y){
			yV = box.y - box.halfHeight - this.y - this.halfHeight;
			if(yV > 0){
				return false;
			}
		}
		else{
			yV = box.y + box.halfHeight - this.y + this.halfHeight;
			if(yV < 0){
				return false;
			}
		}
		
		// Return true, or calculate response vector
		if(!getResponse){
			return true;
		}
		else{
			if(Math.abs(xV) > Math.abs(yV)){
				return [0, yV];
			}
			else{
				return [xV, 0];
			}
		}
	}
	
	AABoundingBox.prototype.getDisplayRectangle = function(){
		return new Rectangle(0, 0, this.halfWidth * 2, this.halfHeight * 2);
	}
	
	window.AABoundingBox = AABoundingBox;
}(window));