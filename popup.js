document.addEventListener('DOMContentLoaded', function () {
    document.getElementById("button").addEventListener("click", testFunction)
    
    function testFunction() {
        chrome.tabs.query({ currentWindow: true, active: true },
            function (tabs) { 
                chrome.tabs.sendMessage(tabs[0].id, "hello")
            })
    }
})