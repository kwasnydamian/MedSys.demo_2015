Template.videoTemplate.rendered = function(){
    var my_awesome_script = document.createElement('script');
    my_awesome_script.setAttribute('src','http://simplewebrtc.com/latest.js');
    document.head.appendChild(my_awesome_script);

}


Template.videoTemplate.events({
    'click #test':function(){
        var webrtc = new SimpleWebRTC({
            // the id/element dom element that will hold "our" video
            localVideoEl: 'localVideo',
            // the id/element dom element that will hold remote videos
            remoteVideosEl: 'remotesVideos',
            // immediately ask for camera access
            autoRequestMedia: true
        });
        console.log(webrtc);
        webrtc.on('readyToCall', function () {
            console.log("ready to call in");
            webrtc.joinRoom('qqq');
            console.log("ready to call out");
        });
    }
});
