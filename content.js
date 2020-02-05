// alert("alert")

chrome.runtime.onMessage.addListener(function (req) {
    alert(req)
})