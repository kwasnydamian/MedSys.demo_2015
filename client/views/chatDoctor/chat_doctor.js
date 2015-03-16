/**
 * Created by Dorian on 09.03.15.
 */

Template.messagesDoctor.helpers({
    messagesDoctor: function() {
        //var patientId = document.getElementById('pacjenci').value;

       // if(patientId!==0){
            return Messages.find({id_doctor:Meteor.userId(),id_patient:Session.get('idPacjenta')}, { sort: { time: 1}});
       // }
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

Template.chatDoctor.events({
    'change #pacjenci': function(){
        var idPacjenta = document.getElementById('pacjenci').value;
        Session.set('idPacjenta',idPacjenta);
    },
    'click #pollsModalButton':function(){
       // alert("");
    }
})

setPacjent =  function(){
    var pacjenci = document.getElementById('pacjenci');
    Uzytkownicy.find({'profile.isPatient':true}).forEach(function(user){
        var option = document.createElement("option");
        option.text = user.username;
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
})