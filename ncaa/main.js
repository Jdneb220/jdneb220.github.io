$(function(){
	console.log('ready')
	
	//matches 1-16
	var top = 205;
	var left = 175;
	for(var i=1; i<=16; i++){
		var node = $("<input id='m"+i+"' placeholder='"+i+"' name='m"+i+"' style='top:"+top+"px;left:"+left+"px;'></input>");
		$("#nodes").append(node)
		top+=58;
	}
	
	//matches 17-32
	top = 205;
	left = 1600-left-105+5;
	for(var i=17; i<=32; i++){
		var node = $("<input id='m"+i+"' placeholder='"+i+"' name='m"+i+"' style='top:"+top+"px;left:"+left+"px;'></input>");
		$("#nodes").append(node)
		top+=58;
	}
	
	//regionals matches 33-40
	top = 235
	left = 298
	for(var i=33; i<=40; i++){
		var node = $("<input id='m"+i+"' placeholder='"+i+"' name='m"+i+"' style='top:"+top+"px;left:"+left+"px;'></input>");
		$("#nodes").append(node)
		top+=116;
	}
	
	//regionals matches 41-48
	top = 235
	left = 1600-left-105+5;
	for(var i=41; i<=48; i++){
		var node = $("<input id='m"+i+"' placeholder='"+i+"' name='m"+i+"' style='top:"+top+"px;left:"+left+"px;'></input>");
		$("#nodes").append(node)
		top+=116;
	}
	
	//regional finals matches 49-52
	top = 292
	left = 432
	for(var i=49; i<=52; i++){
		var node = $("<input id='m"+i+"' placeholder='"+i+"' name='m"+i+"' style='top:"+top+"px;left:"+left+"px;'></input>");
		$("#nodes").append(node)
		top+=232;
	}
	
	//regional finals matches 53-56
	top = 292
	left = 1600-left-105+5;
	for(var i=53; i<=56; i++){
		var node = $("<input id='m"+i+"' placeholder='"+i+"' name='m"+i+"' style='top:"+top+"px;left:"+left+"px;'></input>");
		$("#nodes").append(node)
		top+=232;
	}
	
	//semifinals matches 57-58
	top = 407
	left = 566
	for(var i=57; i<=58; i++){
		var node = $("<input id='m"+i+"' placeholder='"+i+"' name='m"+i+"' style='top:"+top+"px;left:"+left+"px;'></input>");
		$("#nodes").append(node)
		top+=464;
	}
	
	//semifinals matches 59-60
	top = 407
	left = 1600-left-105+5;
	for(var i=59; i<=60; i++){
		var node = $("<input id='m"+i+"' placeholder='"+i+"' name='m"+i+"' style='top:"+top+"px;left:"+left+"px;'></input>");
		$("#nodes").append(node)
		top+=464;
	}
	
	//championship match 61
	top = 467
	left = 692
	$("#nodes").append($("<input id='m61' name='m61' placeholder='61' style='top:"+top+"px;left:"+left+"px;'></input>"))
	
	//championship match 62
	top = 813
	left = 1600-left-105+5;
	$("#nodes").append($("<input id='m62' name='m62' placeholder='62' style='top:"+top+"px;left:"+left+"px;'></input>"))
	
	//champion
	$("#nodes").append($("<input id='m63' name='m63' placeholder='63' style='top:628px;left:702px;font-size:24px; text-align:center; width:200px'></input>"))
});