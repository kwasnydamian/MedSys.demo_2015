/**
 * Created by damian on 11.03.15.
 */
Template.patientDashboard.rendered = function(){
    var evt =[];
    Wizyty.find({id_pacjent:Meteor.userId()}).forEach(function(item){
        evt.push({
            '_id ': item._id,
            'start': item.start,
            'end': item.end,
            'id_pacjent': item.id_pacjent,
            'id_lekarz': item.id_lekarz,
            'title': item.title,
            'description': item.description
        })
    });
    $('#patientCalendar').fullCalendar({
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
            var calendar = Wizyty.find({id_pacjent:Meteor.userId()});
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
                Uzytkownicy.find({'_id':event.id_lekarz},{
                    fields:{'profile.firstName':1,'profile.lastName':1}
                }).forEach(function(user){
                    firstName = user.profile.firstName;
                    lastName = user.profile.lastName;
                });
                $('#info').modal('show');
                $("#eventTitle").html(event.title);
                $("#eventDescription").html(event.description);
                var start = moment(event.start).format("DD-MM-YYYY HH:mm");
                $("#eventStart").html("termin: "+start);
                $("#eventDoctor").html("lekarz: "+lastName+" "+firstName);
            });
        },
        selectable: true
    });
}

Template.patientDashboard.helpers({
    iloscWszystkich: function(){
        return Wizyty.find({id_pacjent:Meteor.userId()}).count();
    }
})



