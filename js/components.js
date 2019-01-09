window.onresize = function() {
    "use strict";
    alignUI();
	window.scrollTo(0,0);
};

function init(){
    "use strict";
	
	document.addEventListener('touchmove', function(e) { e.preventDefault(); }, false);
	
	var body = document.getElementsByTagName("body");
	body[0].addEventListener('touchmove', function(e) { e.preventDefault(); }, false);
	$("body").find('*').on('dragstart',function(e){
		e.preventDefault();
		return false;
	});
	
	var lastTouchEnd = 0;
    document.documentElement.addEventListener('touchend', function (event) {
      var now = (new Date()).getTime();
      if (now - lastTouchEnd <= 300) {
        event.preventDefault();
      }
      lastTouchEnd = now;
    }, false);
		
    loadGameAssets();
	loader = document.getElementById('loader');	
	game_area = document.getElementById('game_area');	
	loader.classList.toggle("displayNone", false);
	game_area.classList.toggle("displayNone", true);	
    main_area = document.getElementById('main_area');
		
	alignUI();
}

var loader = null;
var main_area = null;
var game_area = null;

var game_area_w;
var userBalance = 500;
var bet_val = 1;
var totalWin = 0;
var betArray = new Array();
var rebetArr = new Array();
var totalBet = 0;
var betAmount = null;

var playGame = null;
var diceNumber = new Array();
var diceSum = 0;
var winAmount = 0;
var winningBets = new Array();
var landscape;

var pass = 'proga@ayb_19122017';

////////////////////////vinay////////////////////
var is_mobile = function(){
	var isMobile = false; //initiate as false

	 // device detection
	if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
		|| /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) isMobile = true;

	if(window.innerWidth < window.innerHeight){
		isMobile = true;
	}
	return isMobile;
}
	
//alignment of user interface
function alignUI() {
    "use strict";
    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;
    //var stageWidth = 1528;
    //var stageHeight = 1280;
    var stageWidth = 1920;
    var stageHeight = 1080;

    var stageRatio = stageWidth / stageHeight;
    var windowRatio = windowWidth / windowHeight;

    if (windowRatio > stageRatio) {
        main_area.style.width = windowHeight * stageRatio + "px";
        main_area.style.height = windowHeight + "px";
    } else {
        main_area.style.width = windowWidth + "px";
        main_area.style.height = windowWidth / stageRatio + "px";
    }
    main_area.style.top = (windowHeight - main_area.clientHeight) / 2 + "px";
    main_area.style.left = (windowWidth - main_area.clientWidth) / 2 + "px";

    game_area_w = (main_area.clientWidth);
	
	//console.log(game_area_w/99)
	//console.log(precisionRound((game_area_w/121.5) , 2))
	
	alignFont();
    
} //End of alignUI
function precisionRound(number, precision) {
  var factor = Math.pow(10, precision);
  return Math.round(number * factor) / factor;
}

function alignFont(){
	"use strict";
	//console.log(parseInt(game_area_w) / 14);
	
	var fontSize14 = (parseInt(game_area_w) / 72.285) + "px";
	var fontSize17 = (parseInt(game_area_w) / 68.071) + "px";
	var fontSize18 = (parseInt(game_area_w) / 45.944) + "px";
	var fontSize19 = (parseInt(game_area_w) / 76.875) + "px";
	var fontSize20 = (parseInt(game_area_w) / 61.5) + "px";
	
	//font size
	$(".fontSize14").css("font-size", fontSize14);
	$(".fontSize17").css("font-size", fontSize17);
	$(".fontSize18").css("font-size", fontSize18);
	$(".fontSize19").css("font-size", fontSize19);
	$(".fontSize20").css("font-size", fontSize20);
		
	$(".win_amount").css("font-size", (parseInt(game_area_w) / 94.428) + "px");
	$(".win_amount").css("width", game_area_w / 26.44 + "px");
	$(".highlight_area ul.row4 li .win_amount").css("width", game_area_w / 17.671 + "px");
	$(".win_amount").css("height", game_area_w / 94.428 + "px");
	$(".win_amount").css("border-radius", game_area_w / 220.333 + "px");
	
	//console.log(fontSize24);
	var border_radius = game_area_w/241.6
	
	//line height
    var line_height45 = parseInt(game_area_w / 26.822) + "px";
    var boder = (game_area_w /  413.5) + "px";
	
	//var tempDiv = $(".chips_area_cont .row1 li.child_1");
	//$(".chips_area_cont .row1 li.child_1").css({"width": precisionRound((game_area_w/8.25514403292181) , 2) + "px"});
	//$(".chips_area_cont .row1 li.child_2").css({"width": precisionRound((game_area_w/16.578512396694215) , 2) + "px"});
	//$(".chips_area_cont .row1 li.child_3").css({"width": precisionRound((game_area_w/10.131313131313131) , 2) + "px"});
	//$(".chips_area_cont .row1 li.child_4").css({"width": precisionRound((game_area_w/10) , 2) + "px"});
	
	
	
	//$(".chips_area_cont li").css({"border": "solid #fff "+boder});
	//$(".chips_area_cont li").css({"border-right": "none"});
	//$(".chips_area_cont li.border_last").css({"border-right": "solid #fff "+boder});
	//$(".chips_area_cont li .border_bottom").css({"border-bottom": "solid #fff "+boder});
	
	//$(".chips_area_cont .row.row1 li").css({"border": "solid #fff "+"0px"});
	
	//console.log(game_area_w/30.485);
	$(".choice").css({"background-size": "auto "+(game_area_w/27)+"px" });
	$(".timer_bg").css({"border-radius": (game_area_w/67.466) + "px"});
	$("#timer").css({"border-radius": (game_area_w/67.466) + "px"});
    
	$(".noMoreBet_popup .inner_cont").css({"border": "solid #fff000 "+boder});
	$(".noMoreBet_popup .inner_cont .close").css({"border": "solid #fff000 "+boder});
	$(".noMoreBet_popup .inner_cont").css({"border-radius": (game_area_w/100) + "px"});
      
	
	/*======line height of the chips amount======*/
	var get_height = document.getElementsByClassName("choice");
	//console.log("target value", get_height);
	for(var i=0; i<get_height.length; i++){
		var target = $(get_height[i]).context.id;
		//console.log("target value", target);
		var div_height = $("#"+target).height();
		//console.log(div_height);
		$("#"+target).css("lineHeight", div_height + "px");
	}

}

////////////////////popup show onclick event///////////////////
$(document).ready(function() {
    //club mouse hover
    "use strict";	   
    //hover functionality
    show_hide_handler();

});


//declared global variabale for poker lobby

//sound variable desfine
var audio_click_mp3 = null;
var audio_click_ogg = null;
var audio_bgm_mp3 = null;
var audio_bgm_ogg = null;
var audio_win_mp3 = null;
var audio_win_ogg = null;
var audio_coinAdd_mp3 = null;
var audio_coinAdd_ogg = null;
var audio_diceRoll_mp3 = null;
var audio_diceRoll_ogg = null;

var audio_diceRoll_loop_mp3 = null;
var audio_diceRoll_loop_ogg = null;

var audio_placebet_mp3 = null;
var audio_placebet_ogg = null;

var audio_nobet_mp3 = null;
var audio_nobet_ogg = null;

var audio_click = null;
var audio_bgm = null;
var audio_win = null;
var audio_coinAdd = null;
var audio_diceRoll = null;
var audio_diceRoll_loop = null;
var audio_placebet = null;
var audio_nobet = null;

//game assests variable declared

var bet1_button = null;
var bet5_button = null;
var bet10_button = null;
var bet50_button = null;
var bet100_button = null;

var call_attendant_button = null;
var cashout_button = null;
var undo_button = null;
var clearBet_button = null;
var rebet_button = null;
var erase_button = null;
var erase_button_active = null;
var info_button = null;
var close_button = null;
var game_rules = null;
var title = null;
var chips_bg = null;
var hist_cont_bg = null;
var msg_bg = null;
var dicebox_bg = null;
var bg = null;
var timer_bg = null;
var timer_bg1 = null;
var timer = null;
var timer_bg_shadow = null;
var dice_sprite = null;
var denom_base = null;

function gameAssetsLoaded(elements) {
    "use strict";
    
    game_area.style.backgroundImage = "url("+gameAssets.bg.src+")";
	
    // show UI and hide loading and show game area
	loader.classList.toggle("displayNone", true)
	game_area.classList.toggle("displayNone", false)
    
    ////////////audio functionality start here///////////////////

    audio_click = document.getElementById('audio_click');
    audio_bgm = document.getElementById('audio_bgm');
    audio_win = document.getElementById('audio_win');
    audio_coinAdd = document.getElementById('audio_coinAdd');
    audio_diceRoll = document.getElementById('audio_diceRoll');
    audio_diceRoll_loop = document.getElementById('audio_diceRoll_loop');
    audio_placebet = document.getElementById('audio_placebet');
    audio_nobet = document.getElementById('audio_nobet');
    
    //audio new object make
    audio_click_ogg = new object(document, "#audio_click_ogg");
    audio_click_mp3 = new object(document, "#audio_click_mp3");
    audio_bgm_ogg = new object(document, "#audio_bgm_ogg");
    audio_bgm_mp3 = new object(document, "#audio_bgm_mp3");
    audio_win_ogg = new object(document, "#audio_win_ogg");
    audio_win_mp3 = new object(document, "#audio_win_mp3");
    audio_coinAdd_ogg =  new object(document,"#audio_coinAdd_ogg");
    audio_coinAdd_mp3 =  new object(document,"#audio_coinAdd_mp3");
    audio_diceRoll_ogg =  new object(document,"#audio_diceRoll_ogg");
    audio_diceRoll_mp3 =  new object(document,"#audio_diceRoll_mp3");
	
    audio_diceRoll_loop_ogg =  new object(document,"#audio_diceRoll_loop_ogg");
    audio_diceRoll_loop_mp3 =  new object(document,"#audio_diceRoll_loop_mp3");

    audio_placebet_ogg =  new object(document,"#audio_placebet_ogg");
    audio_placebet_mp3 =  new object(document,"#audio_placebet_mp3");
    audio_nobet_ogg =  new object(document,"#audio_nobet_ogg");
    audio_nobet_mp3 =  new object(document,"#audio_nobet_mp3");

    //audio src insert to html file
    audio_click_ogg.element.src = gameAssets.audio_click_ogg.url;
    audio_click_mp3.element.src = gameAssets.audio_click_mp3.url;
    audio_bgm_ogg.element.src = gameAssets.audio_bgm_ogg.url;
    audio_bgm_mp3.element.src = gameAssets.audio_bgm_mp3.url;
    audio_win_ogg.element.src = gameAssets.audio_win_ogg.url;
    audio_win_mp3.element.src = gameAssets.audio_win_mp3.url;
    audio_coinAdd_ogg.element.src = gameAssets.audio_coinAdd_ogg.url;
    audio_coinAdd_mp3.element.src = gameAssets.audio_coinAdd_mp3.url;
    audio_diceRoll_ogg.element.src = gameAssets.audio_diceRoll_ogg.url;
    audio_diceRoll_mp3.element.src = gameAssets.audio_diceRoll_mp3.url;
	
    audio_diceRoll_loop_ogg.element.src = gameAssets.audio_diceRoll_loop_ogg.url;
    audio_diceRoll_loop_mp3.element.src = gameAssets.audio_diceRoll_loop_mp3.url;
	
    audio_placebet_ogg.element.src = gameAssets.audio_placebet_ogg.url;
    audio_placebet_mp3.element.src = gameAssets.audio_placebet_mp3.url;
	
    audio_nobet_ogg.element.src = gameAssets.audio_nobet_ogg.url;
    audio_nobet_mp3.element.src = gameAssets.audio_nobet_mp3.url;
	
	
	denom_base = new object(document, "#denom_base");
	denom_base.element = new buttonObject(denom_base.element, 	gameAssets.denom_base.src); 
	
	timer_bg = new object(document, "#timer_bg");
	timer_bg.element = new buttonObject(timer_bg.element, 	gameAssets.timer_bg.src); 
    
	timer = new object(document, "#timer");
	timer.element = new buttonObject(timer.element, 	gameAssets.timer.src); 
	
	timer_bg1 = new object(document, "#timer_bg1");
	timer_bg1.element = new buttonObject(timer_bg1.element, 	gameAssets.timer_bg1.src); 
	
	timer_bg_shadow = new object(document, "#timer_bg_shadow");
	timer_bg_shadow.element = new buttonObject(timer_bg_shadow.element, 	gameAssets.timer_bg_shadow.src); 
	
	title = new object(document, "#title");
	title.element = new buttonObject(title.element, 	gameAssets.title.src);    
	
	chips_bg = new object(document, "#chips_bg");
	chips_bg.element = new buttonObject(chips_bg.element, 	gameAssets.chips_bg.src);    
	
	game_rules = new object(document, "#game_rules");
	game_rules.element = new buttonObject(game_rules.element, 	gameAssets.game_rules.src);    
	
	hist_cont_bg = new object(document, "#hist_cont_bg");
	hist_cont_bg.element = new buttonObject(hist_cont_bg.element, 	gameAssets.hist_cont_bg.src);
	
	msg_bg = new object(document, "#msg_bg");
	msg_bg.element = new buttonObject(msg_bg.element, 	gameAssets.msg_bg.src);
	
	dicebox_bg = new object(document, "#dicebox_bg");
	dicebox_bg.element = new buttonObject(dicebox_bg.element, 	gameAssets.dicebox_bg.src);	
	
	dice_sprite = new object(document, "#dice_sprite");
	dice_sprite.element = new buttonObject(dice_sprite.element, 	gameAssets.dice_sprite.src);
    
	bet1_button = new object(document, "#bet1_button");
	bet1_button.element = new buttonObject(bet1_button.element, 		gameAssets.bet1_button.src,
																		gameAssets.bet1_button_hover.src,
																		gameAssets.bet1_button_press.src,
																		gameAssets.bet1_button_disable.src);
    
	bet5_button = new object(document, "#bet5_button");
	bet5_button.element = new buttonObject(bet5_button.element, 		gameAssets.bet5_button.src,
																		gameAssets.bet5_button_hover.src,
																		gameAssets.bet5_button_press.src,
																		gameAssets.bet5_button_disable.src);
    
	bet10_button = new object(document, "#bet10_button");
	bet10_button.element = new buttonObject(bet10_button.element, 		gameAssets.bet10_button.src,
																		gameAssets.bet10_button_hover.src,
																		gameAssets.bet10_button_press.src,
																		gameAssets.bet10_button_disable.src);
    
	bet50_button = new object(document, "#bet50_button");
	bet50_button.element = new buttonObject(bet50_button.element, 		gameAssets.bet50_button.src,
																		gameAssets.bet50_button_hover.src,
																		gameAssets.bet50_button_press.src,
																		gameAssets.bet50_button_disable.src);
    
	bet100_button = new object(document, "#bet100_button");
	bet100_button.element = new buttonObject(bet100_button.element, 	gameAssets.bet100_button.src,
																		gameAssets.bet100_button_hover.src,
																		gameAssets.bet100_button_press.src,
																		gameAssets.bet100_button_disable.src);

	info_button = new object(document, "#info_button");
	info_button.element = new buttonObject(info_button.element, 		gameAssets.info_button.src,
																		gameAssets.info_button_hover.src,
																		gameAssets.info_button_press.src,
																		gameAssets.info_button_disable.src);

	clearBet_button = new object(document, "#clearBet_button");
	clearBet_button.element = new buttonObject(clearBet_button.element, gameAssets.clearBet_button.src,
																		gameAssets.clearBet_button_hover.src,
																		gameAssets.clearBet_button_press.src,
																		gameAssets.clearBet_button_disable.src);
    
	rebet_button = new object(document, "#rebet_button");
	rebet_button.element = new buttonObject(rebet_button.element, 	    gameAssets.rebet_button.src,
																	    gameAssets.rebet_button_hover.src,
																	    gameAssets.rebet_button_press.src,
																	    gameAssets.rebet_button_disable.src);
    
	rebet_button = new object(document, "#rebet_button");
	rebet_button.element = new buttonObject(rebet_button.element, 	    gameAssets.rebet_button.src,
																	    gameAssets.rebet_button_hover.src,
																	    gameAssets.rebet_button_press.src,
																	    gameAssets.rebet_button_disable.src);

	undo_button = new object(document, "#undo_button");
	undo_button.element = new buttonObject(undo_button.element, 	    gameAssets.undo_button.src,
																	    gameAssets.undo_button_hover.src,
																	    gameAssets.undo_button_press.src,
																	    gameAssets.undo_button_disable.src); 

	erase_button = new object(document, "#erase_button");
	erase_button.element = new buttonObject(erase_button.element, 	    gameAssets.erase_button.src,
																	    gameAssets.erase_button_hover.src,
																	    gameAssets.erase_button_press.src,
																	    gameAssets.erase_button_disable.src); 

	erase_button_active = new object(document, "#erase_button_active");
	erase_button_active.element = new buttonObject(erase_button_active.element, gameAssets.erase_active_press.src,
																	    		gameAssets.erase_active_hover.src,
																	    		gameAssets.erase_active_press.src);       

	cashout_button = new object(document, "#cashout_button");
	cashout_button.element = new buttonObject(cashout_button.element, 	gameAssets.cashout_button.src,
																	    gameAssets.cashout_button_hover.src,
																	    gameAssets.cashout_button_press.src,
																	    gameAssets.cashout_button_disable.src);
    
	close_button = new object(document, "#close_button");
	close_button.element = new buttonObject(close_button.element, 	    gameAssets.close_button.src,
																	    gameAssets.close_button_hover.src,
																	    gameAssets.close_button_press.src);

	call_attendant_button = new object(document, "#call_attendant_button");
	call_attendant_button.element = new buttonObject(call_attendant_button.element, 	gameAssets.call_attendant_button.src,
																	                    gameAssets.call_attendant_button_hover.src,
																	                    gameAssets.call_attendant_button_press.src,
																	                    gameAssets.call_attendant_button_disable.src); 
    
    
    var chips_base = document.getElementsByClassName('chips_base');
	for(var i=0; i<chips_base.length; i++){				
		var trg = new buttonObject(chips_base[i], 	gameAssets["chips_base"].src);
	}
    
	var bet_win_cont = document.getElementsByClassName('bet_win_cont');
	for(var i=0; i<bet_win_cont.length; i++){				
		var trg = new buttonObject(bet_win_cont[i], 	gameAssets["bet_win_cont"].src);
	}
    
	var btn_bg = document.getElementsByClassName('btn_bg');
	for(var i=0; i<btn_bg.length; i++){				
		var trg = new buttonObject(btn_bg[i], 	gameAssets["btn_bg"].src);
	}
    
	var btn_bg2 = document.getElementsByClassName('btn_bg2');
	for(var i=0; i<btn_bg2.length; i++){				
		var trg = new buttonObject(btn_bg2[i], 	gameAssets["btn_bg2"].src);
	}
    
    bet1_button.element.setEvent(active);
	bet5_button.element.setEvent(active);
	bet10_button.element.setEvent(active);
	bet50_button.element.setEvent(active);
	bet100_button.element.setEvent(active);
    
	clearBet_button.element.setEvent(active);
	rebet_button.element.setEvent(active);
	info_button.element.setEvent(active);
	close_button.element.setEvent(active);
	undo_button.element.setEvent(active);
	erase_button.element.setEvent(active);
	erase_button_active.element.setEvent(active);
	call_attendant_button.element.setEvent(active);
	cashout_button.element.setEvent(active);
    
    clearBet_button.element.disable();
    rebet_button.element.disable();
    undo_button.element.disable();
    erase_button.element.disable();
    //call_attendant_button.element.disable();
    //cashout_button.element.disable();
    
    betAmount = 1;
    bet_val = parseInt(betAmount);	
	bet_button_disble();
    
    totalBet = 0;
    update("userBalance",{userBalance:userBalance});
	update("totalBet",{totalBet:totalBet});	
	update("total_win",{totalWin:winAmount});
    update("min",{min:min});
	update("max",{max:max});
	update("deno",{deno:deno});
    update("message",{message: message_arr[0]});
    button_disable();
    
    playGame = false;
	
    // initialize game cycle
    //setTimeout(init_game_cycle,1000);
	$.fn.scrollEnd = function(callback, timeout) {
	  $(this).scroll(function(){
		var $this = $(this);
		if ($this.data('scrollTimeout')) {
		  clearTimeout($this.data('scrollTimeout'));
		}
		$this.data('scrollTimeout', setTimeout(callback,timeout));
	  });
	};

	// how to call it (with a 1000ms timeout):
	$(window).scrollEnd(function(){
	   //resize(window.innerWidth, window.innerHeight)
		window.scrollTo(0,0);
	}, 100);
	
	show_dice(true, Array(5,3,6));
	
	webSocketHandler();
	
}



 
/*
function start_game(){
	//console.log("userBalance:---", userBalance, "totalBet:--", totalBet);
	if(playGame === true){
		playGame = false;		
		var params = {'selection': JSON.stringify(betArray)};
		$.ajax({
			url: "server/sicbo.php",
			data: params,
			type: "POST", 
			sucess: function(data,status){
				var reply = data;
			}, 
			error : function(xhr, status, error){
				var reply = error;
			}
		}).done(function(reply) { 
			//console.log('REsponse received:'+reply)
			var response = JSON.parse(reply);
			//console.log(response)			
			diceNumber = response.diceNumber;
			diceSum = response.diceSum;
			winAmount = response.winAmount;
			winningBets = response.winningBets;			
			serverResponse(response);			
		});
	}else{
		alert("Infuccient balance");
		clearInterval(coinsTimer);
	}
}
*/


function serverResponse(response){
	//console.log("response");
}

function update(_id, _data){
	//console.log(_id)
	//console.log(_data)
	if(_id == "userBalance"){
		document.getElementById('credit').innerHTML = parseInt(_data.userBalance);		
	}else if(_id == "totalBet"){
		document.getElementById('total_bet').innerHTML = parseInt(_data.totalBet);
	}else if(_id == "total_win"){		
		document.getElementById('total_win').innerHTML = parseInt(_data.totalWin);
	}else if(_id == "dice_sum"){
		document.getElementById("dice_sum").innerHTML = _data.diceSum;
	}else if(_id == "min"){
		document.getElementById("min").innerHTML = parseInt(_data.min);
	}else if(_id == "max"){
		document.getElementById("max").innerHTML = parseInt(_data.max);
	}else if(_id == "deno"){
		document.getElementById("deno").innerHTML = _data.deno;
	}else if(_id == "message"){
		document.getElementById("message").innerHTML = _data.message;
	}
}


function show_hide_handler(){
    for(var i=1; i<=17; i++){
		
		if(i>=1 && i<=6){
			var sp_val = "d"+i;
			$("#"+sp_val).mouseover(sp_show);
			$("#"+sp_val).mouseout(sp_hide);
			var sp_val = "t"+i;
			$("#"+sp_val).mouseover(sp_show);
			$("#"+sp_val).mouseout(sp_hide);
		}
		
		if(i>=2 && i<=6){
			var sp_val = "pair1"+i;
			$("#"+sp_val).mouseover(sp_show);
			$("#"+sp_val).mouseout(sp_hide);
			if(i>=3 && i<=6){
				var sp_val = "pair2"+i;
				$("#"+sp_val).mouseover(sp_show);
				$("#"+sp_val).mouseout(sp_hide);
				if(i>=4 && i<=6){
					var sp_val = "pair3"+i;
					$("#"+sp_val).mouseover(sp_show);
					$("#"+sp_val).mouseout(sp_hide);
					if(i>=5 && i<=6){
						var sp_val = "pair4"+i;
						$("#"+sp_val).mouseover(sp_show);
						$("#"+sp_val).mouseout(sp_hide);
						if(i<=6){
							var sp_val = "pair5"+i;
							$("#"+sp_val).mouseover(sp_show);
							$("#"+sp_val).mouseout(sp_hide);
							
							$("#s").mouseover(sp_show);
							$("#s").mouseout(sp_hide);
							
							$("#b").mouseover(sp_show);
							$("#b").mouseout(sp_hide);
							
							$("#anyTriple").mouseover(sp_show);
							$("#anyTriple").mouseout(sp_hide);
						}
					}
				}
			}
		}
		
		if(i>=4 && i<=17){
			var sp_val = "s"+i;
			$("#"+sp_val).mouseover(sp_show);
			$("#"+sp_val).mouseout(sp_hide);
		}
		if(i<=6){
			var sp_val = i;
			$("#"+sp_val).mouseover(sp_show);
			$("#"+sp_val).mouseout(sp_hide);
		}
	}
    chips_add();
}


function sp_show(ev) {
	var target = $(ev.target);
	var elId = target.attr('id');		
	//$( "#"+elId ).toggleClass('highlight', true)
	//console.log(elId, target);
	if(playGame == true){
		show_highlight(elId);
	}
}

function sp_hide(ev) {
	var target = $(ev.target);
	var elId = target.attr('id');
	//$( "#"+elId ).toggleClass('highlight', false)
	//console.log(elId,target);
	if(playGame == true){
		hide_highlight(elId);	
	}	
}

function hide_highlight(elId){
	if(elId == "1"){
		$( "li.point_1" ).toggleClass('highlight', false);
	}else if(elId == "2"){
		$( "li.point_2" ).toggleClass('highlight', false);
	}else if(elId == "3"){
		$( "li.point_3" ).toggleClass('highlight', false);
	}else if(elId == "4"){
		$( "li.point_4" ).toggleClass('highlight', false);
	}else if(elId == "5"){
		$( "li.point_5" ).toggleClass('highlight', false);
	}else if(elId == "6"){
		$( "li.point_6" ).toggleClass('highlight', false);
	}else if(elId == "d1"){
		$( "li.point_37" ).toggleClass('highlight', false);
	}else if(elId == "d2"){
		$( "li.point_38" ).toggleClass('highlight', false);
	}else if(elId == "d3"){
		$( "li.point_39" ).toggleClass('highlight', false);
	}else if(elId == "d4"){
		$( "li.point_46" ).toggleClass('highlight', false);
	}else if(elId == "d5"){
		$( "li.point_47" ).toggleClass('highlight', false);
	}else if(elId == "d6"){
		$( "li.point_48" ).toggleClass('highlight', false);
	}else if(elId == "t1"){
		$( "div.point_40" ).toggleClass('highlight', false);
	}else if(elId == "t2"){
		$( "div.point_41" ).toggleClass('highlight', false);
	}else if(elId == "t3"){
		$( "div.point_42" ).toggleClass('highlight', false);
	}else if(elId == "t4"){
		$( "div.point_43" ).toggleClass('highlight', false);
	}else if(elId == "t5"){
		$( "div.point_44" ).toggleClass('highlight', false);
	}else if(elId == "t6"){
		$( "div.point_45" ).toggleClass('highlight', false);
	}else if(elId == "s4"){
		$( "li.point_22" ).toggleClass('highlight', false);
	}else if(elId == "s5"){
		$( "li.point_23" ).toggleClass('highlight', false);
	}else if(elId == "s6"){
		$( "li.point_24" ).toggleClass('highlight', false);
	}else if(elId == "s7"){
		$( "li.point_25" ).toggleClass('highlight', false);
	}else if(elId == "s8"){
		$( "li.point_26" ).toggleClass('highlight', false);
	}else if(elId == "s9"){
		$( "li.point_27" ).toggleClass('highlight', false);
	}else if(elId == "s10"){
		$( "li.point_28" ).toggleClass('highlight', false);
	}else if(elId == "s11"){
		$( "li.point_29" ).toggleClass('highlight', false);
	}else if(elId == "s12"){
		$( "li.point_30" ).toggleClass('highlight', false);
	}else if(elId == "s13"){
		$( "li.point_31" ).toggleClass('highlight', false);
	}else if(elId == "s14"){
		$( "li.point_32" ).toggleClass('highlight', false);
	}else if(elId == "s15"){
		$( "li.point_33" ).toggleClass('highlight', false);
	}else if(elId == "s16"){
		$( "li.point_34" ).toggleClass('highlight', false);
	}else if(elId == "s17"){
		$( "li.point_35" ).toggleClass('highlight', false);
	}else if(elId == "pair12"){
		$( "li.point_7" ).toggleClass('highlight', false);
	}else if(elId == "pair13"){
		$( "li.point_8" ).toggleClass('highlight', false);
	}else if(elId == "pair14"){
		$( "li.point_9" ).toggleClass('highlight', false);
	}else if(elId == "pair15"){
		$( "li.point_10" ).toggleClass('highlight', false);
	}else if(elId == "pair16"){
		$( "li.point_11" ).toggleClass('highlight', false);
	}else if(elId == "pair23"){
		$( "li.point_12" ).toggleClass('highlight', false);
	}else if(elId == "pair24"){
		$( "li.point_13" ).toggleClass('highlight', false);
	}else if(elId == "pair25"){
		$( "li.point_14" ).toggleClass('highlight', false);
	}else if(elId == "pair26"){
		$( "li.point_15" ).toggleClass('highlight', false);
	}else if(elId == "pair34"){
		$( "li.point_16" ).toggleClass('highlight', false);
	}else if(elId == "pair35"){
		$( "li.point_17" ).toggleClass('highlight', false);
	}else if(elId == "pair36"){
		$( "li.point_18" ).toggleClass('highlight', false);
	}else if(elId == "pair45"){
		$( "li.point_19" ).toggleClass('highlight', false);
	}else if(elId == "pair46"){
		$( "li.point_20" ).toggleClass('highlight', false);
	}else if(elId == "pair56"){
		$( "li.point_21" ).toggleClass('highlight', false);
	}else if(elId == "anyTriple"){
		$( "li.point_50" ).toggleClass('highlight', false);
	}else if(elId == "s"){
		$( "li.point_36" ).toggleClass('highlight', false);
	}else if(elId == "b"){
		$( "li.point_49" ).toggleClass('highlight', false);
	}
}

function show_highlight(elId){
	if(elId == "1"){
		$( "li.point_1" ).toggleClass('highlight', true);
	}else if(elId == "2"){
		$( "li.point_2" ).toggleClass('highlight', true);
	}else if(elId == "3"){
		$( "li.point_3" ).toggleClass('highlight', true);
	}else if(elId == "4"){
		$( "li.point_4" ).toggleClass('highlight', true);
	}else if(elId == "5"){
		$( "li.point_5" ).toggleClass('highlight', true);
	}else if(elId == "6"){
		$( "li.point_6" ).toggleClass('highlight', true);
	}else if(elId == "d1"){
		$( "li.point_37" ).toggleClass('highlight', true);
	}else if(elId == "d2"){
		$( "li.point_38" ).toggleClass('highlight', true);
	}else if(elId == "d3"){
		$( "li.point_39" ).toggleClass('highlight', true);
	}else if(elId == "d4"){
		$( "li.point_46" ).toggleClass('highlight', true);
	}else if(elId == "d5"){
		$( "li.point_47" ).toggleClass('highlight', true);
	}else if(elId == "d6"){
		$( "li.point_48" ).toggleClass('highlight', true);
	}else if(elId == "t1"){
		$( "div.point_40" ).toggleClass('highlight', true);
	}else if(elId == "t2"){
		$( "div.point_41" ).toggleClass('highlight', true);
	}else if(elId == "t3"){
		$( "div.point_42" ).toggleClass('highlight', true);
	}else if(elId == "t4"){
		$( "div.point_43" ).toggleClass('highlight', true);
	}else if(elId == "t5"){
		$( "div.point_44" ).toggleClass('highlight', true);
	}else if(elId == "t6"){
		$( "div.point_45" ).toggleClass('highlight', true);
	}else if(elId == "s4"){
		$( "li.point_22" ).toggleClass('highlight', true);
	}else if(elId == "s5"){
		$( "li.point_23" ).toggleClass('highlight', true);
	}else if(elId == "s6"){
		$( "li.point_24" ).toggleClass('highlight', true);
	}else if(elId == "s7"){
		$( "li.point_25" ).toggleClass('highlight', true);
	}else if(elId == "s8"){
		$( "li.point_26" ).toggleClass('highlight', true);
	}else if(elId == "s9"){
		$( "li.point_27" ).toggleClass('highlight', true);
	}else if(elId == "s10"){
		$( "li.point_28" ).toggleClass('highlight', true);
	}else if(elId == "s11"){
		$( "li.point_29" ).toggleClass('highlight', true);
	}else if(elId == "s12"){
		$( "li.point_30" ).toggleClass('highlight', true);
	}else if(elId == "s13"){
		$( "li.point_31" ).toggleClass('highlight', true);
	}else if(elId == "s14"){
		$( "li.point_32" ).toggleClass('highlight', true);
	}else if(elId == "s15"){
		$( "li.point_33" ).toggleClass('highlight', true);
	}else if(elId == "s16"){
		$( "li.point_34" ).toggleClass('highlight', true);
	}else if(elId == "s17"){
		$( "li.point_35" ).toggleClass('highlight', true);
	}else if(elId == "pair12"){
		$( "li.point_7" ).toggleClass('highlight', true);
	}else if(elId == "pair13"){
		$( "li.point_8" ).toggleClass('highlight', true);
	}else if(elId == "pair14"){
		$( "li.point_9" ).toggleClass('highlight', true);
	}else if(elId == "pair15"){
		$( "li.point_10" ).toggleClass('highlight', true);
	}else if(elId == "pair16"){
		$( "li.point_11" ).toggleClass('highlight', true);
	}else if(elId == "pair23"){
		$( "li.point_12" ).toggleClass('highlight', true);
	}else if(elId == "pair24"){
		$( "li.point_13" ).toggleClass('highlight', true);
	}else if(elId == "pair25"){
		$( "li.point_14" ).toggleClass('highlight', true);
	}else if(elId == "pair26"){
		$( "li.point_15" ).toggleClass('highlight', true);
	}else if(elId == "pair34"){
		$( "li.point_16" ).toggleClass('highlight', true);
	}else if(elId == "pair35"){
		$( "li.point_17" ).toggleClass('highlight', true);
	}else if(elId == "pair36"){
		$( "li.point_18" ).toggleClass('highlight', true);
	}else if(elId == "pair45"){
		$( "li.point_19" ).toggleClass('highlight', true);
	}else if(elId == "pair46"){
		$( "li.point_20" ).toggleClass('highlight', true);
	}else if(elId == "pair56"){
		$( "li.point_21" ).toggleClass('highlight', true);
	}else if(elId == "anyTriple"){
		$( "li.point_50" ).toggleClass('highlight', true);
	}else if(elId == "s"){
		$( "li.point_36" ).toggleClass('highlight', true);
	}else if(elId == "b"){
		$( "li.point_49" ).toggleClass('highlight', true);
	}
}

function show_Win_highlight(elId){
	if(elId == "1"){
		$( "li.point_1" ).toggleClass('win_highlight', true);
	}else if(elId == "2"){
		$( "li.point_2" ).toggleClass('win_highlight', true);
	}else if(elId == "3"){
		$( "li.point_3" ).toggleClass('win_highlight', true);
	}else if(elId == "4"){
		$( "li.point_4" ).toggleClass('win_highlight', true);
	}else if(elId == "5"){
		$( "li.point_5" ).toggleClass('win_highlight', true);
	}else if(elId == "6"){
		$( "li.point_6" ).toggleClass('win_highlight', true);
	}else if(elId == "d1"){
		$( "li.point_37" ).toggleClass('win_highlight', true);
	}else if(elId == "d2"){
		$( "li.point_38" ).toggleClass('win_highlight', true);
	}else if(elId == "d3"){
		$( "li.point_39" ).toggleClass('win_highlight', true);
	}else if(elId == "d4"){
		$( "li.point_46" ).toggleClass('win_highlight', true);
	}else if(elId == "d5"){
		$( "li.point_47" ).toggleClass('win_highlight', true);
	}else if(elId == "d6"){
		$( "li.point_48" ).toggleClass('win_highlight', true);
	}else if(elId == "t1"){
		$( "div.point_40" ).toggleClass('win_highlight', true);
	}else if(elId == "t2"){
		$( "div.point_41" ).toggleClass('win_highlight', true);
	}else if(elId == "t3"){
		$( "div.point_42" ).toggleClass('win_highlight', true);
	}else if(elId == "t4"){
		$( "div.point_43" ).toggleClass('win_highlight', true);
	}else if(elId == "t5"){
		$( "div.point_44" ).toggleClass('win_highlight', true);
	}else if(elId == "t6"){
		$( "div.point_45" ).toggleClass('win_highlight', true);
	}else if(elId == "s4"){
		$( "li.point_22" ).toggleClass('win_highlight', true);
	}else if(elId == "s5"){
		$( "li.point_23" ).toggleClass('win_highlight', true);
	}else if(elId == "s6"){
		$( "li.point_24" ).toggleClass('win_highlight', true);
	}else if(elId == "s7"){
		$( "li.point_25" ).toggleClass('win_highlight', true);
	}else if(elId == "s8"){
		$( "li.point_26" ).toggleClass('win_highlight', true);
	}else if(elId == "s9"){
		$( "li.point_27" ).toggleClass('win_highlight', true);
	}else if(elId == "s10"){
		$( "li.point_28" ).toggleClass('win_highlight', true);
	}else if(elId == "s11"){
		$( "li.point_29" ).toggleClass('win_highlight', true);
	}else if(elId == "s12"){
		$( "li.point_30" ).toggleClass('win_highlight', true);
	}else if(elId == "s13"){
		$( "li.point_31" ).toggleClass('win_highlight', true);
	}else if(elId == "s14"){
		$( "li.point_32" ).toggleClass('win_highlight', true);
	}else if(elId == "s15"){
		$( "li.point_33" ).toggleClass('win_highlight', true);
	}else if(elId == "s16"){
		$( "li.point_34" ).toggleClass('win_highlight', true);
	}else if(elId == "s17"){
		$( "li.point_35" ).toggleClass('win_highlight', true);
	}else if(elId == "pair12"){
		$( "li.point_7" ).toggleClass('win_highlight', true);
	}else if(elId == "pair13"){
		$( "li.point_8" ).toggleClass('win_highlight', true);
	}else if(elId == "pair14"){
		$( "li.point_9" ).toggleClass('win_highlight', true);
	}else if(elId == "pair15"){
		$( "li.point_10" ).toggleClass('win_highlight', true);
	}else if(elId == "pair16"){
		$( "li.point_11" ).toggleClass('win_highlight', true);
	}else if(elId == "pair23"){
		$( "li.point_12" ).toggleClass('win_highlight', true);
	}else if(elId == "pair24"){
		$( "li.point_13" ).toggleClass('win_highlight', true);
	}else if(elId == "pair25"){
		$( "li.point_14" ).toggleClass('win_highlight', true);
	}else if(elId == "pair26"){
		$( "li.point_15" ).toggleClass('win_highlight', true);
	}else if(elId == "pair34"){
		$( "li.point_16" ).toggleClass('win_highlight', true);
	}else if(elId == "pair35"){
		$( "li.point_17" ).toggleClass('win_highlight', true);
	}else if(elId == "pair36"){
		$( "li.point_18" ).toggleClass('win_highlight', true);
	}else if(elId == "pair45"){
		$( "li.point_19" ).toggleClass('win_highlight', true);
	}else if(elId == "pair46"){
		$( "li.point_20" ).toggleClass('win_highlight', true);
	}else if(elId == "pair56"){
		$( "li.point_21" ).toggleClass('win_highlight', true);
	}else if(elId == "anyTriple"){
		$( "li.point_50" ).toggleClass('win_highlight', true);
	}else if(elId == "s"){
		$( "li.point_36" ).toggleClass('win_highlight', true);
	}else if(elId == "b"){
		$( "li.point_49" ).toggleClass('win_highlight', true);
	}
}


// game cycle implementation
/*function init_game_cycle() {
    
    setTimeout(function() {
         //start betting
         start_bet();
    }, 2000);
           
}*/
