/**
 * Created by damian on 06.03.15.
 */
Template.terminarz.rendered = function(){
    $('#calendar').fullCalendar({
        header:{
            left: 'prev,next today',
            center: 'title',
            right:'agendaWeek'
        },
        lang: 'es',
        weekends:true,
        defaultView: 'agendaWeek',
        editable:true,
        eventLimit:true,
        //contentHeigth:300,
        dayClick: function(date, jsEvent, view){

        },
        eventRender:function(event,element){
            element.click(function(){
                AntiModals.alert("opis");
            })
        },
        eventSources:[
            {
                events:[
                    {
                        id:999,
                        title:'pierwsza wizyta',
                        start: '2015-03-09T08:00:00',
                        end: '2015-03-09T12:00:00',
                        description: 'aasa  aa afaa',
                        allDay: false
                    }

                ]
            }
        ],
        eventStartEditable: true
    })
};

pobierzSpotkania = function(){
    var idLekarza = document.getElementById('lekarze').value;
    return Wizyty.find({'id_lekarz':idLekarza});
};