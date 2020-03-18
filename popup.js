//waits until chrome extension popup content has loaded before getting element
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById("button").addEventListener("click", saveNewVideoTimestamp)
});

//     //queries current chrome tab for url
//     function getVideoURL() {
//         chrome.tabs.query({ currentWindow: true, active: true },
//             function (tabs) { 
//                 const currentUrl = tabs[0].url;
//                 chrome.tabs.sendMessage(tabs[0].id, currentUrl)
//             })
//     }
// })

setTimeout(function () {
    chrome.tabs.query({ currentWindow: true, active: true },
        function (tabs) {
            const currentUrl = tabs[0].url;
            chrome.tabs.sendMessage(tabs[0].id, currentUrl)
        })
},500)

let addUrl = ""

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        // console.log(request.data)
        addUrl = request.data
        // chrome.tabs.create({url: request.data, selected: false});
        // const win = window.open(request.data, '_blank');
        //  win.focus();
    }
);

function saveNewVideoTimestamp() {
    // console.log(addUrl)
    const title = document.getElementById("title").value;
    const notes = document.getElementById("notes").value;
    const tags = document.getElementById("tags").value;
    const finalUrl = addUrl + "&title=" + title + "&notes=" + notes + "&tags=" + tags
    console.log("The Big One: " + finalUrl)
    const characterCheck = title + notes + tags
    if (tags.length < 45) {
        if (title) {
            switch (true) {
                case characterCheck.includes("/"):
                    document.getElementById("alert").innerText = '"/", "?", and "=" not allowed';
                    break;
                case characterCheck.includes("?"):
                    document.getElementById("alert").innerText = '"/", "?", and "=" not allowed';
                    break;
                case characterCheck.includes("="):
                    document.getElementById("alert").innerText = '"/", "?", and "=" not allowed';
                    break;
                default:
                    window.open(finalUrl, '_blank');
            }
        } else {
            document.getElementById("alert").innerText = 'Please name your timestamp';
        }
    } else {
        document.getElementById("alert").innerText = 'Too many (or too long of) tags!';
    }

}
