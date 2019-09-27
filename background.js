/* 
    Start by including a listening event for runtime.onInstalled in the background script.
    Inside the onInstalled listener, the extension will set a value using the storage API.
    This will allow multiple extension components to access that value and update it.

    The storage API, must be registered under the "permissions" field in the manifest
    for the extension to use them.
*/

chrome.runtime.onInstalled.addListener(function () {
    chrome.storage.sync.set({ color: '#000000' }, function () {
        console.log("The color is green.");
    });

    /*
        Add declared rules to the background script with the `declarativeContent` API 
        within the `runtime.onInstalled` listener event.
    */
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
        /* 
            The browser will now show a full-color page action icon in the browser toolbar 
            when users navigate to a URL that contains "developer.chrome.com"
        */
        chrome.declarativeContent.onPageChanged.addRules([{
            conditions: [new chrome.declarativeContent.PageStateMatcher({
                pageUrl: { hostEquals: 'developer.chrome.com' },
            })
            ],
            actions: [new chrome.declarativeContent.ShowPageAction()]
        }]);
    });
});