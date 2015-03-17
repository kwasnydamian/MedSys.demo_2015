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
         $('#doctorCalendar').fullCalendar('destroy');
         document.getElementById("chat").classList.add("hidden");
         var przychodnie = document.getElementById("przychodnie");
         var specjalnosci = document.getElementById("specjalnosci");
         var lekarze = document.getElementById("lekarze");

         specjalnosci.disabled="";
         specjalnosci.value = 0;
         if(przychodnie.value==0){
             specjalnosci.disabled="disabled";
         }

         lekarze.disabled="disabled";
         lekarze.value = 0;
        $('#doctorCalendarInfo').show();
        Session.set('idLekarza','');
    },
    'change #specjalnosci': function(){
        $('#doctorCalendar').fullCalendar('destroy');
        document.getElementById("chat").classList.add("hidden");
         var lekarze = document.getElementById("lekarze");
         var specjalnosc = document.getElementById("specjalnosci").value;
         var przychodnie = document.getElementById("przychodnie").value;
         deleteDropdownOptions(lekarze);
         Uzytkownicy.find({'profile.isDoctor':true, 'profile.id_specjalnosc':specjalnosc
             ,'profile.id_klinika':przychodnie}).forEach(function(uzytkownik){
             var option = document.createElement("option");
             option.text = uzytkownik.profile.lastName+" "+uzytkownik.profile.firstName;
             option.value = uzytkownik._id;
             lekarze.add(option,null);
         });
         lekarze.disabled="";
        $('#doctorCalendarInfo').show();
        Session.set('idLekarza','');
    },
    'change #lekarze':function(){
        var idLekarza = document.getElementById('lekarze').value;

        if(idLekarza==0){
            Session.set('idLekarza','');
            $('#doctorCalendar').fullCalendar('destroy');
            document.getElementById("chat").classList.add("hidden");
            $('#doctorCalendarInfo').show();
        }
        else{
            $('#doctorCalendar').fullCalendar('destroy');
            $('#doctorCalendarInfo').hide();
            zaladujKalendarz(idLekarza);
            Session.set('idLekarza', idLekarza);
            document.getElementById("chat").classList.remove("hidden");
        }
    },
    'click #wizytaButton':function(){
    var czyWybranoLekarza = sprawdzCzyWybranoLekarza();
    if(czyWybranoLekarza){
        $("#dodajWizyte").modal('show');
    }
    else{
        AntiModals.alert("Wybierz lekarza");
    }
    }
});

Template.registerVisit.rendered = function(){
    setPrzychodnie();
    setSpecjalnosci();
    Session.set('idLekarza','');
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
            option.text = uzytkownik.profile.lastName+" "+uzytkownik.profile.firstName;
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
};

sprawdzCzyWybranoLekarza = function(){
    var flaga = false;
    var lekarz = document.getElementById('lekarze').value;
    if(lekarz!=0 && lekarz != "0" && lekarz != "undefined" && lekarz !=""){
        flaga=true;
    }
    return flaga;
};

zaladujKalendarz = function(idLekarza){
        $('#doctorCalendar').fullCalendar({
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
            eventLimit:true,
            selectable:true,
            events: function(start, end, timezone, callback) {
                var events = [];
                var calendar = Wizyty.find({id_lekarz:idLekarza});
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
            dayClick: function (date, allDay, jsEvent, view) {
                document.getElementById('labelStart').innerHTML=moment(date).format("DD-MM-YYYY HH:mm");
                document.getElementById('start').value=date;
                $("#addEvent").modal('show');
            },
            dayRender:function(date,cell){

            },
            eventRender:function(event,element){
                //element.popover({
                //    placement: 'auto',
                //    html:true,
                //    title:'text',
                //    content: 'text'
                //});
                //$('body').on('click',function(e){
                //    if(!element.is(e.target) && cell.has(e.target).length ===0 && $('.popover').has(e.target).length===0)
                //        element.popover('hide');
                //})
            },
            eventClick:function(event,jsEvent,view){

            }
        });
}
var requireLogin = function() {
    if (!Meteor.user()) {
        if (Meteor.loggingIn()) {
            this.render(this.loadingTemplate);
        }
        else {
            this.render('accessDenied');
            this.stop();
        }
    }
    this.next();

}
Router.before(requireLogin,{only:'registerVisit'});
