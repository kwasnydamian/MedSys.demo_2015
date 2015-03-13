/**
 * Created by damian on 13.03.15.
 */
Template.doctorDashboard.rendered = function(){
    $('#doctorCalendar').fullCalendar({
        header:{
            left: 'prev,next today',
            center: 'title',
            right:'agendaWeek,agendaDay'
        },
        minTime:"06:00:00",
        maxTime:"20:00:00",
        slotEventOverlap:true,
        lang: 'pl',
        weekends:true,
        defaultView: 'agendaWeek',
        eventLimit:true,
        events: function(start, end, timezone, callback) {
            var events = [];
            var calendar = Wizyty.find({id_lekarz:Meteor.userId()});
            if (calendar) {
                calendar.forEach(function (event) {
                    eventDetails = {};
                    for(key in event)
                        eventDetails[key] = event[key];
                    events.push(eventDetails);
                });
            }
            callback(events);
        },
        dayClick: function(date, jsEvent, view){

        },
        eventRender:function(event,element){
           element.bind('click',function(){
                var firstName = "";
                var lastName ="";
                Uzytkownicy.find({'_id':event.id_pacjent},{
                    fields:{'profile.firstName':1,'profile.lastName':1}
                }).forEach(function(user){
                    firstName = user.profile.firstName;
                    lastName = user.profile.lastName;
                });
                $('#doctorEventInfo').modal('show');
                $("#eventTitle").html(event.title);
                $("#eventDescription").html(event.description);
                var start = moment(event.start).format("DD-MM-YYYY HH:mm");
                $("#eventStart").html("termin: "+start);
                $("#eventPatient").html("pacjent: "+lastName+" "+firstName);
                $("#idEvent").val(event._id);
            });
        },
        selectable: true
    });
}

Template.doctorEventModalInfo.events({
    'click #reject':function(){
        var idEvent = document.getElementById('idEvent').value;
        alert("reject "+idEvent);
    },
    'click #accept':function(){
        var idPacjent = document.getElementById('idEvent').value;
        alert("acccept "+idPacjent);
    }
})