/**
 * Created by Dorian on 09.03.15.
 */
Template.messages.helpers({
    messages: function() {
        return Messages.find({}, { sort: { time: 1}});
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
                    time: Date.now(),
                    username: name
                });

                document.getElementById('message').value = '';
                message.value = '';
            }
        }
    }
}