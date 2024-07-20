let speaking = false;
let speech;
// Function to speak the blog content
function speak(text) {
speech = new SpeechSynthesisUtterance();
speech.text = text;
speech.volume = 1;
speech.rate = 1;
speech.pitch = 1;
speech.lang = 'en-US';
speechSynthesis.speak(speech);
}
// Event listener for the read button
document.getElementById("readButton").addEventListener("click", 
function() {
const blogContent = document.getElementById("content").innerText;
if (!speaking) {
speak(blogContent);
speaking = true;
document.getElementById("stopButton").style.display = "inline-block";
document.getElementById("readButton").style.display = "none";
}
});
// Event listener for the stop button
document.getElementById("stopButton").addEventListener("click", 
function() {
if (speaking) {
speechSynthesis.cancel();
speaking = false;
document.getElementById("readButton").style.display = "inline-block";
document.getElementById("stopButton").style.display = "none";
}
});
