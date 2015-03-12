//========= Data ===========
var rawCsv = "Lastname, Firstname, Email, Phone\n" + 
"Harry, Larry, lh@larry.com, 610-555-3456\n" +
"Fine, Moe, mf@moe.com, 610-555-1234\n" +
"Cue, Curly, cc@curly.com, 610-555-2345\n"
;

var ajax = new XMLHttpRequest();
/*
	An array of all the lines from the csv file..
	without the first header line
*/
var lines = "";

var i = 0;
//========== Event Handlers =============
window.onload = function(){
	adjustRem();
	getCsv();
	//alert();
}
//-----------------------------------
window.onresize = function(){
	adjustRem();
}
//------------------------------------
ajax.onload = function(){
	if(ajax.status === 200 || ajax.status === 0){
		//alert(ajax.response);
		//save the csv data in the rawCsv variable
		rawCsv = ajax.response;
		fillList();
	}
	else{
		alert("Trouble getting data.");
	}
}
//---------------------------------------
O("list").onchange = function(){
	/* wipe out the current email and phone
		 if the user selects the top prompt
	*/
	if(O("list").selectedIndex === 0){
		O("email").innerHTML = "";
		O("phone").innerHTML = "";
		return;
	}
	else{
		//show the email address and the phone number
		//alert();
		i = O("list").selectedIndex - 1;
		//alert(" The index selected is: " + i + "\nbut this corresponds to " + lines[i]);
		var currentLine = lines[i].split(",");
		O("email").innerHTML = currentLine[2];
		O("phone").innerHTML = currentLine[3];
	}
}
//-----------------------------------
O("email").onclick = function(){
	var OK = confirm("OK to send Email?\n(otherwise click Cancel)");
	if(OK){
		document.location = "mailto: " + O("email").innerHTML; 
	}
}
//=========== Functions ==========
function getCsv(){
	ajax.open("GET","contacts.csv",true);
	ajax.send();
}

//----------------------------
function adjustRem(){
	//document.documentElement is the "Root" element of a webpage
	S(document.documentElement).fontSize = innerWidth/100 + "px";
}
//------------------
function fillList(){
	O("list").innerHTML = "";
	O("list").innerHTML += "<option> - Choose Contact below - </option>";
	makeLines();
	// just add the names to the list, not the other info
	for(var i = 0; i < lines.length; i++){
		var currentLine = lines[i].split(",");
		var currentName = currentLine[1] + " " + currentLine[0];
		O("list").innerHTML += "<option>" + currentName + "</option>"
	}
}
//------------------
function makeLines(){
	lines = rawCsv.split("\n");
	//We don't want the top line: lines[0]
	var topLess = [];
	//grab all but the top line (start i = 1)
	for(i = 1; i < lines.length; i++){
	//fill topLess by pushing all but the top line
		topLess.push(lines[i]);
	}
	//Alphabetize the contacts with .sort() method
	topLess.sort();
	//copy the alphabetized topLess data into the lines variable
	lines = topLess;
}