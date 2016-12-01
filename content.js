var titles = [];
var chosen = [];

init = function(){
	titles = [];
	a = document.getElementsByClassName("klitem");
	for(i = 0; i < a.length;i++){titles.push(a[i].title + "\n")};

	chrome.runtime.sendMessage({titles:titles}, function(response) {
		console.info("Initializing!");
	});
}

getNext = function(list){
	next = -1 
	if(list.length == 0){
		alert("NO MOVIES IN LIST");
		return;
	}

	rand_index = Math.round(Math.random()*list.length);
	chosen.push(list[rand_index])
	next = list[rand_index];
	list.splice(rand_index,1);

	chrome.runtime.sendMessage({msg:next}, function(response) {
		console.info("Next!");
	});
}

chrome.extension.onMessage.addListener(
    function(request, sender, sendResponse) {
		console.info("Content.js: " + request);
		if(request == 'init'){
			init()
		}
		else if(request == 'next'){
			getNext(titles)
		}
    }
);
