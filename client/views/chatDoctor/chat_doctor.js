/**
 * Created by Dorian on 09.03.15.
 */

Template.messagesDoctor.helpers({
    messagesDoctor: function() {
        var id = Session.get('idPacjenta');
        if(id!==0 && id!=="" && id!=="0" && id!=="undefined"){
            return Messages.find({id_doctor:Meteor.userId(),id_patient:Session.get('idPacjenta')});
        }else{
            return null;
        }
    },
    displayMessage: function(id) {
        if (id && id!="" && id!=undefined) {
            var userID = Meteor.userId();
            var lastMessageAuthorId = document.getElementById("lastOwner").value;
            var message = Messages.findOne({_id: id});

            var div = document.createElement("div");
            var p = document.createElement("p");
            var text = document.createTextNode(message.message);
            p.setAttribute("name","destination");

            if (lastMessageAuthorId != "" && lastMessageAuthorId != undefined) {
                if (lastMessageAuthorId == message.owner) { // jeśli właściciel ostatniego elementu czatu i właścicel aktualnej wiadomości to ta sama osoba
                    var destination = document.getElementsByName("destination");
                    destination[destination.length-1].innerHTML += "<br />"+message.message;
                }
                else{
                    if (userID == message.owner) {
                        div.id = "autor";
                        p.classList.add("arrow_box_left");
                        p.title = message.time;
                    }
                    else {
                        div.id = "rozmowca";
                        p.classList.add("arrow_box_right");
                        p.title = message.time;
                    }
                    div.appendChild(p);
                    p.appendChild(text);
                    document.getElementById("wiadomosci").appendChild(div);
                    document.getElementById("lastOwner").value = message.owner;
                }
            }
            else {
                if (userID == message.owner) {
                    div.id = "autor";
                    p.classList.add("arrow_box_left");
                    p.title = message.time;
                }
                else {
                    div.id = "rozmowca";
                    p.classList.add("arrow_box_right");
                    p.title = message.time;
                }

                div.appendChild(p);
                p.appendChild(text);
                document.getElementById("wiadomosci").appendChild(div);
                document.getElementById("lastOwner").value = message.owner;
            }

            $('.chatDoctor').scrollTop($('.chatDoctor')[0].scrollHeight);
        }
    }
});

Template.inputDoctor.events = {
    'keydown input#message' : function (event) {
        if (event.which == 13) {
            if (Meteor.user())
                var name = Meteor.user().profile.lastName+" "+Meteor.user().profile.firstName;
            else
                var name = 'Anonymous';
            var message = document.getElementById('message');

            if (message.value != '') {
                Messages.insert({
                    name: name,
                    message: message.value,
                    time: moment().format("DD-MM-YYYY H:mm:ss"),
                    username: name,
                    id_doctor: Meteor.userId(),
                    id_patient: document.getElementById('pacjenci').value,
                    owner: Meteor.userId()
                });

                document.getElementById('message').value = '';
                message.value = '';
            }
        }
    }
}

Template.chatDoctor.rendered = function(){
    document.getElementById('close').classList.add('hidden');
    document.getElementById("start").classList.add("hidden");
    var webrtc = new SimpleWebRTC({
        localVideoEl: 'localVideo',
        remoteVideosEl: 'remotesVideos'
    });

    $('#start').click(function(){
        var idPacjenta = document.getElementById('pacjenci').value;
        var room = idPacjenta+Meteor.userId();

        if(idPacjenta!=0){
            webrtc.startLocalVideo();
            webrtc.once('readyToCall', function (stream) {
                webrtc.joinRoom(room);
                document.getElementById('close').classList.remove('hidden');
                document.getElementById('start').classList.add('hidden');
            });
        }else{
            alert('Proszę wybrać pacjenta');
        }
    });
    $('#close').click(function(){
        webrtc.leaveRoom();
        webrtc.stopLocalVideo();
        document.getElementById('close').classList.add('hidden');
        document.getElementById("start").classList.remove("hidden");
        document.getElementById('localVideo').innerHTML="";
    });
    webrtc.on('videoAdded', function (video, peer) {
        console.log('video added', peer);
        var remotes = document.getElementById('remotes');
        if (remotes) {
            var container = document.createElement('div');
            container.className = 'embed-responsive-item ';
            container.id = 'container_' + webrtc.getDomId(peer);
            container.appendChild(video);

            // suppress contextmenu
            video.oncontextmenu = function () { return false; };

            remotes.appendChild(container);
        }
        if (peer && peer.pc) {
            var connstate = document.createElement('div');
            connstate.className = 'connectionstate';
            container.appendChild(connstate);
            peer.pc.on('iceConnectionStateChange', function (event) {
                switch (peer.pc.iceConnectionState) {
                    case 'checking':
                        connstate.innerText = 'Łączenie...';
                        break;
                    case 'connected':
                    case 'completed': // on caller side
                        connstate.innerText = 'Połączenie ustanowione.';
                        break;
                    case 'disconnected':
                        connstate.innerText = 'Rozłączony.';
                        break;
                    case 'failed':
                        break;
                    case 'closed':
                        connstate.innerText = 'Połączenie zamknięte.';
                        break;
                }
            });
        }
    });
    webrtc.on('videoRemoved', function (video, peer) {
        console.log('video removed ', peer);
        var remotes = document.getElementById('remotes');
        var el = document.getElementById(peer ? 'container_' + webrtc.getDomId(peer) : 'localScreenContainer');
        if (remotes && el) {
            remotes.removeChild(el);
        }
    });
    webrtc.on('createdPeer', function (peer) {
        console.log('createdPeer', peer);
        var fileinput = document.createElement('input');
        fileinput.type = 'file';
        peer.on('fileTransfer', function (metadata, receiver) {
            console.log('incoming filetransfer', metadata.name, metadata);
            receiver.on('progress', function (bytesReceived) {
                console.log('receive progress', bytesReceived, 'out of', metadata.size);
            });
            // get notified when file is done
            receiver.on('receivedFile', function (file, metadata) {
                console.log('received file', metadata.name, metadata.size);

                // close the channel
                receiver.channel.close();
            });
            filelist.appendChild(item);
        });
    });
    setPacjent();
    $('#pacjenci').selectpicker({
        size:3
    });
};

Template.chatDoctor.helpers({
    wypelnione:function(){
        return PollsPatients.find({id_pacjent:Session.get('idPacjenta'),id_lekarz:Meteor.userId(),isDone:true},{fields:{id_ankieta:1}});
    },
    getPollName:function(id_ankieta){
        return Polls.find({_id:id_ankieta});
    },
    isPoll:function(count){
        if(count==0){
            return false;
        }
        else{
            return true;
        }
    }
});

Template.chatDoctor.events({
    'change #pacjenci': function(e){
        document.getElementById("wiadomosci").innerHTML="";
        var idPacjenta = document.getElementById('pacjenci').value;
        Session.set('idPacjenta',idPacjenta);
        document.getElementById("start").classList.remove("hidden");
        document.getElementById("lastOwner").value = "0";
    },
    'click .pollItem':function(event){
        var target = event.currentTarget;
        pollPatient = PollsPatients.findOne({_id:target.id});
        Session.set('idPollPatient',pollPatient._id);
        Session.set('idPoll',pollPatient.id_ankieta);

        $("#pollAnswersModal").modal("show");
    }
})

setPacjent =  function(){
    var pacjenci = document.getElementById('pacjenci');
    Uzytkownicy.find({'profile.isPatient':true}).forEach(function(user){
        var option = document.createElement("option");
        option.text = user.profile.lastName+" "+user.profile.firstName;
        option.value = user._id;
        pacjenci.add(option,null);
    });
};

Template.modalBody.helpers({
   polls:function(){
       return Polls.find();
   }
});

Template.pollsModalTemplate.events({
    'submit form':function(e){
        event.preventDefault();
        var id_ankieta = $(e.target).find('[name=poll]:checked').val();
        var id_pacjent = document.getElementById('pacjenci').value;
        var ankietaPacjent = {
            id_ankieta: id_ankieta,
            id_pacjent: id_pacjent,
            id_lekarz: Meteor.userId(),
            isDone: false,
            isAvailable: false
        };
        if(id_ankieta!="" && id_ankieta !=undefined
            && id_pacjent!="0" && id_pacjent !="undefined"){
            var ankPac = PollsPatients.insert(ankietaPacjent);
            if(ankPac){
                $("#pollsModal").modal('hide');
            }
        }
        else{
            alert("Błąd");
        }
    }
});