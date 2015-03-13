/**
 * Created by Dorian on 09.03.15.
 */

Template.messagesDoctor.helpers({
    messagesDoctor: function() {
        var patientId = document.getElementById('pacjenci').value;

        if(patientId!==0){
            return Messages.find({id_doctor:Meteor.userId(),id_patient:patientId()}, { sort: { time: 1}});
        }
    }
})

Template.inputDoctor.events = {
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
                    id_doctor: Meteor.userId(),
                    id_patient: document.getElementById('pacjenci').value
                });

                document.getElementById('message').value = '';
                message.value = '';
            }
        }
    }
}

Template.chatDoctor.rendered = function(){
    setPacjent();

};

setPacjent =  function(){
    var pacjenci = document.getElementById('pacjenci');
    Uzytkownicy.find({'profile.isPatient':true}).forEach(function(user){
        var option = document.createElement("option");
        option.text = user.username;
        option.value = user._id;
        pacjenci.add(option,null);
    });
};