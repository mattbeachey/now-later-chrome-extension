//waits until chrome extension popup content has loaded before getting element
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById("button").addEventListener("click", getVideoURL)

    //queries current chrome tab for url
    function getVideoURL() {
        chrome.tabs.query({ currentWindow: true, active: true },
            function (tabs) { 
                const currentUrl = tabs[0].url;
                chrome.tabs.sendMessage(tabs[0].id, currentUrl)
            })
    }
})