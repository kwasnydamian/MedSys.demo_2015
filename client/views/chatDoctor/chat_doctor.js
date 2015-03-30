/**
 * Created by Dorian on 09.03.15.
 */

Template.messagesDoctor.helpers({
    messagesDoctor: function() {
        var id = Session.get('idPacjenta');
        if(id!==0 && id!=="" && id!=="0" && id!=="undefined"){
            return Messages.find({id_doctor:Meteor.userId(),id_patient:Session.get('idPacjenta')}, { sort: { time: 1}});
        }else{
            return null;
        }
      },
    czyAutor: function(message){
        //var mes = Messages.findOne({_id:message});
        //var id = Meteor.userId();
        //
        //if(id==mes.owner){
        //    return true;
        //}
        //else{
        //    return false;
        //}
        return true;
    }
})

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
            });
        }else{
            alert('Proszę wybrać pacjenta');
        }
    });
    $('#close').click(function(){
        webrtc.leaveRoom();
        webrtc.stopLocalVideo();
        document.getElementById('close').classList.add('hidden');
        document.getElementById('localVideo').innerHTML="";
    });
    webrtc.on('videoAdded', function (video, peer) {
        console.log('video added', peer);
        var remotes = document.getElementById('remotes');
        if (remotes) {
            var container = document.createElement('div');
            container.className = 'videoContainer';
            container.id = 'container_' + webrtc.getDomId(peer);
            container.appendChild(video);

            // suppress contextmenu
            video.oncontextmenu = function () { return false; };

            remotes.appendChild(container);
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
    'change #pacjenci': function(){
        var idPacjenta = document.getElementById('pacjenci').value;
        Session.set('idPacjenta',idPacjenta);
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