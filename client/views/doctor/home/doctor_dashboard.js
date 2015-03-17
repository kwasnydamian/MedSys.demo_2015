/**
 * Created by damian on 13.03.15.
 */
Template.doctorDashboard.helpers({
   umowioneWizyty:function(){
       return Wizyty.find({id_lekarz:Meteor.userId(),start:{$gte:moment().format()}},{limit:5});
   },
    odbyteWizyty:function(){
        return Wizyty.find({id_lekarz:Meteor.userId(),start:{$lt:moment().format()}},{limit:5});
    },
    iloscUmowionychWizyt:function(){
        return Wizyty.find({id_lekarz:Meteor.userId(),start:{$gte:moment().format()}}).count();
    },
    iloscOdbytychWizyt:function(){
        return Wizyty.find({id_lekarz:Meteor.userId(),start:{$lt:moment().format()}}).count();
    }
});

Template.doctorDashboard.rendered = function(){
    this.autorun(function() {
        $('#doctorCalendar').fullCalendar('refetchEvents');
        $('#doctorCalendar').fullCalendar({
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month,agendaWeek,agendaDay'
            },
            minTime: "06:00:00",
            maxTime: "20:00:00",
            slotEventOverlap: true,
            lang: 'pl',
            weekends: true,
            defaultView: 'agendaWeek',
            eventLimit: true,
            editable: true,
            events: function (start, end, timezone, callback) {
                var events = [];
                var calendar = Wizyty.find({id_lekarz: Meteor.userId()});
                if (calendar) {
                    calendar.forEach(function (event) {
                        eventDetails = {};
                        for (key in event)
                            eventDetails[key] = event[key];
                        events.push(eventDetails);
                    });
                }
                callback(events);
            },
            eventMouseover: function (event, jsEvent, view) {

            },
            eventMouseout: function (event, jsEvent, view) {

            },
            eventRender: function (event, element) {
                element.bind('click', function () {
                    var firstName = "";
                    var lastName = "";
                    Uzytkownicy.find({'_id': event.id_pacjent}, {
                        fields: {'profile.firstName': 1, 'profile.lastName': 1}
                    }).forEach(function (user) {
                        firstName = user.profile.firstName;
                        lastName = user.profile.lastName;
                    });
                    $('#doctorEventInfo').modal('show');
                    $("#eventTitle").html(event.title);
                    var start = moment(event.start).format("DD-MM-YYYY HH:mm");
                    $("#eventStart").html("termin: " + start);
                    $("#eventPatient").html("pacjent: " + lastName + " " + firstName);
                    $("#idEvent").val(event._id);
                });
            },
            eventResize: function (event, delta, revertFunc, jsEvent, ui, view) {
                var end = moment(event.end).format();
                var id = Wizyty.update({_id: event._id}, {$set: {end: end}});
            },
            eventDrop: function (event, delta, revertFunc, jsEvent, ui, view) {
                var end = moment(event.end).format();
                var start = moment(event.start).format();
                var id = Wizyty.update({_id: event._id}, {$set: {end: end, start: start}});
            }
        });
    });
}

Template.doctorEventModalInfo.events({
    'click #reject':function(){
        var idEvent = document.getElementById('idEvent').value;
        console.log("reject "+idEvent);
    },
    'click #accept':function(){
        var idPacjent = document.getElementById('idEvent').value;
        console.log("acccept "+idPacjent);
    }
})