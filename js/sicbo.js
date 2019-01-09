//websocket handle
window.WebSocket = window.WebSocket || window.MozWebSocket;
var Rconnect;

var undo_bet_array  = new Array();
var his_arr = new Array();

var click_type = false;

var erase_on = false

var message_arr = new Array("","Place your bets", "No more bets", "Please wait for the new game", "Server Error!", "Connection Error!");

//Get History from server
var reqHistory = {'op': 'history'}; //send connect to console db
consoleHandler(reqHistory);

//load configuration from server
if(serverConfig == true) {
	var req = {'op': 'config'}; //send connect to console db
	consoleHandler(req);
}
 
//all button and chips/bet button active functionality
function active(e) {
    "use strict";
	if(e.target.id === 'bet1_button' || e.target.id === 'bet5_button' || e.target.id === 'bet10_button' || e.target.id === 'bet50_button' || e.target.id === 'bet100_button'){
		bet1_button.element.disable();
		bet5_button.element.disable();
		bet10_button.element.disable();
		bet50_button.element.disable();
		bet100_button.element.disable();
		stopAudio(audio_click);
		playAudio(audio_click,false);
		if(e.target.id === 'bet1_button'){
			bet5_button.element.enable();
			bet10_button.element.enable();
			bet50_button.element.enable();
			bet100_button.element.enable();
			bet_val = 1;
		}else if(e.target.id === 'bet5_button'){
			bet1_button.element.enable();
			bet10_button.element.enable();
			bet50_button.element.enable();
			bet100_button.element.enable();
			bet_val = 5;
		}else if(e.target.id === 'bet10_button'){
			bet1_button.element.enable();
			bet5_button.element.enable();
			bet50_button.element.enable();
			bet100_button.element.enable();
			bet_val = 10;
		}else if(e.target.id === 'bet50_button'){
			bet1_button.element.enable();
			bet5_button.element.enable();
			bet10_button.element.enable();
			bet100_button.element.enable();
			bet_val = 50;
		}else if(e.target.id === 'bet100_button'){
			bet1_button.element.enable();
			bet5_button.element.enable();
			bet10_button.element.enable();
			bet50_button.element.enable();
			bet_val = 100;
		}
	}else if(e.target.id === 'undo_button'){
		//blink_stop();
		stopAudio(audio_click);
		playAudio(audio_click, false);
        
		if(betArray.length>0 && playGame == true){			
			undo_bet_array = betArray.slice().reverse();			
			var getValue = 0;
			var undo_value = undo_bet_array[0].value;
			var target_id = undo_bet_array[0].id;
			
			for(var i=0; i<undo_bet_array.length; i++){
				if(undo_bet_array[i].id == target_id){
					getValue += undo_bet_array[i].value;
				}
			}
            
			var newValue = parseInt(getValue - undo_value);
			totalBet -= parseInt(undo_value);
			update("totalBet",{totalBet:totalBet});
			$('#'+target_id).html(newValue);
			
			if(newValue == 0){
                $('#'+target_id).css("background","");
				//$('#'+target_id).removeAttr('style');
				$('#'+target_id).empty();
			}
			
			undo_bet_array = betArray.pop();
			
			show_amount(betArray);
			
			if(betArray.length == 0){
				undo_button.element.disable();
				clearBet_button.element.disable();
				
				//erase button implemtation
				erase_on = false;
				eraseButton(erase_on);
				erase_button.element.disable();
			}
		}
	}else if(e.target.id === "rebet_button"){
		//console.log("rebet button")		
		stopAudio(audio_click);
		playAudio(audio_click,false);
        rebet();
	}else if(e.target.id === "clearBet_button"){
		//console.log("clearBet_button")		
		stopAudio(audio_click);
		playAudio(audio_click,false);
		clear_bet();		
	}else if(e.target.id === "call_attendant_button"){
		//console.log("call attendant button")		
		stopAudio(audio_click);
		playAudio(audio_click,false);
	}else if(e.target.id === "cashout_button"){
		//console.log("cashout button")		
		stopAudio(audio_click);
		playAudio(audio_click,false);
	}else if(e.target.id == "info_button"){
		//console.log("toLobby button");		
		stopAudio(audio_click);
		playAudio(audio_click,false);
        info_button.element.disable();
		$("#game_rules_cont").toggleClass('displayNone', false);
	}else if(e.target.id == "close_button"){
		//console.log("close button");
		stopAudio(audio_click);
		playAudio(audio_click,false);
         info_button.element.enable();
		$("#game_rules_cont").toggleClass('displayNone', true);
	}else if(e.target.id == "erase_button"){
		//console.log("close button");
		stopAudio(audio_click);
		playAudio(audio_click,false);
		
		if(playGame){
			eraseButton(erase_on);
		}
	}else if(e.target.id == "erase_button_active"){
		//console.log("close button");
		stopAudio(audio_click);
		playAudio(audio_click,false);
		
		if(playGame){
			eraseButton(erase_on);
		}
	}
    
}

//erase button functionality
var eraseButton = function(_on){
	if(_on){		
		erase_on = false;
		
		document.getElementById('erase_button_active').classList.remove("displayNone");
		document.getElementById('erase_button').classList.add("displayNone");
		//console.log("erase",_on);
	}else{
		erase_on = true;
		
		document.getElementById('erase_button_active').classList.add("displayNone");
		document.getElementById('erase_button').classList.remove("displayNone");
		
		//console.log("erase",_on);
	}
};

//reset all game functionality
function reset(type){
    //all chips background remove with value
    $(".choice").css("background", "");
    $(".choice").html("");
	$('.win_amount').hide();
	$('.win_amount').html("");	
	
    //blinking stop function call
    blink_stop();
    //show_dice(false, Array());    
    button_enable();
    
    //reset all data only left betArray ( myaaray = [] ) data
	diceNumber = [];
	diceSum = 0;
	winAmount = 0;
	winningBets = [];
	
	playGame = true;	
	erase_on = true;
	
	totalBet = 0;
	totalWin = 0;
	update("totalBet",{totalBet:totalBet});
	
	if(type == 1)
		update("total_win",{totalWin:totalWin});
		
	clearBet_button.element.disable();
	undo_button.element.disable();    
	rebet_button.element.disable();
    if(betArray.length>0 && parseInt(userBalance) > 0){
        rebet_button.element.enable();
    }
    
    //update rebet object
    rebetArr = betArray;
    //clear bet
    betArray = [];
    
    //console.log("Reset Called");
}

var betExit = 0;
var tspeed = 1000;
var tprogress = 0;
//timer functionality
function timer_increase(delay, tick){
    $("#timer").css({"bottom": tick + "%"});
    var time_counter = setInterval(function(){
        //tick += (((bet_time*1000)/((bet_time*1000)/100))/100)/fps; 
        tick += (100 / bet_time)/32;
        $("#timer").css({"bottom": tick + "%"});
        if(tick >=100 || betExit == 1){
			//start_game();
			$(".choice").toggleClass("cursorPointer", false);
			update("message",{message: message_arr[2]});
			button_disable(); 
			$("#timer").css({"bottom": "100%"});
			
        } else {
			timer_increase(tspeed, tick)
		}
		
        clearInterval(time_counter); 
        
   // },((bet_time*delay)/100)/fps);    
    },delay/32);    
}




//stop bet functionality
function stop_bet(){
    //game paly false
    playGame = false;
	
	erase_on = false;
	eraseButton(erase_on);
	//erase_button.element.disable();
	button_disable();
    //hight light disable when time meter stop
    highlight_disable();
    //update userbalance
    userBalance = parseInt(userBalance) - parseInt(totalBet);
    update("userBalance",{userBalance:userBalance});
}

//hightlight disable functionality
function highlight_disable(){
     for(var i=1; i<=50; i++){
	    $(".point_"+i).toggleClass("highlight", false);
    }
}

//show win functionality
function show_win(winData){    
    //show history
    show_history(winData.diceNumber, winData.diceSum);
    
    //show dices
    show_dice(true, winData.diceNumber);
    
	show_win_amount(winData.winAmountShow, winData.betList)
    //set total win value for local
    
  	totalWin = winData.winAmount;
	if(parseInt(totalWin) > 0){
		stopAudio(audio_win);
		playAudio(audio_win,false);
		var request = {'op': 'win', 'win': totalWin}; //send win amount to console db
		consoleHandler(request);
	 }
    
    //update total win
    update("total_win",{totalWin:totalWin});
    userBalance = userBalance+totalWin;
    
    //update userbalance
    update("userBalance",{userBalance:(userBalance)});
    
    //set data for highlight win for local 
    //var _data = ["2","5","1"];
    highlight_win(winData.winningBets);
    
    //reset 
	setTimeout(reset, 2500);
}

var show_win_amount = function(winObj, betList){
	$.each(winObj, function(id, amount) {
		if(amount > 0) {
			var winAmt = amount - betList[id];
			$('#win_'+id).html(winAmt);	
			$('#win_'+id).addClass('win');	
			$('#win_'+id).show();	
		}
		
	});
}

//hightlight/blink win functionality
function highlight_win(_data){
	//console.log(_data);	
	for(var i=0; i<_data.length; i++){
		show_Win_highlight(_data[i]);
	}
   
}

//blink stop functionality
function blink_stop(){
	//console.log(rouletteNumber);
    for(var i=1; i<=50; i++){
	    $(".point_"+i).toggleClass("win_highlight", false);
    }
}

var history_win_type = new Array();

//history show functionality
function show_history(diceNumber, diceSum){
    //diceNumber = new Array(2,5,1);
    if(his_arr.length>=11){
		his_arr.splice(0, 1);
		history_win_type.splice(0, 1);
    }
    if(his_arr.length<=10){
        his_arr.push(diceNumber);
        if(diceSum>=11){
			history_win_type.push("B");
		}else{
			history_win_type.push("S");
		}
    }
    $("#history").html("");
    for(var i=0; i<his_arr.length; i++){
        var length = parseInt(his_arr.length - 1);
        var dice_num1 = his_arr[length-i][0];
        var dice_num2 = his_arr[length-i][1];
        var dice_num3 = his_arr[length-i][2];
		
		if( (dice_num1+dice_num2+dice_num3) % 2 == 0){
			var dice_even_odd = "E";
		}else{
			var dice_even_odd = "O";
		}
		
		if((dice_num1+dice_num2+dice_num3) >=11){
			var winType = "B";
		}else{
			var winType = "S";
		}
		//console.log(temp,temp1,temp2)
		//var temp_dice = '<div class="fullWidth row relative"><div class="left absolute"><img src="'+gameAssets["dice_"+his_arr[length-i][0]].src+'"><img src="'+gameAssets["dice_"+his_arr[length-i][1]].src+'"><img src="'+gameAssets["dice_"+his_arr[length-i][2]].src+'"></div><div class="right absolute textCapitalize">'+history_win_type[length-i]+'</div></div>';
		var temp_dice = '<div class="fullWidth row relative '+winType+'"><div class="left absolute"><div class="his_col">'+dice_num1+'</div><div class="his_col">'+dice_num2+'</div><div class="his_col">'+dice_num3+'</div></div><div class="right absolute textCapitalize"><div id="his_total_val" class="his_col">'+(dice_num1+dice_num2+dice_num3)+'</div><div id="his_win_type" class="his_col">'+winType+'</div><div id="his_even_odd" class="his_col odd '+dice_even_odd+'">'+dice_even_odd+'</div></div></div>';
        $( "#history" ).append( temp_dice );
    }
}

//show dice functionality
function show_dice(_show, diceNumber){
	//console.log(diceNumber, _show)
    if(_show == true){
        for(var i=0; i<diceNumber.length; i++){
            $("#dice"+(i+1)).toggleClass("displayNone", true);          
            $("#dice"+(i+1)).toggleClass("displayNone", false);
            if(diceNumber[i] == 1){
                $("#dice"+(i+1)).attr("src",gameAssets.dice_1.src);
            }else if(diceNumber[i] == 2){
                $("#dice"+(i+1)).attr("src",gameAssets.dice_2.src);
            }else if(diceNumber[i] == 3){
                $("#dice"+(i+1)).attr("src",gameAssets.dice_3.src);
            }else if(diceNumber[i] == 4){
                $("#dice"+(i+1)).attr("src",gameAssets.dice_4.src);
            }else if(diceNumber[i] == 5){
                $("#dice"+(i+1)).attr("src",gameAssets.dice_5.src);
            }else if(diceNumber[i] == 6){
                $("#dice"+(i+1)).attr("src",gameAssets.dice_6.src);
            }
        }        
    }else if(_show == false){
        $("#dice1").toggleClass("displayNone", true);
        $("#dice2").toggleClass("displayNone", true);
        $("#dice3").toggleClass("displayNone", true);
    }
    
}


function start_game(){
	//console.log(playGame);
	if(playGame === true){		
		if(parseInt(totalBet) <= parseInt(userBalance)) {	
			var serverURL = "server/sicbo.php";		
			var reqData = {	'selection': JSON.stringify(betArray) };
			var params = (reqData);
			//params = CryptoJS.AES.encrypt(params, pass, {format: CryptoJSAesJson}).toString();
			$.ajax({
				url: serverURL,
				data: params,
				type: "POST", 
				sucess: function(data,status){
					var reply = data;
				}, 
				error : function(xhr, status, error){
					var reply = error;
				}
			}).done(function(reply) { 
				var response = JSON.parse(reply)	
				//console.log(response);
				diceNumber = response.diceNumber;
				diceSum = response.diceSum;
				winAmount = response.winAmount;
				winningBets = response.winningBets;	
				
			});
		}		
		
	}
}

//chips add functionality
function chips_add(){
    $(".choice").click(function(e){
       
		if(playGame === true && parseInt(totalBet+bet_val) <= parseInt(userBalance) && erase_on == true){
            if(click_type == false){
                click_type = true;
                //betArray = [];
            }
			var target = e.target;			
			totalBet = parseInt(totalBet + bet_val);			
			
			if(totalBet<=max){
				stopAudio(audio_coinAdd);
				playAudio(audio_coinAdd,false);
								
				betArray.push({
					value: bet_val,
					id: target.id
				});
                
                var get_val = 0;
                for(var i=0; i<betArray.length; i++){
                   
                    if(target.id == betArray[i].id){
                        get_val += betArray[i].value;
                        var tempAmount = get_val;
                        $("#"+target.id).html(tempAmount);						
                    }						
                    update("totalBet",{totalBet:totalBet});
                }
				totalWin = 0;
				update("total_win",{totalWin:totalWin});
				
				change_chips_bg(target.id, get_val);
								
				show_amount(betArray);
				
				//console.log(betArray)
				button_enable_when_chips_add();
			}else{
				totalBet = parseInt(totalBet - bet_val);
				update("totalBet",{totalBet:totalBet});
                
                if(userBalance>=max){
                    show_hide_popup("noMoreBet", true);
                }else if(userBalance<max){
                   
                    if(totalBet > userBalance){
                        show_hide_popup("insufficient_bal", true);                       
                    }else{
                        show_hide_popup("credit_limit", true);
                        
                    }                   
                }
			}
			alignFont();
			Rconnect.send('START_BET');
		}else{
          if(erase_on == false && playGame === true && betArray.length>0){
				//console.log("remove from id")
				var target = e.target;
								
				var get_val=0;
				for(var z=0; z<betArray.length; z++){
					if(target.id == betArray[z].id){
						get_val += betArray[z].value;
					}
				}
				
				for(var i=betArray.length-1; i>=0; i--){		
                    if(target.id == betArray[i].id){	
                       	get_val -= betArray[i].value;
                       	$("#"+target.id).html(get_val);
						totalBet = parseInt(totalBet - betArray[i].value);
                    	update("totalBet",{totalBet:totalBet});	
						change_chips_bg(betArray[i].id,get_val)																								
						betArray.splice(i,1);
						if(get_val<=0){
							$('#'+target.id).css("background","");
							$('#'+target.id).empty();
						}
						
						break;
                    }						
                }
			  	
				show_amount(betArray);
			  	
				button_enable_when_chips_add();
			}else if(erase_on == false && playGame === true && betArray.length<=0){
				show_hide_popup("Please_add_chips", true);
				//console.log("remove from id 2")
		 	}else{
			   if(userBalance>0){
					if(playGame === true && parseInt(totalBet)<= parseInt(userBalance)){

						if(userBalance>=max){
							show_hide_popup("noMoreBet", true);

						}else if(userBalance<max){
							show_hide_popup("insufficient_bal", true);

						}
					}if(playGame === false && parseInt(totalBet)<= parseInt(userBalance)){
						if(userBalance>=max){
						   show_hide_popup("timer_start", true);
						   //console.log("game play false place your bet when timer start");
						}else if(userBalance<max){
							if(totalBet > userBalance){
								show_hide_popup("insufficient_bal", true);
							   //console.log("infuccient balance");
							}else{
								//show_hide_popup("noMOreBet", true);
								//console.log("no more bet Ya time up");
							}                        
						}
					}else{
						//console.log("else when userbalnce > 0");
						show_hide_popup("credit_limit", true);
					}
			   }else{
				   show_hide_popup("insufficient_bal", true);
				   //console.log("insufficient balance")
			   }
			}
							
		}		
		alignFont();
	});
	
	//for the expected win amount container
	$('.win_amount').click(function() {
		var bid = $(this).attr('id').split('_')[1];
		$('#'+bid).trigger('click');  
	});
	$('.win_amount').mouseover(function() {
		var bid = $(this).attr('id').split('_')[1];
		$('#'+bid).trigger('mouseover');  
	});
}

var betMultiplier = {
					"1" : 1,
					"2" : 1,
					"3" : 1,
					"4" : 1,
					"5" : 1,
					"6" : 1,
					"d1" : 8,
					"d2" : 8,
					"d3" : 8,
					"d4" : 8,
					"d5" : 8,
					"d6" : 8,
					"t1" : 150,
					"t2" : 150,
					"t3" : 150,
					"t4" : 150,
					"t5" : 150,
					"t6" : 150,
					"s4" : 50,
					"s5" : 18,
					"s6" : 14,
					"s7" : 12,
					"s8" : 8,
					"s9" : 6,
					"s10" : 6,
					"s11" : 6,
					"s12" : 6,
					"s13" : 8,
					"s14" : 12,
					"s15" : 14,
					"s16" : 18,
					"s17" : 50,
					"pair12" : 5,
					"pair13" : 5,
					"pair14" : 5,
					"pair15" : 5,
					"pair16" : 5,
					"pair23" : 5,
					"pair24" : 5,
					"pair25" : 5,
					"pair26" : 5,
					"pair34" : 5,
					"pair35" : 5,
					"pair36" : 5,
					"pair45" : 5,
					"pair46" : 5,
					"pair56" : 5,
					"s" : 1,
					"b" : 1,
					"anyTriple" : 24,
					};


var show_amount = function(_betArray){
	var betAmountObj = {};
	$(".win_amount").hide();
	$(".win_amount").empty();
	$('.win_amount').removeClass('win');
	$.each(_betArray, function(ind, betObj) {
		if(betObj.id in betAmountObj) {
			betAmountObj[betObj.id] += betObj.value + (betObj.value * betMultiplier[betObj.id]);
		} else {
			betAmountObj[betObj.id] = betObj.value + (betObj.value * betMultiplier[betObj.id]);
		}
	});
	
	$.each(betAmountObj, function(betid, betAmt){
		
		switch(betid){
			case '1':
			case '2':
			case '3':
			case '4':
			case '5':
			case '6':
				var showRange = betAmt + '-' + (betAmt * 2);
				$("#win_"+betid).html(showRange);
			break;
			default:
				$("#win_"+betid).html(betAmt);
			break;
		}
		$("#win_"+betid).show();
		
	});
	
}

var button_enable_when_chips_add = function(){
	//console.log(erase_on)
	if(betArray.length>0 && erase_on == true){
		clearBet_button.element.disable();
		
		rebet_button.element.disable();		
		erase_button.element.disable();
		undo_button.element.disable();
		
		clearBet_button.element.enable();
		erase_button.element.enable();		
		undo_button.element.enable();
		//console.log("dkfvbjdfbvkjk")
	}else if(betArray.length>0 && erase_on == false){
		clearBet_button.element.disable();
		
		rebet_button.element.disable();		
		erase_button.element.disable();
		undo_button.element.disable();
		
		clearBet_button.element.enable();
		erase_button.element.enable();		
		undo_button.element.enable();
		//console.log("dkfvbjdfbvkjk")
	}else{
		clearBet_button.element.disable();
		undo_button.element.disable();
		rebet_button.element.disable();
		
		erase_on = false;
		eraseButton(erase_on);
		erase_button.element.disable();
		
		if(erase_on === true){
			undo_button.element.disable();		
		}
	}
	
}

var change_chips_bg = function(_id, _value){
	$('#'+_id).css("background","");	
	if(_value>=0 && _value<=4 ){
		$('#'+_id).css("background","url("+gameAssets.bet_1.src+") no-repeat center");
	}else if(_value>4 && _value<=9){
		$('#'+_id).css("background","url("+gameAssets.bet_5.src+") no-repeat center");
	}else if(_value>9 && _value<=49){
		$('#'+_id).css("background","url("+gameAssets.bet_10.src+") no-repeat center");
	}else if(_value>49 && _value<=99){
		$('#'+_id).css("background","url("+gameAssets.bet_50.src+") no-repeat center");
	}else if(_value>99){
		$('#'+_id).css("background","url("+gameAssets.bet_100.src+") no-repeat center");
	}	
}

//show hide popup functionality
function show_hide_popup(_id, _show){
    
    if(_show == true){
        $("#no_more_Bet").toggleClass("displayNone", true);
        $("#msg").html("");
        if(_id == "noMoreBet"){
            $("#no_more_Bet").toggleClass("displayNone", false);
            $("#msg").html('The maximum allowed bet is '+max+'.');
        }else if(_id == "credit_limit"){
            $("#no_more_Bet").toggleClass("displayNone", false);
            $("#msg").html("Your bet amount exceeds your credits.");            
        }else if(_id == "insufficient_bal"){            
            $("#no_more_Bet").toggleClass("displayNone", false);
            $("#msg").html("Insufficient Balance."); 
        }else if(_id == "timer_start"){
            $("#no_more_Bet").toggleClass("displayNone", false);
            $("#msg").html("Please wait for the next game.");
        } else if(_id == "server_error"){
            $("#no_more_Bet").toggleClass("displayNone", false);
            $("#msg").html("Server Error! Your bet amount will be recovered.");
        } else if(_id == "connection_error"){
            $("#no_more_Bet").toggleClass("displayNone", false);
            $("#msg").html("Connection Error! Please contact the administrator.");
        } 
    }else{
        $("#no_more_Bet").toggleClass("displayNone", true);
        $("#msg").html("");
    }
    
    setTimeout(close_popup, 5000);
    
}

function close_popup(){
    $("#no_more_Bet").toggleClass("displayNone", true);
    $("#msg").html("");
}

//rebet functionality
function rebet(){
	playGame = true;
    
    //remove all win highlighting/blinking
	blink_stop();
    
	
	for(var i=0; i<rebetArr.length; i++){
		totalBet += rebetArr[i].value;
	}
    
    if(totalBet<=userBalance){
		betArray = rebetArr;		
        for(var i=0; i<betArray.length; i++){
            var get_val = 0;
            for(var j=0; j<betArray.length; j++){
                if(betArray[i].id == betArray[j].id){
                    get_val += parseInt(betArray[j].value);                
                }
                $("#"+betArray[i].id).html(get_val);	
            }                
            update("totalBet",{totalBet:totalBet});
            $('#'+betArray[i].id).css("background","");
            if(get_val>=0 && get_val<=4 ){
                $('#'+betArray[i].id).css("background","url("+gameAssets.bet_1.src+") no-repeat center");
            }else if(get_val>4 && get_val<=9){
                $('#'+betArray[i].id).css("background","url("+gameAssets.bet_5.src+") no-repeat center");
            }else if(get_val>9 && get_val<=49){
                $('#'+betArray[i].id).css("background","url("+gameAssets.bet_10.src+") no-repeat center");
            }else if(get_val>49 && get_val<=99){
                $('#'+betArray[i].id).css("background","url("+gameAssets.bet_50.src+") no-repeat center");
            }else if(get_val>99){
                $('#'+betArray[i].id).css("background","url("+gameAssets.bet_100.src+") no-repeat center");
            }
        }
        alignFont();
		Rconnect.send('START_BET');
    }else{
        totalBet = 0;
        update("totalBet",{totalBet:totalBet});
         for(var i=0; i<betArray.length; i++){
            $("#"+betArray[i].id).html("");
            $('#'+betArray[i].id).css("background","");
         }
        show_hide_popup("credit_limit", true);
    }
	
    //erase button functionality
	if(betArray.length>0){	   
		erase_on = false;
		eraseButton(erase_on);
		erase_button.element.disable();
		erase_button.element.enable();

		rebet_button.element.disable();
		clearBet_button.element.disable();
		undo_button.element.disable();
		
		clearBet_button.element.enable();		
		//undo_button.element.enable();
	}
	
	show_amount(betArray);
	
    //update win amount
	winAmount = 0;
	update("total_win",{totalWin:0});
}

//clear bet functionality
function clear_bet(){
	$(".choice").css("background", "");
	$(".choice").html("");
	$('.win_amount').hide();
	$('.win_amount').removeClass('win');
	$('.win_amount').html("");
    //remove all win highlighting/blinking
	blink_stop();
	
	//erase button functionality
    erase_on = false;
	eraseButton(erase_on);
	erase_button.element.disable();
    //all data reset with betArray (betArray = []) data
	betArray = [];
	diceNumber = [];
	diceSum = 0;
	winAmount = 0;
	winningBets = [];
	playGame = true;
	clearBet_button.element.disable();
	undo_button.element.disable();
	totalBet = 0;
	totalWin = 0;
	update("totalBet",{totalBet:totalBet});
	update("total_win",{totalWin:totalWin});
	//highlight_first_his(false);
}

//button enable functionality
function button_enable(){
	button_disable();
	
	clearBet_button.element.enable();
	rebet_button.element.enable();
	
	bet1_button.element.enable();
	bet5_button.element.enable();
	bet10_button.element.enable();
	bet50_button.element.enable();
	bet100_button.element.enable();
	
	bet_button_disble();
	
}

//button bet/chips disable functionality
function bet_button_disble(){
    if(bet_val == 1){
		bet1_button.element.disable();
	}else if(bet_val == 5){
		bet5_button.element.disable();
	}else if(bet_val == 10){
		bet10_button.element.disable();
	}else if(bet_val == 50){
		bet50_button.element.disable();
	}else if(bet_val == 100){
		bet100_button.element.disable();
	}
}

//button disable functionality
function button_disable(){
	clearBet_button.element.disable();
	rebet_button.element.disable();
	undo_button.element.disable();
	erase_button.element.disable();
	
	bet1_button.element.disable();
	bet5_button.element.disable();
	bet10_button.element.disable();
	bet50_button.element.disable();
	bet100_button.element.disable();
    
    var temp_bet1_button = new object(document, "#bet1_button");
	temp_bet1_button.element = new buttonObject(temp_bet1_button.element, 	gameAssets.bet1_button.src);
	
	var temp_bet5_button = new object(document, "#bet5_button");
	temp_bet5_button.element = new buttonObject(temp_bet5_button.element, 	gameAssets.bet5_button.src);
	
	var temp_bet10_button = new object(document, "#bet10_button");
	temp_bet10_button.element = new buttonObject(temp_bet10_button.element, 	gameAssets.bet10_button.src);
	
	var temp_bet50_button = new object(document, "#bet50_button");
	temp_bet50_button.element = new buttonObject(temp_bet50_button.element, 	gameAssets.bet50_button.src);
	
	var temp_bet100_button = new object(document, "#bet100_button");
	temp_bet100_button.element = new buttonObject(temp_bet100_button.element, 	gameAssets.bet100_button.src);
	
	if(bet_val == 1){
		bet1_button.element.disable();		
		var temp_bet1_button = new object(document, "#bet1_button");
		temp_bet1_button.element = new buttonObject(temp_bet1_button.element, 	gameAssets.bet1_button_disable.src);
	}else if(bet_val == 5){
		bet5_button.element.disable();
		var temp_bet5_button = new object(document, "#bet5_button");
		temp_bet5_button.element = new buttonObject(temp_bet5_button.element, 	gameAssets.bet5_button_disable.src);
	}else if(bet_val == 10){
		bet10_button.element.disable();
		var temp_bet10_button = new object(document, "#bet10_button");
		temp_bet10_button.element = new buttonObject(temp_bet10_button.element, 	gameAssets.bet10_button_disable.src);
	}else if(bet_val == 50){
		bet50_button.element.disable();
		var temp_bet50_button = new object(document, "#bet50_button");
		temp_bet50_button.element = new buttonObject(temp_bet50_button.element, 	gameAssets.bet50_button_disable.src);
	}else if(bet_val == 100){
		bet100_button.element.disable();
		var temp_bet100_button = new object(document, "#bet100_button");
		temp_bet100_button.element = new buttonObject(temp_bet100_button.element, 	gameAssets.bet100_button_disable.src);
	}
}

function checkWin(betType, diceNumber){
	var diceSum = diceNumber[0]+diceNumber[1]+diceNumber[2];
	var winType=new Array(); //store type of wins 
	var winAmount=0; //stores the win amount
	var winAmountShow = {}
	var betAmountList = {}
	switch(diceSum){
		case 4: winType.push("s4");
				winType.push("s");
				break;
		case 5: winType.push("s5");
				winType.push("s");
				break;
		case 6: winType.push("s6");
				winType.push("s");
				break;
		case 7: winType.push("s7");
				winType.push("s");
				break;
		case 8: winType.push("s8");
				winType.push("s");
				break;
		case 9: winType.push("s9");
				winType.push("s");
				break;
		case 10:winType.push("s10");
				winType.push("s");
				break;
		case 11:winType.push("s11");
				winType.push("b");
				break;
		case 12:winType.push("s12");
				winType.push("b");
				break;
		case 13:winType.push("s13");
				winType.push("b");	
				break;
		case 14:winType.push("s14");
				winType.push("b");
				break;
		case 15:winType.push("s15");
				winType.push("b");
				 break;
		case 16:winType.push("s16");
				winType.push("b");
				break;
		case 17:winType.push("s17");
				winType.push("b");
				break;			
	}//End switch
	
	var numberFreq= new Array(0,0,0,0,0,0,0); //stores the frequency of each number on three dice
		
	for(var i=0;i<diceNumber.length;i++){
		numberFreq[(diceNumber[i])]++;
	}//End $i


	for(var num=1;num<numberFreq.length;num++){

		if(numberFreq[num]==1){
			//win of any number on one dice
			switch(num){
				case 1: winType.push("one_1");
						break;
				case 2: winType.push("two_1");
						break;
				case 3: winType.push("three_1");
						break;
				case 4: winType.push("four_1");
						break;
				case 5: winType.push("five_1");
						break;
				case 6: winType.push("six_1");
						break;										
			}//End switch				
		}else if(numberFreq[num]==2){
			//win of any number on two dice
			switch(num){
				case 1: winType.push("one_2");
						winType.push("d1");
						break;
				case 2: winType.push("two_2");
						winType.push("d2");
						break;
				case 3: winType.push("three_2");
						winType.push("d3");
						break;
				case 4: winType.push("four_2");
						winType.push("d4");
						break;
				case 5: winType.push("five_2");
						winType.push("d5");
						break;
				case 6: winType.push("six_2");
						winType.push("d6");
						break;										
			}//End switch				
		}else if(numberFreq[num]==3){
			//win of any number on three dice
			switch(num){
				case 1: winType.push("one_3");
						winType.push("t1");
						winType.push("anyTriple");
						winType.push("d1");
						break;
				case 2: winType.push("two_3");
						winType.push("t2");							
						winType.push("anyTriple");
						winType.push("d2");
						var index = winType.indexOf("s");
						winType.splice(index, 1);
						break;
				case 3: winType.push("three_3");
						winType.push("t3");
						winType.push("anyTriple");
						winType.push("d3");					
						var index = winType.indexOf("s");
						winType.splice(index, 1);
						break;
				case 4: winType.push("four_3");
						winType.push("t4");
						winType.push("anyTriple");
						winType.push("d4");					
						var index = winType.indexOf("b");
						winType.splice(index, 1);					
						break;
				case 5: winType.push("five_3");
						winType.push("t5");
						winType.push("anyTriple");
						winType.push("d5");					
						var index = winType.indexOf("b");
						winType.splice(index, 1);
						break;
				case 6: winType.push("six_3");
						winType.push("t6");
						winType.push("anyTriple");
						winType.push("d6");
						break;										
			}//End switch				
		}//End ifelse

	}//End num
	
	if((numberFreq[1]>=1)&&(numberFreq[2]>=1)){
		winType.push("pair12");	
	} if((numberFreq[1]>=1)&&(numberFreq[3]>=1)){
		winType.push("pair13");	
	} if((numberFreq[1]>=1)&&(numberFreq[4]>=1)){
		winType.push("pair14");	
	} if((numberFreq[1]>=1)&&(numberFreq[5]>=1)){
		winType.push("pair15");	
	} if((numberFreq[1]>=1)&&(numberFreq[6]>=1)){
		winType.push("pair16");	
	} if((numberFreq[2]>=1)&&(numberFreq[3]>=1)){
		winType.push("pair23");	
	} if((numberFreq[2]>=1)&&(numberFreq[4]>=1)){
		winType.push("pair24");	
	} if((numberFreq[2]>=1)&&(numberFreq[5]>=1)){
		winType.push("pair25");	
	} if((numberFreq[2]>=1)&&(numberFreq[6]>=1)){
		winType.push("pair26");	
	} if((numberFreq[3]>=1)&&(numberFreq[4]>=1)){
		winType.push("pair34");	
	} if((numberFreq[3]>=1)&&(numberFreq[5]>=1)){
		winType.push("pair35");	
	} if((numberFreq[3]>=1)&&(numberFreq[6]>=1)){
		winType.push("pair36");	
	} if((numberFreq[4]>=1)&&(numberFreq[5]>=1)){
		winType.push("pair45");	
	} if((numberFreq[4]>=1)&&(numberFreq[6]>=1)){
		winType.push("pair46");	
	} if((numberFreq[5]>=1)&&(numberFreq[6]>=1)){
		winType.push("pair56");	
	}
	
	//echo $winType
	//allocating win according to the player bet type
	for(var k=0;k<betType.length;k++){
		//console.log(betType[k].value,betType[k].id);
		betAmount=betType[k].value;
		var keyIndx = betType[k].id;
		
		if((keyIndx in betAmountList)) 
			betAmountList[keyIndx] += betAmount;
		else 
			betAmountList[keyIndx] = betAmount;
			
		switch(keyIndx){				
			case "1": for(var j=0;j<winType.length;j++){
							var winAmt = 0;
							if(winType[j]=="one_1"){
								winAmt = ((1*betAmount)+betAmount);
							}else if(winType[j]=="one_2"){
								winAmt = ((2*betAmount)+betAmount);
							}else if(winType[j]=="one_3"){
								winAmt = ((3*betAmount)+betAmount);
							}
							winAmount+= winAmt;
							if((keyIndx in winAmountShow)) 
								winAmountShow[keyIndx] += winAmt;
							else 
								winAmountShow[keyIndx] = winAmt;
				
						}//End j
						break;
			case "2": for(var j=0;j<winType.length;j++){
							var winAmt = 0;
							if(winType[j]=="two_1"){
								winAmt+=((1*betAmount)+betAmount);	
							}else if(winType[j]=="two_2"){
								winAmt+=((2*betAmount)+betAmount);
							}else if(winType[j]=="two_3"){
								winAmt+=((3*betAmount)+betAmount);
							}				
							winAmount+= winAmt;
							if((keyIndx in winAmountShow)) 
								winAmountShow[keyIndx] += winAmt;
							else 
								winAmountShow[keyIndx] = winAmt;
						}//End j
						break;
			case "3": for(var j=0;j<winType.length;j++){
							var winAmt = 0;
							if(winType[j]=="three_1"){
								winAmt+=((1*betAmount)+betAmount);
							}else if(winType[j]=="three_2"){
								winAmt+=((2*betAmount)+betAmount);
							}else if(winType[j]=="three_3"){
								winAmt+=((3*betAmount)+betAmount);	
							}
							winAmount+= winAmt;
							if((keyIndx in winAmountShow)) 
								winAmountShow[keyIndx] += winAmt;
							else 
								winAmountShow[keyIndx] = winAmt;
						}//End j
						break;
			case "4": for(var j=0;j<winType.length;j++){
							var winAmt = 0;
							if(winType[j]=="four_1"){
								winAmt+=((1*betAmount)+betAmount);
							}else if(winType[j]=="four_2"){
								winAmt+=((2*betAmount)+betAmount);
							}else if(winType[j]=="four_3"){
								winAmt+=((3*betAmount)+betAmount);
							}
							winAmount+= winAmt;
							if((keyIndx in winAmountShow)) 
								winAmountShow[keyIndx] += winAmt;
							else 
								winAmountShow[keyIndx] = winAmt;
						}//End j
						break;
			case "5": for(var j=0;j<winType.length;j++){
							var winAmt = 0;
							if(winType[j]=="five_1"){
								winAmt+=((1*betAmount)+betAmount);
							}else if(winType[j]=="five_2"){
								winAmt+=((2*betAmount)+betAmount);
							}else if(winType[j]=="five_3"){
								winAmt+=((3*betAmount)+betAmount);
							}
							winAmount+= winAmt;
							if((keyIndx in winAmountShow)) 
								winAmountShow[keyIndx] += winAmt;
							else 
								winAmountShow[keyIndx] = winAmt;
						}//End j
						break;
			case "6": for(var j=0;j<winType.length;j++){
							var winAmt = 0;
							if(winType[j]=="six_1"){
								winAmt+=((1*betAmount)+betAmount);
							}else if(winType[j]=="six_2"){
								winAmt+=((2*betAmount)+betAmount);
							}else if(winType[j]=="six_3"){
								winAmt+=((3*betAmount)+betAmount);
							}
							winAmount+= winAmt;
							if((keyIndx in winAmountShow)) 
								winAmountShow[keyIndx] += winAmt;
							else 
								winAmountShow[keyIndx] = winAmt;
						}//End j
						break;
			case "s": for(var j=0;j<winType.length;j++){
							var winAmt = 0;
							if(winType[j]=="s"){
								winAmt+=((1*betAmount)+betAmount);									
							}
							winAmount+= winAmt;
							if((keyIndx in winAmountShow)) 
								winAmountShow[keyIndx] += winAmt;
							else 
								winAmountShow[keyIndx] = winAmt;
						}//End j
						break;
			case "b": for(var j=0;j<winType.length;j++){
							var winAmt = 0;
							if(winType[j]=="b"){
								winAmt+=((1*betAmount)+betAmount);									
							}
							winAmount+= winAmt;
							if((keyIndx in winAmountShow)) 
								winAmountShow[keyIndx] += winAmt;
							else 
								winAmountShow[keyIndx] = winAmt;
						}//End j
						break;
			case "s4": for(var j=0;j<winType.length;j++){
							var winAmt = 0;
							if(winType[j]=="s4"){
								winAmt+=((50*betAmount)+betAmount);									
							}
							winAmount+= winAmt;
							if((keyIndx in winAmountShow)) 
								winAmountShow[keyIndx] += winAmt;
							else 
								winAmountShow[keyIndx] = winAmt;
						}//End j
						break;
			case "s5": for(var j=0;j<winType.length;j++){
							var winAmt = 0;
							if(winType[j]=="s5"){
								winAmt+=((18*betAmount)+betAmount);									
							}
							winAmount+= winAmt;
							if((keyIndx in winAmountShow)) 
								winAmountShow[keyIndx] += winAmt;
							else 
								winAmountShow[keyIndx] = winAmt;
						}//End j
						break;
			case "s6": for(var j=0;j<winType.length;j++){
							var winAmt = 0;
							if(winType[j]=="s6"){
								winAmt+=((14*betAmount)+betAmount);									
							}
							winAmount+= winAmt;
							if((keyIndx in winAmountShow)) 
								winAmountShow[keyIndx] += winAmt;
							else 
								winAmountShow[keyIndx] = winAmt;
						}//End j
						break;
			case "s7": for(var j=0;j<winType.length;j++){
							var winAmt = 0;
							if(winType[j]=="s7"){
								winAmt+=((12*betAmount)+betAmount);									
							}
							winAmount+= winAmt;
							if((keyIndx in winAmountShow)) 
								winAmountShow[keyIndx] += winAmt;
							else 
								winAmountShow[keyIndx] = winAmt;
						}//End j
						break;
			case "s8": for(var j=0;j<winType.length;j++){
							var winAmt = 0;
							if(winType[j]=="s8"){
								winAmt+=((8*betAmount)+betAmount);									
							}
							winAmount+= winAmt;
							if((keyIndx in winAmountShow)) 
								winAmountShow[keyIndx] += winAmt;
							else 
								winAmountShow[keyIndx] = winAmt;
						}//End j
						break;
			case "s9": for(var j=0;j<winType.length;j++){
							var winAmt = 0;
							if(winType[j]=="s9"){
								winAmt+=((6*betAmount)+betAmount);									
							}
							winAmount+= winAmt;
							if((keyIndx in winAmountShow)) 
								winAmountShow[keyIndx] += winAmt;
							else 
								winAmountShow[keyIndx] = winAmt;
						}//End j
						break;
			case "s10": for(var j=0;j<winType.length;j++){
							var winAmt = 0;
							if(winType[j]=="s10"){
								winAmt+=((6*betAmount)+betAmount);									
							}
							winAmount+= winAmt;
							if((keyIndx in winAmountShow)) 
								winAmountShow[keyIndx] += winAmt;
							else 
								winAmountShow[keyIndx] = winAmt;
						}//End j
						break;
			case "s11": for(var j=0;j<winType.length;j++){
							var winAmt = 0;
							if(winType[j]=="s11"){
								winAmt+=((6*betAmount)+betAmount);									
							}
							winAmount+= winAmt;
							if((keyIndx in winAmountShow)) 
								winAmountShow[keyIndx] += winAmt;
							else 
								winAmountShow[keyIndx] = winAmt;
						}//End j
						break;
			case "s12": for(var j=0;j<winType.length;j++){
							var winAmt = 0;
							if(winType[j]=="s12"){
								winAmt+=((6*betAmount)+betAmount);									
							}
							winAmount+= winAmt;
							if((keyIndx in winAmountShow)) 
								winAmountShow[keyIndx] += winAmt;
							else 
								winAmountShow[keyIndx] = winAmt;
						}//End j
						break;
			case "s13": for(var j=0;j<winType.length;j++){
							var winAmt = 0;
							if(winType[j]=="s13"){
								winAmt+=((8*betAmount)+betAmount);									
							}
							winAmount+= winAmt;
							if((keyIndx in winAmountShow)) 
								winAmountShow[keyIndx] += winAmt;
							else 
								winAmountShow[keyIndx] = winAmt;
						}//End j
						break;
			case "s14": for(var j=0;j<winType.length;j++){
							var winAmt = 0;
							if(winType[j]=="s14"){
								winAmt+=((12*betAmount)+betAmount);									
							}
							winAmount+= winAmt;
							if((keyIndx in winAmountShow)) 
								winAmountShow[keyIndx] += winAmt;
							else 
								winAmountShow[keyIndx] = winAmt;
						}//End j
						break;
			case "s15": for(var j=0;j<winType.length;j++){
							var winAmt = 0;
							if(winType[j]=="s15"){
								winAmt+=((14*betAmount)+betAmount);									
							}
							winAmount+= winAmt;
							if((keyIndx in winAmountShow)) 
								winAmountShow[keyIndx] += winAmt;
							else 
								winAmountShow[keyIndx] = winAmt;
						}//End j
						break;
			case "s16": for(var j=0;j<winType.length;j++){
							var winAmt = 0;
							if(winType[j]=="s16"){
								winAmt+=((18*betAmount)+betAmount);									
							}
							winAmount+= winAmt;
							if((keyIndx in winAmountShow)) 
								winAmountShow[keyIndx] += winAmt;
							else 
								winAmountShow[keyIndx] = winAmt;
						}//End j
						break;
			case "s17": for(var j=0;j<winType.length;j++){
							var winAmt = 0;
							if(winType[j]=="s17"){
								winAmt+=((50*betAmount)+betAmount);									
							}
							winAmount+= winAmt;
							if((keyIndx in winAmountShow)) 
								winAmountShow[keyIndx] += winAmt;
							else 
								winAmountShow[keyIndx] = winAmt;
						}//End j
						break;
			case "d1": for(var j=0;j<winType.length;j++){
							var winAmt = 0;
							if(winType[j]=="d1"){
								winAmt+=((8*betAmount)+betAmount);									
							}
							winAmount+= winAmt;
							if((keyIndx in winAmountShow)) 
								winAmountShow[keyIndx] += winAmt;
							else 
								winAmountShow[keyIndx] = winAmt;
						}//End j
						break;
			case "d2": for(var j=0;j<winType.length;j++){
							var winAmt = 0;
							if(winType[j]=="d2"){
								winAmt+=((8*betAmount)+betAmount);									
							}
							winAmount+= winAmt;
							if((keyIndx in winAmountShow)) 
								winAmountShow[keyIndx] += winAmt;
							else 
								winAmountShow[keyIndx] = winAmt;
						}//End j
						break;
			case "d3": for(var j=0;j<winType.length;j++){
							var winAmt = 0;
							if(winType[j]=="d3"){
								winAmt+=((8*betAmount)+betAmount);									
							}
							winAmount+= winAmt;
							if((keyIndx in winAmountShow)) 
								winAmountShow[keyIndx] += winAmt;
							else 
								winAmountShow[keyIndx] = winAmt;
						}//End j
						break;
			case "d4": for(var j=0;j<winType.length;j++){
							var winAmt = 0;
							if(winType[j]=="d4"){
								winAmt+=((8*betAmount)+betAmount);									
							}
							winAmount+= winAmt;
							if((keyIndx in winAmountShow)) 
								winAmountShow[keyIndx] += winAmt;
							else 
								winAmountShow[keyIndx] = winAmt;
						}//End j
						break;
			case "d5": for(var j=0;j<winType.length;j++){
							var winAmt = 0;
							if(winType[j]=="d5"){
								winAmt+=((8*betAmount)+betAmount);									
							}
							winAmount+= winAmt;
							if((keyIndx in winAmountShow)) 
								winAmountShow[keyIndx] += winAmt;
							else 
								winAmountShow[keyIndx] = winAmt;
						}//End j
						break;
			case "d6": for(var j=0;j<winType.length;j++){
							var winAmt = 0;
							if(winType[j]=="d6"){
								winAmt+=((8*betAmount)+betAmount);									
							}
							winAmount+= winAmt;
							if((keyIndx in winAmountShow)) 
								winAmountShow[keyIndx] += winAmt;
							else 
								winAmountShow[keyIndx] = winAmt;
						}//End j
						break;
			case "t1": for(var j=0;j<winType.length;j++){
							var winAmt = 0;
							if(winType[j]=="t1"){
								winAmt+=((150*betAmount)+betAmount);									
							}
							winAmount+= winAmt;
							if((keyIndx in winAmountShow)) 
								winAmountShow[keyIndx] += winAmt;
							else 
								winAmountShow[keyIndx] = winAmt;
						}//End j
						break;
			case "t2": for(var j=0;j<winType.length;j++){
							var winAmt = 0;
							if(winType[j]=="t2"){
								winAmt+=((150*betAmount)+betAmount);									
							}
							winAmount+= winAmt;
							if((keyIndx in winAmountShow)) 
								winAmountShow[keyIndx] += winAmt;
							else 
								winAmountShow[keyIndx] = winAmt;
						}//End j
						break;
			case "t3": for(var j=0;j<winType.length;j++){
							var winAmt = 0;
							if(winType[j]=="t3"){
								winAmt+=((150*betAmount)+betAmount);									
							}
							winAmount+= winAmt;
							if((keyIndx in winAmountShow)) 
								winAmountShow[keyIndx] += winAmt;
							else 
								winAmountShow[keyIndx] = winAmt;
						}//End j
						break;
			case "t4": for(var j=0;j<winType.length;j++){
							var winAmt = 0;
							if(winType[j]=="t4"){
								winAmt+=((150*betAmount)+betAmount);									
							}
							winAmount+= winAmt;
							if((keyIndx in winAmountShow)) 
								winAmountShow[keyIndx] += winAmt;
							else 
								winAmountShow[keyIndx] = winAmt;
						}//End j
						break;
			case "t5": for(var j=0;j<winType.length;j++){
								var winAmt = 0;
							if(winType[j]=="t5"){
								winAmt+=((150*betAmount)+betAmount);									
							}
							winAmount+= winAmt;
							if((keyIndx in winAmountShow)) 
								winAmountShow[keyIndx] += winAmt;
							else 
								winAmountShow[keyIndx] = winAmt;
						}//End j
						break;
			case "t6": for(var j=0;j<winType.length;j++){
								var winAmt = 0;
							if(winType[j]=="t6"){
								winAmt+=((150*betAmount)+betAmount);									
							}
							winAmount+= winAmt;
							if((keyIndx in winAmountShow)) 
								winAmountShow[keyIndx] += winAmt;
							else 
								winAmountShow[keyIndx] = winAmt;
						}//End j
						break;
			case "anyTriple": for(var j=0;j<winType.length;j++){
								var winAmt = 0;
								if(winType[j]=="anyTriple"){
									winAmt+=((24*betAmount)+betAmount);									
								}
								winAmount+= winAmt;
								if((keyIndx in winAmountShow)) 
									winAmountShow[keyIndx] += winAmt;
								else 
									winAmountShow[keyIndx] = winAmt;
							}//End j
							break;
			case "pair12": for(var j=0;j<winType.length;j++){
								var winAmt = 0;
								if(winType[j]=="pair12"){
									winAmt+=((5*betAmount)+betAmount);									
								}
								winAmount+= winAmt;
								if((keyIndx in winAmountShow)) 
									winAmountShow[keyIndx] += winAmt;
								else 
									winAmountShow[keyIndx] = winAmt;
							}//End j
							break;
			case "pair13": for(var j=0;j<winType.length;j++){
								var winAmt = 0;
								if(winType[j]=="pair13"){
									winAmt+=((5*betAmount)+betAmount);									
								}
								winAmount+= winAmt;
								if((keyIndx in winAmountShow)) 
									winAmountShow[keyIndx] += winAmt;
								else 
									winAmountShow[keyIndx] = winAmt;
							}//End j
							break;
			case "pair14": for(var j=0;j<winType.length;j++){
								var winAmt = 0;
								if(winType[j]=="pair14"){
									winAmt+=((5*betAmount)+betAmount);									
								}
								winAmount+= winAmt;
								if((keyIndx in winAmountShow)) 
									winAmountShow[keyIndx] += winAmt;
								else 
									winAmountShow[keyIndx] = winAmt;
							}//End j
							break;
			case "pair15": for(var j=0;j<winType.length;j++){
								var winAmt = 0;
								if(winType[j]=="pair15"){
									winAmt+=((5*betAmount)+betAmount);									
								}
								winAmount+= winAmt;
								if((keyIndx in winAmountShow)) 
									winAmountShow[keyIndx] += winAmt;
								else 
									winAmountShow[keyIndx] = winAmt;
							}//End j
							break;
			case "pair16": for(var j=0;j<winType.length;j++){
								var winAmt = 0;
								if(winType[j]=="pair16"){
									winAmt+=((5*betAmount)+betAmount);									
								}
								winAmount+= winAmt;
								if((keyIndx in winAmountShow)) 
									winAmountShow[keyIndx] += winAmt;
								else 
									winAmountShow[keyIndx] = winAmt;
							}//End j
							break;
			case "pair23": for(var j=0;j<winType.length;j++){
								var winAmt = 0;
								if(winType[j]=="pair23"){
									winAmt+=((5*betAmount)+betAmount);									
								}
								winAmount+= winAmt;
								if((keyIndx in winAmountShow)) 
									winAmountShow[keyIndx] += winAmt;
								else 
									winAmountShow[keyIndx] = winAmt;
				
							}//End j
							break;
			case "pair24": for(var j=0;j<winType.length;j++){
								var winAmt = 0;
								if(winType[j]=="pair24"){
									winAmt+=((5*betAmount)+betAmount);									
								}
								winAmount+= winAmt;
								if((keyIndx in winAmountShow)) 
									winAmountShow[keyIndx] += winAmt;
								else 
									winAmountShow[keyIndx] = winAmt;
							}//End j
							break;
			case "pair25": for(var j=0;j<winType.length;j++){
								var winAmt = 0;
								if(winType[j]=="pair25"){
									winAmt+=((5*betAmount)+betAmount);									
								}
								winAmount+= winAmt;
								if((keyIndx in winAmountShow)) 
									winAmountShow[keyIndx] += winAmt;
								else 
									winAmountShow[keyIndx] = winAmt;
							}//End j
							break;
			case "pair26": for(var j=0;j<winType.length;j++){
								var winAmt = 0;
								if(winType[j]=="pair26"){
									winAmt+=((5*betAmount)+betAmount);									
								}
								winAmount+= winAmt;
								if((keyIndx in winAmountShow)) 
									winAmountShow[keyIndx] += winAmt;
								else 
									winAmountShow[keyIndx] = winAmt;
							}//End j
							break;
			case "pair34": for(var j=0;j<winType.length;j++){
								var winAmt = 0;
								if(winType[j]=="pair34"){
									winAmt+=((5*betAmount)+betAmount);									
								}
								winAmount+= winAmt;
								if((keyIndx in winAmountShow)) 
									winAmountShow[keyIndx] += winAmt;
								else 
									winAmountShow[keyIndx] = winAmt;
							}//End j
							break;
			case "pair35": for(var j=0;j<winType.length;j++){
								var winAmt = 0;
								if(winType[j]=="pair35"){
									winAmt+=((5*betAmount)+betAmount);									
								}
								winAmount+= winAmt;
								if((keyIndx in winAmountShow)) 
									winAmountShow[keyIndx] += winAmt;
								else 
									winAmountShow[keyIndx] = winAmt;
							}//End j
							break;
			case "pair36": for(var j=0;j<winType.length;j++){
								var winAmt = 0;
								if(winType[j]=="pair36"){
									winAmt+=((5*betAmount)+betAmount);									
								}
								winAmount+= winAmt;
								if((keyIndx in winAmountShow)) 
									winAmountShow[keyIndx] += winAmt;
								else 
									winAmountShow[keyIndx] = winAmt;
							}//End j
							break;
			case "pair45": for(var j=0;j<winType.length;j++){
								var winAmt = 0;
								if(winType[j]=="pair45"){
									winAmt+=((5*betAmount)+betAmount);									
								}
								winAmount+= winAmt;
								if((keyIndx in winAmountShow)) 
									winAmountShow[keyIndx] += winAmt;
								else 
									winAmountShow[keyIndx] = winAmt;
							}//End j
							break;
			case "pair46": for(var j=0;j<winType.length;j++){
								var winAmt = 0;
								if(winType[j]=="pair46"){
									winAmt+=((5*betAmount)+betAmount);									
								}
								winAmount+= winAmt;
								if((keyIndx in winAmountShow)) 
									winAmountShow[keyIndx] += winAmt;
								else 
									winAmountShow[keyIndx] = winAmt;
							}//End j
							break;
			case "pair56": for(var j=0;j<winType.length;j++){
								var winAmt = 0;
								if(winType[j]=="pair56"){
									winAmt+=((5*betAmount)+betAmount);									
								}
								winAmount+= winAmt;
								if((keyIndx in winAmountShow)) 
									winAmountShow[keyIndx] += winAmt;
								else 
									winAmountShow[keyIndx] = winAmt;
							}//End j
							break;


		}//End switch			

	}//End $k
//console.log(winAmountShow);
	for(var i=0;i<winType.length;i++){
		if((winType[i]=="one_1")||(winType[i]=="one_2")||(winType[i]=="one_3")){
			winType[i]="1";
		}
		if((winType[i]=="two_1")||(winType[i]=="two_2")||(winType[i]=="two_3")){
			winType[i]="2";
		}
		if((winType[i]=="three_1")||(winType[i]=="three_2")||(winType[i]=="three_3")){
			winType[i]="3";
		}
		if((winType[i]=="four_1")||(winType[i]=="four_2")||(winType[i]=="four_3")){
			winType[i]="4";
		}
		if((winType[i]=="five_1")||(winType[i]=="five_2")||(winType[i]=="five_3")){
			winType[i]="5";
		}
		if((winType[i]=="six_1")||(winType[i]=="six_2")||(winType[i]=="six_3")){
			winType[i]="6";
		}
	}//End i

	////////////////return data/////////////////////////
	winData = {
		'diceNumber' : diceNumber,
		'diceSum' : diceSum,
		'winAmount' : winAmount,
		'winningBets' : winType,
		'winAmountShow' : winAmountShow,
		'betList': betAmountList
	}
	return winData;
}

var pocketNumber;
var get_data_from_server = false;

//websocket handler
function webSocketHandler() {	
		Rconnect = new WebSocket('ws://192.168.10.40:9001');//, 'dumb-increment-protocol');	
		//Rconnect = new WebSocket('ws://200.10.78.43:8088', 'dumb-increment-protocol');
		//Rconnect = new WebSocket(sicboUrl, 'dumb-increment-protocol');
		Rconnect.onopen = function () {
			Rconnect.send('STATE');
			Rconnect.send('TIME');
			
			audio_bgm.volume = 0.3;
			stopAudio(audio_bgm);
			playAudio(audio_bgm,true);
			
			var request = {'op': 'connect'}; //send connect to console db
			consoleHandler(request);
			
			
		};
		
		Rconnect.onerror = function () {
			show_hide_popup("connection_error", true);
			stop_bet();	
			betExit = 1;
			//clearInterval(time_counter);
			$("#timer").css({"bottom": "100%"});
			tspeed = 1000; 
			tprogress = 0;
			update("message",{message: message_arr[5]}); 
		};
		
		Rconnect.onclose = function () {
			show_hide_popup("connection_error", true);
			stop_bet();	
			betExit = 1;
			//clearInterval(time_counter);
			$("#timer").css({"bottom": "100%"});
			tspeed = 1000; 
			tprogress = 0;
			update("message",{message: message_arr[5]}); 
		};
		
		Rconnect.onmessage = function (message) {
			//$('.msgbox').append('<br>'+message.data);
			if(message.data == 'STRT') {
				//Hide win amount on new cycle start up
				update("total_win",{totalWin:totalWin});	
						
				betExit = 0;								
				//progress bar started
				update("message",{message: message_arr[1]}); 
				//allow betting
				playGame = true;
				click_type = false;
				$(".choice").toggleClass("cursorPointer", true);  
				$("#timer").css({"bottom": "-2%"});
				//clearInterval(time_counter); 
				tprogress = -1;				
			}
			
			if(message.data == 'NEXT') {
				betExit = 0;								
				//progress bar started
				update("message",{message: message_arr[1]}); 
				//allow betting
				playGame = true;
				click_type = false;
				$(".choice").toggleClass("cursorPointer", true);  
				$("#timer").css({"bottom": "-2%"});
				//clearInterval(time_counter); 
				tprogress = -1;	
				stopAudio(audio_placebet);
				setTimeout(playAudio(audio_placebet,false), 5000);
			}
			
			if(message.data == 'STOP') {
				//console.log('Game Stop');	
				stop_bet();	
				betExit = 1;
				//clearInterval(time_counter);
				$("#timer").css({"bottom": "100%"});
				tspeed = 1000; 
				tprogress = 0;
				
				stopAudio(audio_nobet);
				playAudio(audio_nobet,false);
				var request = {'op': 'bet', 'bet': parseInt(totalBet)}; //send bet amount to console db
				consoleHandler(request);
				setTimeout(dice_jump(), 2000);
			}
			
			if(message.data == 'OPEN') {
				//console.log('STATE:'+message.data);
				reset(1);
				playGame = true;
				click_type = false;
				$(".choice").toggleClass("cursorPointer", true); 
				update("message",{message: message_arr[1]});				
				
				stopAudio(audio_placebet);
				playAudio(audio_placebet,false);
			}
			
			if(message.data == 'CLOSE') {
				//console.log('STATE:'+message.data);
				stop_bet();	
				betExit = 1;
				tspeed = 1000; 
			}
			
			if(message.data.match('^SP')) {
				switch(message.data) {
					case 'SP1X':
						tspeed = 1000;
						timer_increase(tspeed, -2); 
						tprogress = 1;
					break;
					
					case 'SP2X':
						tspeed = tspeed/2;
					break;
					
					case 'SP3X':
						tspeed = tspeed/2;
					break;
				}
			}
			
			if(message.data.match('^TIME')) {
				var tArr =  message.data.split(":");
				var tcount = parseInt(tArr[1].replace(/[^0-9]/g, ""));
				//console.log(tcount);
				if(tcount) {
					if(playGame == true && tprogress == 0) {
						var tMeter = (tcount * 100) / bet_time;
						timer_increase(tspeed, tMeter); 
					}
				}
			}
			
			if(message.data.match('^E00')) {
				show_hide_popup("server_error", true);
				setTimeout(close_popup, 3000);
				userBalance = parseInt(userBalance) + parseInt(totalBet);
				update("userBalance",{userBalance:userBalance});
				reset(1);				
			}
			
			if(message.data.match('^N') && message.data != 'NEXT') {
				//console.log('Dice Values:'+message.data);			
				pocketNumber = (message.data.substring(1, 4)).split("");
				$.each(pocketNumber, function(index, value) {
					pocketNumber[index] = parseInt(value);
				});
				
				get_data_from_server = true;
				//dice_roll(pocketNumber);
			}
			
		};
};

/*
***  Backend Callback handler with Admin Console 
*/
function consoleHandler(data) {
	$.ajax({
		url: backendUrl,
		data: data,
		type: "POST",
		success: function(data,status){
			var reply = data
		},
		error : function(xhr, status, error){
			var reply = error;
		}
	}).done(function(reply) {
		var _received = JSON.parse(reply);
		
		if(data.op == 'history' && _received.success) {
			his_arr = _received.success;
			updateHistoryOnLoad();
		}
		
		if(data.op == 'config' && _received.success) {
			min = _received.success.min_bet;
			max = _received.success.max_bet;
			deno = _received.success.currency;
			bet_time = _received.success.bet_time;
		}
		
	}).fail(function(xhr, status, error) {
		//handle failure
	});
}

//update history with server data
function updateHistoryOnLoad(){
	$("#history").html("");
    for(var i=0; i<his_arr.length; i++){
        var length = parseInt(his_arr.length - 1);
        var dice_num1 = his_arr[length-i][0];
        var dice_num2 = his_arr[length-i][1];
        var dice_num3 = his_arr[length-i][2];
		
		if( (dice_num1+dice_num2+dice_num3) % 2 == 0){
			var dice_even_odd = "E";
		}else{
			var dice_even_odd = "O";
		}
		
		if((dice_num1+dice_num2+dice_num3) >=11){
			var winType = "B";
		}else{
			var winType = "S";
		}
		//console.log(temp,temp1,temp2)
		//var temp_dice = '<div class="fullWidth row relative"><div class="left absolute"><img src="'+gameAssets["dice_"+his_arr[length-i][0]].src+'"><img src="'+gameAssets["dice_"+his_arr[length-i][1]].src+'"><img src="'+gameAssets["dice_"+his_arr[length-i][2]].src+'"></div><div class="right absolute textCapitalize">'+history_win_type[length-i]+'</div></div>';
		var temp_dice = '<div class="fullWidth row relative '+winType+'"><div class="left absolute"><div class="his_col">'+dice_num1+'</div><div class="his_col">'+dice_num2+'</div><div class="his_col">'+dice_num3+'</div></div><div class="right absolute textCapitalize"><div id="his_total_val" class="his_col">'+(dice_num1+dice_num2+dice_num3)+'</div><div id="his_win_type" class="his_col">'+winType+'</div><div id="his_even_odd" class="his_col odd '+dice_even_odd+'">'+dice_even_odd+'</div></div></div>';
        $( "#history" ).append( temp_dice );
    }
}

var dice_jump = function(){
	show_dice(false, Array());
	//document.getElementById("dice_sprite").src = gameAssets.dice_sprite_loop.src;
	document.getElementById("dice_sprite_cont").classList.remove("displayNone");
	//$('main .dice_cont #dice_sprite').addClass('dice_jump');
	//document.getElementById("dice_sprite_cont").classList.add("dice_jump");
	setTimeout(function(){
		get_data_from_server = true;
	},6000);
	stopAudio(audio_diceRoll_loop);
	playAudio(audio_diceRoll_loop,false);
	var frame = 39;
	
	var row = 0;
	var col = 0;
	clearInterval(dice_roll_timer);
	dice_roll_timer = setInterval(function(){
			row = Math.floor(frame/13);
			col = frame%13;
			
			$("#dice_sprite").css("top",(-100*row)+"%");
			$("#dice_sprite").css("left",(-100*col)+"%");
			
			frame++;
			if(frame === 86){
				frame=39;	
				
				if(get_data_from_server){					
					get_data_from_server = false;										
					clearInterval(dice_roll_timer);
					dice_roll(pocketNumber);	
					//var winData = checkWin(betArray, pocketNumber);	
					//show_win(winData);
					//document.getElementById("dice_sprite_cont").classList.add("displayNone");					
					//document.getElementById("dice_sprite_cont").classList.remove("dice_jump");
				}else{					
					row = 0;
					col = 0;					
					stopAudio(audio_diceRoll_loop);
					playAudio(audio_diceRoll_loop,false);
				}
				
			}
	},1000/24);
}

var dice_roll_timer;
//ball box jumping animation 
var dice_roll = function(pocketNumber){
	
	"use strict";
	
	stopAudio(audio_diceRoll);
	playAudio(audio_diceRoll,false);
	
	//document.getElementById("dice_sprite").src = gameAssets.dice_sprite.src;
	show_dice(false, Array());
	
	var frame = 0;
	
	var row = 0;
	var col = 0;
	clearInterval(dice_roll_timer);
	dice_roll_timer = setInterval(function(){
			row = Math.floor(frame/13);
			col = frame%13;
			
			$("#dice_sprite").css("top",(-100*row)+"%");
			$("#dice_sprite").css("left",(-100*col)+"%");
			
			frame++;
			if(frame === 39){
				frame=0;						
				clearInterval(dice_roll_timer);	
				var winData = checkWin(betArray, pocketNumber);	
				show_win(winData);
				document.getElementById("dice_sprite_cont").classList.add("displayNone");
			}
	},1000/30);
};
