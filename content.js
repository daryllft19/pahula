var titles = [];
var chosen = [];
var movie = '';

init = function(){
	titles = [];
	movie = '';
	chosen = [];
	
	a = document.getElementsByClassName("klitem");
	for(i = 0; i < a.length;i++){titles.push(a[i].title + "\n")};
	
	chrome.runtime.sendMessage({titles:titles}, function(response) {
		console.info("Initializing!");
	});
}

getNext = function(list){
	next = ''
	if(list.length == 0){
		chrome.runtime.sendMessage({movie:''}, function(response) {
			console.info("No movies!");
		});
		return;
	}

	rand_index = Math.round(Math.random()*list.length);
	chosen.push(list[rand_index])
	next = list[rand_index];
	movie = next;
	list.splice(rand_index,1);

	chrome.runtime.sendMessage({movie:next}, function(response) {
		console.info("Next!");
	});
}

getItem = function(){
	dMsg = {items:titles.length}
	if(movie)
	{
		dMsg.movie = movie;
	}
	chrome.runtime.sendMessage(dMsg, function(response) {
		console.info("Getting items...");
	});
}

chrome.extension.onMessage.addListener(
    function(request, sender, sendResponse) {
		console.info("Content.js: " + request);
		switch(request)
		{
			case 'init':
				init();
				break;
			case 'next':
				getNext(titles);
				break;
			case 'items':
				getItem();
				break;
		}
    }
);
