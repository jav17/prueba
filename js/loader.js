var loadedGameAssets = false;
var gameAssets = [];
var filesArray = [];
var loaded=0;
var count=0;
var basePath = "images/";

addToLoader({"type":"image", "id":"dice_sprite", 	"src":"dice_sprite.png"});

addToLoader({"type":"image", "id":"bet1_button", 			"src":"buttons/bet1_normal.png"});
addToLoader({"type":"image", "id":"bet1_button_hover", 		"src":"buttons/bet1_hover.png"});
addToLoader({"type":"image", "id":"bet1_button_press", 		"src":"buttons/bet1_press.png"});
addToLoader({"type":"image", "id":"bet1_button_disable", 	"src":"buttons/bet1_disable.png"});

addToLoader({"type":"image", "id":"bet5_button", 			"src":"buttons/bet5_normal.png"});
addToLoader({"type":"image", "id":"bet5_button_hover", 		"src":"buttons/bet5_hover.png"});
addToLoader({"type":"image", "id":"bet5_button_press", 		"src":"buttons/bet5_press.png"});
addToLoader({"type":"image", "id":"bet5_button_disable", 	"src":"buttons/bet5_disable.png"});

addToLoader({"type":"image", "id":"bet10_button", 			"src":"buttons/bet10_normal.png"});
addToLoader({"type":"image", "id":"bet10_button_hover", 	"src":"buttons/bet10_hover.png"});
addToLoader({"type":"image", "id":"bet10_button_press", 	"src":"buttons/bet10_press.png"});
addToLoader({"type":"image", "id":"bet10_button_disable", 	"src":"buttons/bet10_disable.png"});

addToLoader({"type":"image", "id":"bet50_button", 			"src":"buttons/bet50_normal.png"});
addToLoader({"type":"image", "id":"bet50_button_hover", 	"src":"buttons/bet50_hover.png"});
addToLoader({"type":"image", "id":"bet50_button_press", 	"src":"buttons/bet50_press.png"});
addToLoader({"type":"image", "id":"bet50_button_disable", 	"src":"buttons/bet50_disable.png"});

addToLoader({"type":"image", "id":"bet100_button", 			"src":"buttons/bet100_normal.png"});
addToLoader({"type":"image", "id":"bet100_button_hover", 	"src":"buttons/bet100_hover.png"});
addToLoader({"type":"image", "id":"bet100_button_press", 	"src":"buttons/bet100_press.png"});
addToLoader({"type":"image", "id":"bet100_button_disable", 	"src":"buttons/bet100_disable.png"});

addToLoader({"type":"image", "id":"clearBet_button", 		"src":"buttons/clearBet_normal.png"});
addToLoader({"type":"image", "id":"clearBet_button_hover", 	"src":"buttons/clearBet_hover.png"});
addToLoader({"type":"image", "id":"clearBet_button_press", 	"src":"buttons/clearBet_press.png"});
addToLoader({"type":"image", "id":"clearBet_button_disable","src":"buttons/clearBet_disable.png"});

addToLoader({"type":"image", "id":"rebet_button", 			"src":"buttons/rebet_normal.png"});
addToLoader({"type":"image", "id":"rebet_button_hover", 	"src":"buttons/rebet_hover.png"});
addToLoader({"type":"image", "id":"rebet_button_press", 	"src":"buttons/rebet_press.png"});
addToLoader({"type":"image", "id":"rebet_button_disable", 	"src":"buttons/rebet_disable.png"});

addToLoader({"type":"image", "id":"info_button", 			"src":"buttons/info_normal.png"});
addToLoader({"type":"image", "id":"info_button_hover", 		"src":"buttons/info_hover.png"});
addToLoader({"type":"image", "id":"info_button_press", 		"src":"buttons/info_press.png"});
addToLoader({"type":"image", "id":"info_button_disable", 	"src":"buttons/info_disable.png"});

addToLoader({"type":"image", "id":"erase_button", 			"src":"buttons/erase_normal.png"});
addToLoader({"type":"image", "id":"erase_button_hover", 	"src":"buttons/erase_hover.png"});
addToLoader({"type":"image", "id":"erase_button_press", 	"src":"buttons/erase_press.png"});
addToLoader({"type":"image", "id":"erase_button_disable", 	"src":"buttons/erase_disable.png"});

addToLoader({"type":"image", "id":"erase_active", 			"src":"buttons/erase_active_normal.png"});
addToLoader({"type":"image", "id":"erase_active_hover", 	"src":"buttons/erase_active_hover.png"});
addToLoader({"type":"image", "id":"erase_active_press", 	"src":"buttons/erase_active_press.png"});
addToLoader({"type":"image", "id":"erase_active_disable", 	"src":"buttons/erase_active_disable.png"});


addToLoader({"type":"image", "id":"call_attendant_button", 			"src":"buttons/call_attendant_normal.png"});
addToLoader({"type":"image", "id":"call_attendant_button_hover", 	"src":"buttons/call_attendant_hover.png"});
addToLoader({"type":"image", "id":"call_attendant_button_press", 	"src":"buttons/call_attendant_press.png"});
addToLoader({"type":"image", "id":"call_attendant_button_disable", 	"src":"buttons/call_attendant_disable.png"});

addToLoader({"type":"image", "id":"cashout_button", 			"src":"buttons/cashout_normal.png"});
addToLoader({"type":"image", "id":"cashout_button_hover", 		"src":"buttons/cashout_hover.png"});
addToLoader({"type":"image", "id":"cashout_button_press", 		"src":"buttons/cashout_press.png"});
addToLoader({"type":"image", "id":"cashout_button_disable", 		"src":"buttons/cashout_disable.png"});

addToLoader({"type":"image", "id":"undo_button", 			"src":"buttons/undo_normal.png"});
addToLoader({"type":"image", "id":"undo_button_hover", 		"src":"buttons/undo_hover.png"});
addToLoader({"type":"image", "id":"undo_button_press", 		"src":"buttons/undo_press.png"});
addToLoader({"type":"image", "id":"undo_button_disable", 	"src":"buttons/undo_disable.png"});

addToLoader({"type":"image", "id":"close_button", 				"src":"buttons/close_normal.png"});
addToLoader({"type":"image", "id":"close_button_hover", 		"src":"buttons/close_hover.png"});
addToLoader({"type":"image", "id":"close_button_press", 		"src":"buttons/close_pressed.png"});

addToLoader({"type":"image", "id":"denom_base", 			"src":"denom_base.png"});

addToLoader({"type":"image", "id":"game_rules", 			"src":"sicbo_game_rules.png"});

//addToLoader({"type":"image", "id":"bg", 			"src":"ref.jpg"});
addToLoader({"type":"image", "id":"bg", 			"src":"bg.jpg"});

addToLoader({"type":"image", "id":"timer_bg", 		"src":"timer_bg.png"});

addToLoader({"type":"image", "id":"timer_bg1", 		"src":"timer_bg1.png"});

addToLoader({"type":"image", "id":"timer", 			"src":"timer.png"});

addToLoader({"type":"image", "id":"timer_bg_shadow", "src":"timer_bg_shadow.png"});

addToLoader({"type":"image", "id":"btn_bg", 		"src":"button1_base.png"});

addToLoader({"type":"image", "id":"msg_bg", 		"src":"msg_bg.png"});

addToLoader({"type":"image", "id":"btn_bg2", 		"src":"button2_base.png"});

addToLoader({"type":"image", "id":"chips_base", 	"src":"chips_base.png"});

addToLoader({"type":"image", "id":"chips_bg", 		"src":"chips_bg.png"});

addToLoader({"type":"image", "id":"bet_win_cont", 	"src":"bet_win_cont.png"});

addToLoader({"type":"image", "id":"hist_cont_bg", 	"src":"hist_cont_bg.png"});

addToLoader({"type":"image", "id":"dicebox_bg", 	"src":"dicebox_bg.png"});

addToLoader({"type":"image", "id":"dice_sprite_loop", 	"src":"dice_sprite_loop.png"});

addToLoader({"type":"image", "id":"title", 			"src":"title/title.png"});

addToLoader({"type":"image", "id":"bet_1", 			"src":"chips/1.png"});

addToLoader({"type":"image", "id":"bet_5", 			"src":"chips/5.png"});

addToLoader({"type":"image", "id":"bet_10", 		"src":"chips/10.png"});

addToLoader({"type":"image", "id":"bet_50", 		"src":"chips/50.png"});

addToLoader({"type":"image", "id":"bet_100", 		"src":"chips/100.png"});

for(var i=1; i<=6; i++){
	addToLoader({"type":"image", "id":"dice_"+i, 	"src":"dice/"+i+".png"});
}

addToLoader({"type":"sound", "id":"audio_click_mp3", 		"src":"sound/clickDefault.mp3",      "loopable": false});
addToLoader({"type":"sound", "id":"audio_click_ogg", 		"src":"sound/clickDefault.ogg",      "loopable": false});

addToLoader({"type":"sound", "id":"audio_coinAdd_mp3", 		"src":"sound/coinAdd.mp3",      "loopable": false});
addToLoader({"type":"sound", "id":"audio_coinAdd_ogg", 		"src":"sound/coinAdd.ogg",      "loopable": false});

addToLoader({"type":"sound", "id":"audio_win_mp3", 			"src":"sound/win.mp3",      "loopable": false});
addToLoader({"type":"sound", "id":"audio_win_ogg", 			"src":"sound/win.ogg",      "loopable": false});

addToLoader({"type":"sound", "id":"audio_diceRoll_mp3", 	"src":"sound/diceRoll.mp3",      "loopable": false});
addToLoader({"type":"sound", "id":"audio_diceRoll_ogg", 	"src":"sound/diceRoll.ogg",      "loopable": false});

addToLoader({"type":"sound", "id":"audio_diceRoll_loop_mp3", 	"src":"sound/diceRoll_loop.mp3",      "loopable": false});
addToLoader({"type":"sound", "id":"audio_diceRoll_loop_ogg", 	"src":"sound/diceRoll_loop.ogg",      "loopable": false});

addToLoader({"type":"sound", "id":"audio_bgm_mp3", 			"src":"sound/bgm.mp3",      "loopable": false});
addToLoader({"type":"sound", "id":"audio_bgm_ogg", 			"src":"sound/bgm.ogg",      "loopable": false});

addToLoader({"type":"sound", "id":"audio_bgm_mp3", 			"src":"sound/bgm.mp3",      "loopable": false});
addToLoader({"type":"sound", "id":"audio_bgm_ogg", 			"src":"sound/bgm.ogg",      "loopable": false});

addToLoader({"type":"sound", "id":"audio_nobet_mp3", 		"src":"sound/nobet.mp3",      "loopable": false});
addToLoader({"type":"sound", "id":"audio_nobet_ogg", 		"src":"sound/nobet.ogg",      "loopable": false});

addToLoader({"type":"sound", "id":"audio_placebet_mp3", 	"src":"sound/placebet.mp3",   "loopable": false});
addToLoader({"type":"sound", "id":"audio_placebet_ogg", 	"src":"sound/placebet.ogg",   "loopable": false});

function setProgress(loaded, total) {
	"use strict";
	var percent = Math.floor((loaded / total) * 100);

	$("#progressValue").html( percent + "%");
	//parent.updateGameLoaderProgress(percent);
	//$("#progress").css("width", percent + "%");
	//console.log('Loaded:'+loaded + 'Total:'+total);
	if (loaded === total){
		setTimeout(function () {			
			gameAssetsLoaded();			
		}, 500);
		
	}
}//End of setProgress

function addToLoader(_object){
	"use strict";
	if(_object.type === "image"){
		filesArray[count] = {
			"source": basePath + _object.src + '?v=3.6',
			"type": "IMAGE",
			"id": _object.id,
		};			
		count++;
	}else if(_object.type === "sound"){
		filesArray[count] = {
			"loopable": _object.loopable,
			"source": _object.src,
			"type": "SOUND",
			"id": _object.id,
		};
		count++;
	}		
}//End of addToLoader

function loadGameAssets() {
	"use strict";
	var totalFilesToLoad = filesArray.length;
	var imageAssets = [];
	var audioAssets = [];
	for(var i=0; i<filesArray.length; i++){
		if(filesArray[i].type === "IMAGE"){
			imageAssets.push(filesArray[i]);	
			//console.log(filesArray[i])
		}else if(filesArray[i].type === "SOUND"){
			audioAssets.push(filesArray[i]);
		}
	}
	
	//Loading the Audio Assets
	var loadAudioAssets = function(_files){
		var sound = null;
		//var format = 'mp3';
		for (var i=0; i<_files.length; i++) {
			var asset = _files[i];
			sound = new WebAudioAPISound(asset.source + '?v=3.6', {loop: asset.loopable});
			setProgress(loaded++, totalFilesToLoad);
			sound.load();
			gameAssets[asset.id] = sound;
		}
	};
	loadAudioAssets(audioAssets);
	
	//Loading the image Assets
	$.html5Loader({
		filesToLoad: {"files": imageAssets},		
		onElementLoaded: function(obj, elm) {
			gameAssets[obj.id] = elm;
			setProgress(loaded++, totalFilesToLoad);
			if (loaded === totalFilesToLoad) {
				setProgress(totalFilesToLoad, totalFilesToLoad);
			}
		}
	});
}//End of loadGameAssets

