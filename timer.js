var initMin = "5";				//enter as '0' instead of '00'
var initSec = "0";				//enter as '0' instead of '00'
var statusGO = "GO!!"
var statusPaused = "PAWSED!"
var statusDone = "TIME UP!"
var min = initMin;
var sec = initSec;
var n=sec.toFixed(0);
var timer;
var timeon = 0;					//time is off (0)
var _time = min + ":" + sec;	


//Button for 'start'.
function ActivateTimer() {
	if (timeon != 1) {
		timeon = 1;
		Timer();
	}
}

//Button for 'stop'.
function Stop() {
	if (timeon = 1) {
		timeon = 0;
		document.getElementById("statusLabel").innerHTML =statusPaused;
		Timer();

	}
}

//Button for 'reset'.
function Reset() {
	min = initMin;
	sec = initSec;
	formatTime();
	document.getElementById("statusLabel").innerHTML = "";
	document.getElementById("timeLabel").innerHTML =_time;
}

function formatTime () {
	
		if (sec > 9 | min > 9) {
		_time = min + ":" + sec;									
		} 	
		if (sec < 10) {
			_time = min + ":0" + sec;
		}
		if (min < 10) {
			_time = "0" + min + ":" + sec;
		}
		if (min < 10 & sec < 10) {
			_time = "0" + min + ":0" + sec;
		}
	document.getElementById("timeLabel").innerHTML =_time;		
}

function Timer() {

	formatTime();
	
	if (_time != "00:00" & timeon != 0) {			
	document.getElementById("statusLabel").innerHTML = statusGO;
			if (sec == 0) {
				min = min - 1;
				sec = 59;
			} 
			else {
				sec = sec - 1;
			}

		timer = setTimeout("Timer()", 1000);
	
	}
	
	if (_time == "00:00") {
		timeon = 0;
		sec = sec - 0;
		document.getElementById("statusLabel").innerHTML = statusDone;
	}

	else {
		sec = sec - 0;
	}
}
	


