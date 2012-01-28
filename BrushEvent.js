/*
	BrustEvent by Logan Wilkerson
	Last Updated: 1/21/2012
	
	Copyright (c) 2012 Logan Wilkerson
*/

/**
	BrushEvent
	
	BrushEvent is designed to assist in the handling of
	event listeners. This is a static class. Calling the
	method attachToDom will attach special methods to the
	DOM that will run the corresponding methods of all
	the listeners that have been added to the BrushEvent
	class.
	
	The class also has useful properties with key constants.
*/
(function(window){
	var BrushEvent = function(){
		throw 'BrushEvent cannot be instantiated.';
	}
	
	// static properties:
	BrushEvent.onKeyUpListeners = [];
	BrushEvent.onKeyDownListeners = [];
	
	BrushEvent.KEYCODE_LEFT = 37;
	BrushEvent.KEYCODE_UP = 38
	BrushEvent.KEYCODE_RIGHT = 39;
	BrushEvent.KEYCODE_DOWN = 40;
	
	BrushEvent.KEYCODE_SPACE = 32
	
	BrushEvent.KEYCODE_A = 65;
	BrushEvent.KEYCODE_W = 87;
	BrushEvent.KEYCODE_D = 68;
	BrushEvent.KEYCODE_S = 83;
	BrushEvent.KEYCODE_R = 82;
	BrushEvent.KEYCODE_B = 66;
		
	BrushEvent.attachToDOM = function(){
		document.onkeyup = BrushEvent.handleKeyUp;
		document.onkeydown = BrushEvent.handleKeyDown;
	}
		
	BrushEvent.addListener = function(type, listener){
		switch(type){
			case 'keyUp':
				BrushEvent.onKeyUpListeners.push(listener);
			break;
			case 'keyDown':
				BrushEvent.onKeyDownListeners.push(listener);
			break;
		}
		
	}
	
	BrushEvent.handleKeyUp = function(e){
		var l = BrushEvent.onKeyUpListeners.length;
		for (var i = 0; i < l; i++){
			BrushEvent.onKeyUpListeners[i].onKeyUp(e);
		}
	}
	
	BrushEvent.handleKeyDown = function(e){
		var l = BrushEvent.onKeyDownListeners.length;
		for(var i = 0; i < l; i++){
			BrushEvent.onKeyDownListeners[i].onKeyDown(e);
		}
	}

	//Set as static class
	window.BrushEvent = BrushEvent;
}(window));