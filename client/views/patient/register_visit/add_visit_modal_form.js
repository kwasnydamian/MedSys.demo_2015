/**
 * Created by damian on 06.03.15.
 */
Template.addWizytaModal.events({
   'submit form': function(e){
       event.preventDefault();
       var bledy = "";
       var idLekarz = document.getElementById("lekarze").value;
       document.getElementById("formErrors").classList.add("hidden");
       var data = document.getElementById("start").value;
       var wizyta = {
           title: $(e.target).find('[name=title]').val(),
           description: $(e.target).find('[name=description]').val(),
           start: moment($(e.target).find('[name=start]').val()).format("YYYY-MM-DDTHH:mm:ssZZ"),
           end: moment(moment(data).add(30,'minutes')).format("YYYY-MM-DDTHH:mm:ssZZ"),
           id_pacjent: Meteor.userId(),
           id_lekarz: idLekarz,
           isAvailable: true,
           isAccepted: false
       };

       if(wizyta.title=="" || wizyta.tytul=="undefined") {
           bledy = "Wpisz tytuł.<br />";
       }
       if(wizyta.description=="" || wizyta.opis=="undefined") {
           bledy += "Wpisz opis.<br />";
       }
       if(wizyta.start=="" || wizyta.start=="undefined" || wizyta.start=="Invalid date") {
           bledy += "Wybierz termin.<br />";
       }

       if(bledy!=""){
           document.getElementById("formErrors").classList.remove("hidden");
           var div = document.getElementById("formErrorsContent");
           div.innerHTML= bledy;
       }
       else{
          var id = Wizyty.insert(wizyta);
          if(id){
              $("#dodajWizyte").modal('hide');
              //document.getElementById("formSuccess").classList.remove("hidden");
              $("#doctorCalendar").fullCalendar('refetchEvents');
          }
       }
   }
});

Template.addWizytaModal.rendered = function(){
    $('.datetimepicker').datetimepicker({
       sideBySide:true
    });
}