var selectFromStatus = true;
var active = true;

const enabledButton = document.getElementById("enabled");
if(x != null)
	enabledButton.addEventListener('click', enableDisable);
const button = document.getElementById("button");
if(x != null)
	enabledButton.addEventListener('click', removeCloneTables);

function removeCloneTables(url, indexOfStart, index)
{
	/*for(var i  = 0; i < chrome.tabs.length; i++)
		for(var j = i + 1; j < chrome.tabs.length; j++)
			if(tabs[i].url == tabs[j].url)
			{
				if(selectFromStatus){
					if(tabs[i].status == "loading")
						tbas[i].remove();
					else
						tabs[j].remove();
				}
			}*/
	if(indexOfStart == null)
			indexOfStart = 0;
	if(index == null)
			index = 1
	if(indexOfStart >= chrome.tabs.length)
			return true
	if(tabs[indexOfStart] == tabs[index])
	{
		if(selectFromStatus){
			if(tabs[indexOfStart].status == 'loading')
				tabs[indexOfStart].remove();
			else
				tabs[index].remove();
		}
		else{
			tabs[index].remove();
		}
	}
	if(index >= chrome.tabs.length)
		return removeCloneTables(url, indexOfStart + 1, indexOfStart + 2)
	else
		return removeCloneTables(url, indexOfStart, index+ 1 )
}

function enableDisable()
{
	active = !active;
}

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
