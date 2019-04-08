var selectFromStatus = true;
var active = true;

function removeCloneTables()
{
	for(var i  = 0; i < chrome.tabs.length; i++)
		for(var j = i + 1; j < chrome.tabs.length; j++)
			if(tabs[i].url == tabs[j].url)
			{
				if(selectFromStatus){
					if(tabs[i].status == "loading")
						tbas[i].remove();
					else
						tabs[j].remove();
				}
			}
}

function enableDisable()
{
	active = !active;
}

document.addEventListener('DOMContentLoaded', function()
{
	var x = document.getElementById("enabled");
	if(x != null)
		x.addEventListener('click', enableDisable);
	x = document.getElementById("button");
	if(x != null)
		x.addEventListener('click', removeCloneTables);
})

chrome.history.onVisited.addListener(function(pageOpenedHistory)
	{	
		if(active)
			chrome.tabs.query({"url": pageOpenedHistory.url}, function(openedTabs)
			{
				if(openedTabs.length > 1)
					for(var i = 0; i < openedTabs.length; i++)
					{
						if(openedTabs[i].status == "loading")
						{
							chrome.tabs.remove(openedTabs[i].id);
							break;
						}
						else
							chrome.tabs.update(openedTabs[i].id, {"active": true});
					}	
			})
	}
);
