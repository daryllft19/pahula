var titles = [];
var movie = '';

window.onload = function() {
	$('#init-success').hide();
	$('#init-danger').hide();
	chrome.tabs.query({active:true, currentWindow: true}, function(tabs){
        chrome.tabs.sendMessage(tabs[0].id, "items");
    });
	
    $('#init').click(function() {	
		chrome.tabs.query({active:true, currentWindow: true}, function(tabs){
            chrome.tabs.sendMessage(tabs[0].id, "init");
			chrome.tabs.sendMessage(tabs[0].id, "items");
        });
		return;
     }); 

    $('#next').click(function() {
		chrome.tabs.query({active:true, currentWindow: true}, function(tabs){
            chrome.tabs.sendMessage(tabs[0].id, "next");
			chrome.tabs.sendMessage(tabs[0].id, "items");
        });
		return;
     }); 

    $('#guess').hover(function() {
		$('#guess').css('color','black').css('text-shadow','none');
    }).mouseout(function(){
		$('#guess').css('color','transparent').css('text-shadow','0 0 10px #000');
	}); 	

	$('#guess').click(function() {
		window.open('http://www.google.com/search?q='+movie,'_blank');
	});
	 
	disableNext();
}

disableNext = function(){
	if($('#items').prop('innerHTML') == 0)
	{
		$('#next').prop('disabled',true);
	}
	else
	{
		$('#next').prop('disabled', false);
	}
}

getMovie = function(movie){
	if (movie == '')
	{
		$('#guess').prop('innerHTML','N/A');
	}
	else
	{
		$('#guess').prop('innerHTML',movie);
	}

}

chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		if ('titles' in request)
		{
			titles = request.titles;
			movie = '';
			if(titles.length > 0)
			{
				$('#items-success').prop('innerHTML',titles.length);
				$('#init').prop('disabled',true);
				$('#init-success').slideDown().delay(3000).slideUp(function(){
					$('#init').prop('disabled',false);
				});
			}
			else
			{
				$('#init').prop('disabled',true);
				$('#init-danger').slideDown().delay(2000).slideUp(function(){
					$('#init').prop('disabled',false);
				});
			}
			getMovie('');
		}
		if ('movie' in request)
		{
			movie = request.movie;
			if(movie.length > 0)
			{
				getMovie(movie);
				//alert(request.movie);
			}
			else
			{
				alert('No more movies!');
				getMovie('');
			}
		}
		if ('items' in request)
		{
			getMovie(movie);
			$('#items').prop('innerHTML',request.items);
			disableNext();
		}
});