// JavaScript Document
$(document).ready(function() {                       //run when the DOM is ready
	
	
	//Calculate placement of lines
	$(".path").each(function() {
		//alert($(this).data('connect'));
		var connection = $(this).data("connect").toString().split(" ");
	
		var start = $("#"+connection[0]).position()
		var end = $("#"+connection[1]).position()
		//alert(end.data("prereqs"))
		//alert(start.left)
		$(this).attr('x1', start.left+50)
				.attr('y1', start.top+3)
				.attr('x2', end.left+50)
				.attr('y2', end.top-80);
	});
	
	
	
	var current = null;
	$(".card").click(function() {  //use a class, since your ID gets mangled
		if (current == null){
			current = this
			$(this).toggleClass("selected")
			//$("#1010").toggleClass("selected")
			var id = $(this).attr("id");
			unblurBack(id);
			unblurForward(id)
			$(".card").toggleClass("blurred")
			$(".path").toggleClass("dark")
			
		}
		else{
			current = null
			$(".card").toggleClass("blurred")
			$(".path").toggleClass("dark")
			$(".card").removeClass("selected")
			$(".card").removeClass("selectedSecondary")
			$(".path").removeClass("selected")
			$(".path").removeClass("selectedSecondary")
		}
	});
	
	
	
});


/*
	unblur back and unblur forward works based on path connect data field
*/
function unblurBack(id) {
	//unblur class
	$("#"+id).addClass("selectedSecondary"); 
	
	
	//unblur path
    $(".path").each(function(){
		var connection = $(this).data("connect").toString().split(" ");
	
		var start = connection[0]
		var end = connection[1]
		
        if(end == id){
			$(this).addClass("selected")
			unblurBack(start);
		}
		
    });
}


function unblurForward(id) {
    $("#"+id).addClass("selectedSecondary"); //unblur class
	

	//unblur path
    $(".path").each(function(){
		var connection = $(this).data("connect").toString().split(" ");
	
		var start = connection[0]
		var end = connection[1]
		
        if(start == id){
			$(this).addClass("selected")
			unblurForward(end);
		}
		
    });
}