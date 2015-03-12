Template.terminarz.rendered = function(){
    $('#calendar').fullCalendar({
        header:{
            left: 'prev,next today',
            center: 'title',
            right:'agendaWeek,agendaDay'
        },
        minTime:"06:00:00",
        maxTime:"20:00:00",
        lang: 'pl',
        weekends:true,
        defaultView: 'agendaWeek',
        editable:true,
        eventLimit:true,
        events: function(start, end, timezone, callback) {
            console.log(start);
            console.log(end);
            console.log(timezone);
            var events = [];
            var calendar = Wizyty.find();
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
            element.click(function(){
                AntiModals.alert("opis");
            })
        }
    })
};

pobierzSpotkania = function(){
    var idLekarza = document.getElementById('lekarze').value;
    return Wizyty.find({'id_lekarz':idLekarza});
};