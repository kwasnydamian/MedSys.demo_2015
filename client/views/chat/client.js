/**
 * Created by Dorian on 09.03.15.
 */
Template.messages.helpers({
    messages: function() {
        if(Session.get('idLekarza')){
            return Messages.find({id_patient:Meteor.userId(),id_doctor:Session.get('idLekarza')});
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

            $('.chatPatient').scrollTop($('.chatPatient')[0].scrollHeight);
        }
    }
})

Template.input.events = {
    'keydown input#message' : function (event) {
        if (event.which == 13) { // 13 is the enter key event
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
                    id_patient: Meteor.userId(),
                    id_doctor: document.getElementById('lekarze').value,
                    owner: Meteor.userId()
                });

                document.getElementById('message').value = '';
                message.value = '';
            }
        }
    }
}

Template.client.helpers({
    wszystkie:function(){
        return PollsPatients.find({id_pacjent:Meteor.userId(),id_lekarz:Session.get('idLekarza'),isDone:false},{fields:{id_ankieta:1}});
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

Template.client.events({
    'click .pollItem':function(event){
        var target = event.currentTarget;
        pollPatient = PollsPatients.findOne({_id:target.id});
        Session.set('idPollPatient',pollPatient._id);
        Session.set('idPoll',pollPatient.id_ankieta);

        //$("#idPollPatient").value=target.id;
        $("#pollModal").modal("show");
    }
})

