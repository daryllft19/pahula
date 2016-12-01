var chosen = [];
var titles = [];

window.onload = function() {
    document.getElementById('init').onclick = function() {	
		chrome.tabs.query({active:true, currentWindow: true}, function(tabs){
            chrome.tabs.sendMessage(tabs[0].id, "init");
        });
	
		return;
     }; 

    document.getElementById('next').onclick = function() {
		getNext(titles);
     }; 


}

chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		if ('titles' in request)
		{
			titles = request.titles
			if(titles.length > 0)
			{
				alert('Initialized ' + titles.length + ' movies!');
			}
			else
			{
				alert('Nothing initialized!');
			}
		}
});


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

alert(next);
}