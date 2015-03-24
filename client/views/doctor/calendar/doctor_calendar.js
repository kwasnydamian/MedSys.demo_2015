/**
 * Created by damian on 20.03.15.
 */
Template.doctorCalendarTemplate.rendered = function(){
    Session.set('idPollPatient','');
    Session.set('idPoll','');
    Session.set('idPacjenta','');
    this.autorun(function() {
        $('#doctorCalendar').fullCalendar('refetchEvents');
        $('#doctorCalendar').fullCalendar({
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month,agendaWeek,agendaDay'
            },
            allDaySlot:false,
            height:462,
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
                var calendar = Wizyty.find({id_lekarz: Meteor.userId(),isAvailable:true});
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
                if(!event.isAccepted){
                    element.css("background-color","#E34234");
                    element.css("border-color","#E32636");
                }

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
                    $("#eventStart").html(start);
                    $("#eventPatient").html(lastName + " " + firstName);
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
        //Wizyty.remove({_id:idEvent});
        Wizyty.update({_id:idEvent},{$set:{isAvailable:false}});
        $('#doctorEventInfo').modal('hide');
    },
    'click #accept':function(){
        var idEvent = document.getElementById('idEvent').value;
        Wizyty.update({_id:idEvent},{$set:{isAccepted:true}});
        $('#doctorEventInfo').modal('hide');
    }
});