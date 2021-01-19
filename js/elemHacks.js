window.onload = function()
{
	var AudioContext = window.AudioContext || window.webkitAudioContext;
	var context = new AudioContext();
	context.resume();
}


function setMode(number)
{
	modeDiv.scrollTop = parseInt(number)*342;
};

function openJsonFile(){
	var input = document.getElementById('jsoninput');
	if (window.File && window.FileReader && window.FileList && window.Blob) {
	    input.onchange = function(e){ 
		   	var file = e.target.files[0]; 
		   	var reader = new FileReader();
		   	reader.readAsText(file,'UTF-8');
		   	reader.onload = function(readerEvent){
		      	var content = readerEvent.target.result;
		     	json = JSON.parse(content);
				editor.l = 0;
				editor.z = 0;
				editor.zdata = json.world[editor.l].zone[editor.z];
				
				if(json.resource[0].src.startsWith("img/game")) {mapimg.src = "http://marioroyale.cyuubi.gq/" + json.resource[0].src}
				else {mapimg.src = json.resource[0].src;};
				if(json.resource[1].src.startsWith("img/game")) {objimg.src = "http://marioroyale.cyuubi.gq/" + json.resource[1].src}
				else {objimg.src = json.resource[1].src;};
		     	if (json.fileid === undefined) json.fileid = Math.random().toString(16).substr(2,8)+Math.random().toString(16).substr(2,8);
		     	setScrollbar();

		     	editor.update();
   			}

		}
	    input.click();

	} else {
	    alert('The File APIs are not fully supported in this browser.');
		}
}

function setScrollbar()
{
	scrollCanvasDiv.style.width = A2W(editor.zdata.layers[editor.y].data) > editor.RF(largeCanvasDiv.clientWidth) ? 
	editor.SF(A2W(editor.zdata.layers[editor.y].data))+"px" : "100%";
};

function addToStorage()
{
	if (localStorage.getItem(json.fileid) == null)
	{
		localStorage.setItem(json.fileid,JSON.stringify(json));
	} else
	{
		localStorage[json.fileid] = JSON.stringify(json);
	}
};

function updateJson (jsos)
{
	json = jsos;

	editor.zdata = json.world[editor.l].zone[editor.z];

	if(json.resource[0].src.startsWith("img/game")) {mapimg.src = "http://marioroyale.cyuubi.gq/" + json.resource[0].src}
	else {mapimg.src = json.resource[0].src;};
	if(json.resource[1].src.startsWith("img/game")) {objimg.src = "http://marioroyale.cyuubi.gq/" + json.resource[1].src}
	else {objimg.src = json.resource[1].src;};

	setScrollbar();
};

function doesFileExist(urlToFile) {
    var xhr = new XMLHttpRequest();
    xhr.open('HEAD', urlToFile, false);
    xhr.send();
     
    if (xhr.status == "404") {
        return false;
    } else {
        return true;
    }
}

function isHover(e) {return e.matches(":hover");};