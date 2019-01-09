var currency = "$";

window.isMobile = function() {"use strict"; return /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)};

var eventType = "";
if(isMobile()){
	eventType = 'touchstart';
}else{
	eventType = 'click';
}

window.onkeydown = function(e) {
	"use strict"; 
    if(e.keyCode === 32 && e.target === document.body) {
        e.preventDefault();
		dispatchEvent(new CustomEvent("spaceBarPressed"));
        return false;
    }
};

//Aligning the html object which inherit their dimentions form parentNode
function inheritParentDimension(_document){
	"use strict"; 
	/*jshint validthis: true */ 
	var objList = _document.getElementsByClassName("inheritWidth");
	for(var i=0; i<objList.length; i++){
		var trgObj = objList[i];
		var parentObj = trgObj.parentNode;
		var parentWidth = parentObj.clientWidth;
		trgObj.style.width = parentWidth + "px";
	}
	var objList = _document.getElementsByClassName("inheritHeight");
	for(var i=0; i<objList.length; i++){
		var trgObj = objList[i];
		var parentObj = trgObj.parentNode;
		var parentHeight = parentObj.clientHeight;
		trgObj.style.height = parentHeight + "px";	
	}	
	var objList = _document.getElementsByClassName("inheritDimension");
	for(var i=0; i<objList.length; i++){
		var trgObj = objList[i];
		var parentObj = trgObj.parentNode;
		var parentWidth = parentObj.clientWidth;
		var parentHeight = parentObj.clientHeight;
		trgObj.style.width = parentWidth + "px";
		trgObj.style.height = parentHeight + "px";
		
		//console.log(trgObj)
	}
	
}//End of inheritParentDimension

//The metoth protoType to access the dimension and other property of instantiated object.
function object(_document, _element){
	"use strict"; 
	/*jshint validthis: true */ 
 	var obj = null;
	if(String(_element).indexOf("#") !== -1){
		_element = String(_element).replace("#","");
		obj = _document.getElementById(_element);
	}else if(String(_element).indexOf(".") !== -1){
		_element = String(_element).replace(".","");
		obj = _document.getElementsByClassName(_element)[0];
	}else{
		obj = _document.getElementsByTagName(_element)[0];
	}
	
	this.element = obj;
	this.id = obj.getAttribute("id");
	this.class = obj.getAttribute("class");
	this.x = this.element.offsetLeft;
	this.y = this.element.offsetTop;
	this.width = this.element.clientWidth;
	this.height = this.element.clientHeight;
	
	this.updateProperties = function(){
		this.id = obj.getAttribute("id");
		this.class = obj.getAttribute("class");
		this.x = this.element.offsetLeft;
		this.y = this.element.offsetTop;
		this.width = this.element.clientWidth;
		this.height = this.element.clientHeight;	
	};
}//End of object

//The metoth protoType to control the states of a button.
function buttonObject(_element, _default, _hover, _pressed, _disabled){
	"use strict"; 
	/*jshint validthis: true */
	this.element = _element; 
	this.disabled = false; 
	this.clickEvent = null; 
	
	
	if(_default !== undefined){
		this.element.setAttribute('src', _default);
		if(eventType == "click"){
			$(this.element).toggleClass("cursorDefault", false); 
			$(this.element).toggleClass("cursorPointer", false);
		}
	}
	
	$(this.element).on('mouseover', {_this:this}, mouseHoverHandler);
	function mouseHoverHandler(e){
		var object = e.data._this;
		if(object.disabled === false && _hover !== undefined){
			this.setAttribute('src', _hover);
			if(eventType == "click"){
				$(this.element).toggleClass("cursorDefault", false); 
				$(this.element).toggleClass("cursorPointer", true);
			}
		}
	}

	$(this.element).on('mousedown touchstart', {_this:this}, mousePressedHandler);
	function mousePressedHandler(e){
		var object = e.data._this;
		if(object.disabled === false && _pressed !== undefined){
			this.setAttribute('src', _pressed);
			if(eventType == "click"){
				$(this.element).toggleClass("cursorDefault", false); 
				$(this.element).toggleClass("cursorPointer", true);
			}
		}
	}

	$(this.element).on('mouseout mouseup touchend', {_this:this}, mouseOutHandler);
	function mouseOutHandler(e){
		var object = e.data._this;
		if(object.disabled === false && _default !== undefined){
			this.setAttribute('src', _default);
			if(eventType == "click"){
				$(this.element).toggleClass("cursorDefault", false); 
				$(this.element).toggleClass("cursorPointer", true);
			}
		}
	}
	
	this.disable = function () {
		this.disabled = true;
		if(_disabled !== undefined){
			this.element.setAttribute('src', _disabled);
			if(eventType == "click"){
				$(this.element).toggleClass("cursorDefault", false); 
				$(this.element).toggleClass("cursorPointer", false);
			}
		}
		$(this.element).off(eventType);
	};
	
	this.enable = function () {
		this.disabled = false;
		if(_default !== undefined){
			this.element.setAttribute('src', _default);
			if(eventType == "click"){
				$(this.element).toggleClass("cursorDefault", false); 
				$(this.element).toggleClass("cursorPointer", true);
			}
		}
		$(this.element).on(eventType, this.clickEvent);
	};
	
	this.setEvent = function (_function) {
		this.clickEvent = _function;
		this.enable();
	};

	this.disable();
}//End of buttonObject

var meterObject = function(_document, _elementId){
	"use strict"; 
    this.mode = "stop";
    
	var incrementValue = 0;
    var totalTick = 0;
    var currentTick = 0;
    var duration = 0;
    var start = 0;
    var current = 0;
    var end = 0;
    var minimumDigits = 0;
    var targetElement = _document.getElementById(_elementId);

    this.update = function(){
        if(this.mode === "play"){
            targetElement.innerHTML = formatCurrency(current);
			targetElement.setAttribute('data-text', formatCurrency(current));
            current += incrementValue;
            currentTick ++;
            if(currentTick >= totalTick){
				
                targetElement.innerHTML = formatCurrency(end);
				targetElement.setAttribute('data-text', formatCurrency(end));
                this.mode = "stop" ; 
            }
        }
    };
    
    this.init = function(_duration, _start, _end, _fps, _startMeter, _minimumDigits){
        minimumDigits = parseInt(_minimumDigits);
		duration = parseInt(_duration);
        start = parseInt(_start);
		current = parseInt(_start);
        end = parseInt(_end);
		currentTick = 0;
        totalTick = _fps * _duration;
        incrementValue = ((end - start) / (_fps*_duration));
        if(_startMeter){
            this.mode = "play";    
        }
    };           
};//End of meterObject

function formatCurrency(_amount){
	"use strict"; 
    return accounting.formatMoney(_amount, currency, 0, ",");
}

function formatPoints(_amount){
	"use strict"; 
    return accounting.formatMoney(_amount, "", "", ",");
}
	
function playAudio(_object, _isLoopable){
	"use strict"; 
	if(_object.id === "audio_clickDefault"){
		stopAudio(_object);
	}
	
	//Updating the tracking status of the audio element
	audioList[_object.id] = "play";
	
	if(isMute === true){
		return	;
	}
	
	//Playing the win sound after 100ms of stopping to remove the error of interuption of playing audio because of stoppping

	if(_isLoopable === true){
		_object.play();

		//Binding the loopable event to _object
		_object.setAttribute("onended", "loopAudio(this)");	
		//_object.setAttribute("loop");	
	}else{
		_object.play();
	}
}

function stopAudio(_object){
	"use strict"; 
	_object.pause();
	_object.currentTime = 0;
	
	//Updating the tracking status of the audio element
	audioList[_object.id] = "stop";
}

function pauseAudio(_object){
	"use strict"; 
	_object.pause();
	
	//Updating the tracking status of the audio element
	audioList[_object.id] = "pause";
}	

function loopAudio(_element){
	"use strict";
	_element.play();
}

var isMute = false;
var audioList =	{
					
					audio_bgm:"stop",
					audio_click:"stop",
					audio_win:"stop",
					audio_coinAdd:"stop",
					audio_diceRoll:"stop",
					audio_placebet:"stop",
					audio_nobet:"stop"
				};

function CustomEvent ( event, params ) {
	params = params || { bubbles: false, cancelable: false, detail: undefined };
	var evt = document.createEvent( 'CustomEvent' );
	evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
	return evt;
}

CustomEvent.prototype = window.Event.prototype;

window.CustomEvent = CustomEvent;
  
function toggleMute(){
	"use strict";
	if(isMute === true){
		isMute = false;
		dispatchEvent(new CustomEvent("muteStatus", {detail:{isMute:false}}));
		for(var key in audioList) {
			var audioElementStatus = audioList[key];
			if(audioElementStatus == "play"){
				if(key == "audio_bgm1" || key == "audio_wheelSpin"){
					playAudio(uis[key], true)
				}else{
					//playAudio(uis[key], false)	
				}
			}
		}
		
	}else if(isMute === false){
		isMute = true;
		dispatchEvent(new CustomEvent("muteStatus", {detail:{isMute:true}}));
		
		for(var key in audioList) {
			uis[key].element.pause();
		}		
	}
}
