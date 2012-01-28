(function(window){
	var Difficulty = function(){
		throw 'Difficulty cannot be instantiated.'
	}
	
	Difficulty.VERY_EASY = 'VERY_EASY';
	Difficulty.EASY = 'EASY';
	
	window.Difficulty = Difficulty;
}(window));