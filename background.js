const player = document.createElement('video');
player.autoplay = true; // important

const canvas = document.createElement('canvas');
const context = canvas.getContext('2d');

let capturingInterval;

navigator.mediaDevices.getUserMedia({ video: true })
    .then((stream) => {
        player.srcObject = stream;
    }).catch((e)=>alert(e));

function captureImageUrl() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(player, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL("image/png");
}

function startCapturing() {    
    capturingInterval = setInterval(() => {
        const userImg = document.getElementById('user-img');
        userImg.src = captureImageUrl();
    }, 2000);
}

function stopCapturing() {
    clearInterval(capturingInterval);
}