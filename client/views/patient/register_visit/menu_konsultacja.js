/**
 * Created by Dorian on 2015-05-12.
 */
Template.menuKonsultacja.helpers({
    user_id: function(){
        return Meteor.userId();
    }
});

Template.menuKonsultacja.events({
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
        }else{
            deleteDropdownOptions(specjalnosci);
            setSpecjalnosci(przychodnie.value);
        }

        lekarze.disabled="disabled";
        lekarze.value = 0;
        $('#doctorCalendarInfo').show();
        Session.set('idLekarza','');
        $('#specjalnosci').selectpicker('refresh');
        $('#lekarze').selectpicker('refresh');
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
        if(specjalnosc==0){
            lekarze.disabled="disabled";
        }

        $('#doctorCalendarInfo').show();
        Session.set('idLekarza','');
        $('#lekarze').selectpicker('refresh');
    },
    'change #lekarze':function(){
        var idLekarza = document.getElementById('lekarze').value;

        if(idLekarza==0){
            Session.set('idLekarza','');
            $('#doctorCalendar').fullCalendar('destroy');
            document.getElementById("chat").classList.add("hidden");
            document.getElementById("video").classList.add("hidden");
            $('#doctorCalendarInfo').show();
        }
        else{
            $('#doctorCalendar').fullCalendar('destroy');
            $('#doctorCalendarInfo').hide();
            zaladujKalendarz(idLekarza);
            Session.set('idLekarza', idLekarza);
            document.getElementById("chat").classList.remove("hidden");
            document.getElementById("video").classList.remove("hidden");
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

Template.menuKonsultacja.rendered = function(){
    document.getElementById('close').classList.add('hidden');
    var webrtc = new SimpleWebRTC({
        localVideoEl: 'localVideo',
        remoteVideosEl: 'remotesVideos'
        //autoRequestMedia: true
    });
    $('#start').click(function(){
        var idLekarza = document.getElementById('lekarze').value;
        var room = Meteor.userId()+idLekarza;

        if(idLekarza!=0){
            webrtc.startLocalVideo();
            webrtc.once('readyToCall', function (stream) {
                webrtc.joinRoom(room);
                document.getElementById('close').classList.remove('hidden');
                document.getElementById('start').classList.add('hidden');
            });
        }else{
            alert('Proszê wybraæ lekarza');
        }
    });
    $('#close').click(function(){
        webrtc.leaveRoom();
        webrtc.stopLocalVideo();
        document.getElementById('start').classList.remove('hidden');
        document.getElementById('close').classList.add('hidden');

    });
    webrtc.on('videoAdded', function (video, peer) {
        console.log('video added', peer);
        var remotes = document.getElementById('remotes');
        if (remotes) {
            var container = document.createElement('div');
            container.className = 'videoContainer';
            container.id = 'container_' + webrtc.getDomId(peer);
            container.appendChild(video);

            // suppress contextmenu
            video.oncontextmenu = function () { return false; };

            remotes.appendChild(container);
        }
    });
    webrtc.on('videoRemoved', function (video, peer) {
        var remotes = document.getElementById('remotes');
        var el = document.getElementById(peer ? 'container_' + webrtc.getDomId(peer) : 'localScreenContainer');
        if (remotes && el) {
            remotes.removeChild(el);
        }
    });

    setPrzychodnie();
    $('#przychodnie').selectpicker({

    });
    $('#specjalnosci').selectpicker();
    $('#lekarze').selectpicker();
    Session.set('idLekarza','');

    this.autorun(function() {
        $('#doctorCalendar').fullCalendar('refetchEvents');
        if(Session.get('idLekarza')!==''){
            zaladujKalendarz(Session.get('idLekarza'));
        }
    });
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

setSpecjalnosci =  function(id){
    var specjalnosci = document.getElementById('specjalnosci');
    Specjalnosci.find().forEach(function(specjalnosc){
        var lekarzeZeSpecjalnoscia = Uzytkownicy.find({'profile.id_specjalnosc':specjalnosc._id,'profile.id_klinika':id}).count();
        if(lekarzeZeSpecjalnoscia>0){
            var option = document.createElement("option");
            option.text = specjalnosc.nazwa;
            option.value = specjalnosc._id;
            specjalnosci.add(option,null);
        }
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
        flaga = true;
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
        allDaySlot:false,
        minTime:"06:00:00",
        maxTime:"20:00:00",
        lang: 'pl',
        weekends:true,
        defaultView: 'agendaWeek',
        eventLimit:true,
        selectable:true,
        events: function(start, end, timezone, callback) {
            var events = [];
            var calendar = Wizyty.find({id_lekarz:idLekarza,isAvailable:true});
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
            if(!event.isAccepted){
                element.css("background-color","#E34234");
                element.css("border-color","#E32636");
            }
        },
        eventClick:function(event,jsEvent,view){

        }
    });
}