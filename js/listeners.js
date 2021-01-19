function editorMouseMoveCall(event)
{
	editor.mousePos = [event.clientX,event.clientY];
	if (editor.mLC) {editor.place();};
	if (!(editor.mRC)) {editor.omP = [event.clientX,event.clientY];}
	else {editor.pick();};
};

editor.canvas.addEventListener("mousemove", editorMouseMoveCall);
editor.canvas.addEventListener("mousedown", function(event)
	{
		switch(event.button)
		{
			case 0:
				editor.place(); editor.mLC = true; break;
			case 2: 
				editor.pick(); editor.mRC = true; break;
		}
});
editor.canvas.addEventListener("mouseup", function(event)
	{
		switch(event.button)
		{
			case 0:
				editor.mLC = false; break;
			case 2:
				editor.mRC = false; break;
		}
	
});

editor.canvas.addEventListener("wheel", function(event){
	largeCanvasDiv.scrollLeft -= Math.sign(event.deltaY)*256;
	/*
	editor.scale += Math.sign(event.deltaY)*2;
	
	if(editor.scale > 16) editor.scale = 16;
	if(editor.scale < 2) editor.scale = 2;
	
	setScrollbar();
	*/
});

editor.resize()
function resizeCall (event)
{
	editor.resize()
	largeCanvasDiv.style.width = (window.innerWidth - (256 + (window.innerWidth & (editor.SF() - 1)))) + "px";
	toolDiv.style.left = (window.innerWidth - (256 + (window.innerWidth & (editor.SF() - 1)))) + "px";
}

window.addEventListener("resize",resizeCall)

function scrollCanvasCall (event)
{
	editor.canvas.style.left = largeCanvasDiv.scrollLeft + "px";
	editor.xoffset = editor.RF(largeCanvasDiv.scrollLeft);
} 

largeCanvasDiv.addEventListener("scroll",scrollCanvasCall)
//menuDiv.addEventListener("mousemove",resizeCall)

	largeCanvasDiv.style.width = (window.innerWidth - (256 + (window.innerWidth & (editor.SF() - 1)))) + "px";
	toolDiv.style.left = (window.innerWidth - (256 + (window.innerWidth & (editor.SF() - 1)))) + "px";

recentContainer.addEventListener("mousemove", function(e){recent.mousePos = [e.offsetX,e.offsetY]});
recentContainer.addEventListener("mousedown", function(e){if (e.button === 0) {recent.mLC = true;}});