/**
 * Author: Siqi Zhao
 * */

var storyIndex = 0;

document.getElementById("progressBtn").addEventListener("click", tellTheStory);

function tellTheStory() {
    document.getElementById("storyTellArea").innerHTML = "<br>" + storyArray[storyIndex];
    storyIndex++;
}