(function(window){
	var MovementState = function(){
		throw 'MovementState cannot be insantiated.';
	}
	
	MovementState.STAND = 'STAND';
	MovementState.WALKING = 'WALK';
	MovementState.RUN = 'RUN';
	MovementState.JUMP = 'JUMP';
	MovementState.AIR = 'AIR';
	
	window.MovementState = MovementState;
}(window));