var min = 4;
var sec = 59;
var timer;
var timeon = 0;
var _time = min + ":" + sec;
function ActivateTimer() {
	if (timeon != 1) {
		timeon = 1;
		Timer();
	}
}

function Stop() {
	if (timeon = 1) {
	timeon = 0;
	  document.getElementById("pauseLabel").innerHTML ="PAWSED";
		Timer();
	
	}
}
function Reset() {

min = 4;
sec = 59;
_time = min + ":" + sec;	
document.getElementById("timeLabel").innerHTML =_time;

}
function Timer() {

_time = min + ":" + sec;
	document.getElementById("timeLabel").innerHTML =_time;
	if (_time != "0:0" && timeon != 0) {
		document.getElementById("pauseLabel").innerHTML ="";
		if (sec == 0) {
			min = min - 1;
			sec = 59;
		} else {
			sec = sec - 1;
		}
		timer = setTimeout("Timer()", 1000);
	}
	else {
		sec = sec - 0;
	}
}

			