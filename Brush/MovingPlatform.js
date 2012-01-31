/*
	MovingPlatform
*/
(function(window){
	var MovingPlatform = function(){
		this.initialize();
	}
	
	MovingPlatform.prototype = new Structure();
	
	// Public Properties:
	MovingPlatform.prototype.dx = 0;
	MovingPlatform.prototype.dy = 0;
	
	MovingPlatform.prototype.Structure_initialize = MovingPlatform.prototype.initialize;
	
	MovingPlatform.prototype.initialize = function(){
		this.addToPhyObjects();
		this.addToTickObjects();
		this.dx = Math.random() * 5 + 1;
	}
	
	MovingPlatform.prototype.tick = function(){
		this.changedDirection = false;
		this.move(this.dx, this.dy);
		this.checkCollisions();
	}
	
	MovingPlatform.prototype.collide = function(phyObject, rVector){
		switch(phyObject.type){
			case 'boundary':
				this.changeDirection = true;
				this.dx = -this.dx;
				this.move(rVector[0], rVector[1]);
			break;
			case 'hero':
				phyObject.move(-rVector[0], -rVector[1]);
			break;
		}
	}
	
	MovingPlatform.prototype.move = function(x, y){
		this.displayObject.x += x;
		this.displayObject.y += y;
		this.aabb.x += x;
		this.aabb.y += y;
	}
	
	window.MovingPlatform = MovingPlatform;
}(window));