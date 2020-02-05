document.addEventListener('DOMContentLoaded', function () {
    document.getElementById("button").addEventListener("click", testFunction)

    function testFunction() {
        chrome.tabs.query({ currentWindow: true, active: true },
            function (tabs) { 
                const currentUrl = tabs[0].url;
                chrome.tabs.sendMessage(tabs[0].id, currentUrl)
            })
    }
})