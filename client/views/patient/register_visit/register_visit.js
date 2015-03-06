/**
 * Created by damian on 04.03.15.
 */
Template.registerVisit.helpers({
    user_id: function(){
        return Meteor.userId();
    }
});

Template.registerVisit.events({
     'change #przychodnie': function(){
         var specjalnosci = document.getElementById("specjalnosci");
         specjalnosci.disabled="";
     },
     'change #specjalnosci': function(){
         var lekarze = document.getElementById("lekarze");
         var specjalnosc = document.getElementById("specjalnosci").value;
         deleteDropdownOptions(lekarze);
         Uzytkownicy.find({'profile.isDoctor':true, 'profile.id_specjalnosc':specjalnosc}).forEach(function(uzytkownik){
             var option = document.createElement("option");
             option.text = uzytkownik.username;
             option.value = uzytkownik._id;
             lekarze.add(option,null);
         });
         lekarze.disabled="";
     }
});

Template.registerVisit.rendered = function(){
    setPrzychodnie();
    setSpecjalnosci();
};

setPrzychodnie =  function(){
    var przychodnie = document.getElementById('przychodnie');
    Przychodnie.find().forEach(function(przychodnia){
        var option = document.createElement("option");
        option.text = przychodnia.nazwa;
        option.value = przychodnia._id;
        przychodnie.add(option,null);
    });
};

setDoktorzy =  function(specjalnosc){
    var lekarze = document.getElementById('lekarze');
    Uzytkownicy.find({'profile.isDoctor':true,'profile.id_specjalnosc':specjalnosc}).forEach(function(uzytkownik){
            var option = document.createElement("option");
            option.text = uzytkownik.username;
            option.value = uzytkownik._id;
            lekarze.add(option,null);
    });
};

setSpecjalnosci =  function(){
    var specjalnosci = document.getElementById('specjalnosci');
    Specjalnosci.find().forEach(function(specjalnosc){
        var option = document.createElement("option");
        option.text = specjalnosc.nazwa;
        option.value = specjalnosc._id;
        specjalnosci.add(option,null);
    });
};

deleteDropdownOptions = function(selector){
    for(i = selector.length; i>0; i--){
        selector.remove(i);
    }
}

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
        dayClick: function(date, jsEvent, view){
           // $(this).css('background-color', 'red');
           //AntiModals.prompt("dodaj spotkanie");
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
                        title:'siema',
                        start: '2015-03-06T08:00:00',
                        end: '2015-03-06T12:00:00',
                        description: 'aasa  aa afaa',
                        allDay: false
                    }

                ]
            }
        ],
        eventStartEditable: true
    })
}