


//listener for query from popup.js
chrome.runtime.onMessage.addListener(function (videoUrl) {
    console.log(videoUrl)

    //locate video element
    const videoEl = document.querySelector("video")

    //gets video's title
    const videoName = document.title.split(" - YouTube")[0]
    //differentiates between types of youtube urls to extract video id from full url
    if (videoUrl.includes("youtube")) {
        if (videoUrl.includes("&")) {
            const videoId = videoUrl.split("?v=").pop()
            const newVideoId = videoId.split("&").shift();
            const timeElapsed = (Math.floor(videoEl.currentTime))
            const timestampUrl = ("https://youtu.be/" + newVideoId + "&t=" + timeElapsed)
            chrome.runtime.sendMessage({
                data: ("https://now-and-later.netlify.com/add?url=" + timestampUrl + "&videoName=" + videoName)
            }, function (response) {
                console.dir(response);
            });
        } else {
            const videoId = videoUrl.split("?v=").pop()
            const timeElapsed = (Math.floor(videoEl.currentTime))
            const timestampUrl = ("https://youtu.be/" + videoId + "&t=" + timeElapsed)
            chrome.runtime.sendMessage({
                data: ("https://now-and-later.netlify.com/add?url=" + timestampUrl + "&videoName=" + videoName)
            }, function (response) {
                console.dir(response);
            });
        }
    } else {
        alert("This plugin only works with Youtube currently!")
    }
})
