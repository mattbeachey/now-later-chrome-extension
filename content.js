
const videoEl = document.querySelector("video")

//listener for query from popup.js
chrome.runtime.onMessage.addListener(function (videoUrl) {

    //differentiates between types of youtube urls to extract video id from full url
    if (videoUrl.includes("&")) {
        const videoId = videoUrl.split("?v=").pop()
        const newVideoId = videoId.split("&").shift();
        const timeElapsed = (Math.floor(videoEl.currentTime))
        const timestampUrl = ("https://youtu.be/" + newVideoId + "?t=" + timeElapsed)
        alert(timestampUrl)
    } else {
        const videoId = videoUrl.split("?v=").pop()
        const timeElapsed = (Math.floor(videoEl.currentTime))
        const timestampUrl = ("https://youtu.be/" + videoId + "?t=" + timeElapsed)
        alert(timestampUrl)
    }
})
