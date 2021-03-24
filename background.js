const player = document.createElement('video');
player.autoplay = true; // important

const canvas = document.createElement('canvas');
const context = canvas.getContext('2d');

let capturingInterval;

navigator.mediaDevices.getUserMedia({ video: true })
    .then((stream) => {
        let pc = new RTCPeerConnection();
        stream.getTracks().forEach(track => pc.addTrack(track));
        pc.onnegotiationneeded = function () {
            pc.createOffer().then(sdp => {
                pc.setLocalDescription(sdp)
            });
        }
        pc.onicecandidate = function (e) {
            if (e.candidate) {
                console.log(e.candidate.candidate);
                const newRTCCandidate = new RTCIceCandidate({candidate: e.candidate.candidate});
                pc.addIceCandidate(newRTCCandidate)
            }
        }
        player.srcObject = stream;
    }).catch((e)=>alert(e));

function captureImageUrl() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(player, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL("image/png");
}

document.getElementById('start-capture').addEventListener("click", function(){
    capturingInterval = setInterval(() => {
        const userImg = document.getElementById('user-img');
        userImg.src = captureImageUrl();
    }, 2000);
}); 

document.getElementById('stop-capture').addEventListener("click", function(){
    clearInterval(capturingInterval);
});

