/**
 * Author: Siqi Zhao
 * */

var storyIndex = 0;

// Add an click listener to the progressBtn
// document.getElementById("progressBtn").addEventListener("click", tellTheStory);
// Add an click listener to the resetBtn
// document.getElementById("resetBtn").addEventListener("click", resetTheStory);

// Change the layout of the website...
function tellTheStory() {
    changeText()
}

// Change the layout to the original status...
function resetTheStory() {
    storyIndex = 0;
    document.getElementById("storyTellArea").innerHTML = "<br>" + originalText;
}

// Change the text in the Text Area...
function changeText() {
    document.getElementById("storyTellArea").innerHTML = "<br>" + storyArray[storyIndex];
    if (storyIndex < storyArray.length - 1) {
        storyIndex++;
    }
}

