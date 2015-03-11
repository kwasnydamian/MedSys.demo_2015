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
     },
     'change #specjalnosci': function(){
         var lekarze = document.getElementById("lekarze");
         var specjalnosc = document.getElementById("specjalnosci").value;
         var przychodnie = document.getElementById("przychodnie").value;
         deleteDropdownOptions(lekarze);
         Uzytkownicy.find({'profile.isDoctor':true, 'profile.id_specjalnosc':specjalnosc
             ,'profile.id_klinika':przychodnie}).forEach(function(uzytkownik){
             var option = document.createElement("option");
             option.text = uzytkownik.username;
             option.value = uzytkownik._id;
             lekarze.add(option,null);
         });
         lekarze.disabled="";
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
    var subscriptionPrzychodnie = Meteor.subscribe('przychodnie');
    var subscriptionSpecjalnosci = Meteor.subscribe('specjalnosci');
    var subscriptionLekarze = Meteor.subscribe('lekarze');

    this.autorun(function(computation){
        if(subscriptionPrzychodnie.ready() && subscriptionSpecjalnosci.ready() && subscriptionLekarze.ready()){
            setPrzychodnie();
            setSpecjalnosci();

            computation.stop();
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
};

sprawdzCzyWybranoLekarza = function(){
    var flaga = false;
    var lekarz = document.getElementById('lekarze').value;
    if(lekarz!=0 && lekarz != "0" && lekarz != "undefined" && lekarz !=""){
        flaga=true;
    }
    return flaga;
};

