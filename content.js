// alert("alert")

const videoEl = document.querySelector("video")

chrome.runtime.onMessage.addListener(function (req) {
    alert(req)
    console.log(videoEl.currentTime)
})