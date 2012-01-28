(function(window){
	var Direction = function(){
		throw 'Direction cannot be instantiated.'
	}
	
	Direction.NORTH = 'NORTH';
	Direction.EAST = 'EAST';
	Direction.SOUTH = 'SOUTH';
	Direction.WEST = 'WEST';
	
	Direction.UP = 'UP';
	Direction.RIGHT = 'RIGHT';
	Direction.DOWN = 'DOWN';
	Direction.LEFT = 'LEFT';
	
	window.Direction = Direction;
}(window));