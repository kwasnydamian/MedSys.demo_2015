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
        events:evt,
        dayClick: function(date, jsEvent, view){

        },
        eventRender:function(event,element){
            element.click(function(){
                AntiModals.alert("tytuł: "+event.title+" opis: "+event.description);
            })
        },

        selectable: true
    });
}

Template.patientDashboard.helpers({

})