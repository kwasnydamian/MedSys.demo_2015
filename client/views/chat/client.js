/**
 * Created by Dorian on 09.03.15.
 */
Template.messages.helpers({
    messages: function() {
        var doctorId = document.getElementById('lekarze').value;
        if(doctorId!==0){
            return Messages.find({id_patient:Meteor.userId(),id_doctor:doctorId}, { sort: { time: 1}});
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
                    id_doctor: document.getElementById('lekarze').value
                });

                document.getElementById('message').value = '';
                message.value = '';
            }
        }
    }
}
Template.messages.rendered = function (){
    function scrollToID(id, speed){
        var offSet = 50;
        var targetOffset = $(id).offset().top - offSet;
        var scroll2 = $('#scroll2');
        $('html,body').animate({scrollTop:targetOffset}, speed);
        if (mainNav.hasClass("open")) {
            mainNav.css("height", "1px").removeClass("in").addClass("collapse");
            mainNav.removeClass("open");
        }
    }

}