chrome.history.onVisited.addListener(function(pageOpenedHistory)
	{	
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
