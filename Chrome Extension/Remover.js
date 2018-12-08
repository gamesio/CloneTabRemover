chrome.history.onVisited.addListener(function(result)
	{	
		chrome.tabs.query({"url": result.url}, function(tabArr)
		{
			for(var i = 0; i < tabArr.length; i++)
			{
				if(tabArr[i].status == "loading" && tabArr.length > 1)
					chrome.tabs.remove(tabArr[i].id);
				else
					chrome.tabs.update(tabArr[i].id, {"active": true});
			}
		})
	}
);
