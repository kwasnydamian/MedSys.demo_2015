/**
 * Created by damian on 06.03.15.
 */
Template.addWizytaModal.events({
   'submit form': function(e){
       event.preventDefault();
       var bledy = "";
       document.getElementById("poprawFormularz").classList.add("hidden");

       var wizyta = {
           tytul: $(e.target).find('[name=tytul]').val(),
           opis: $(e.target).find('[name=opis]').val()
       };

       if(wizyta.tytul=="" || wizyta.tytul=="undefined") {
           bledy = "Wpisz tytuł.<br />";
       }
       if(wizyta.opis=="" || wizyta.opis=="undefined") {
           bledy += "Wpisz opis.<br />";
       }

       if(bledy!=""){
           document.getElementById("poprawFormularz").classList.remove("hidden");
           var div = document.getElementById("poprawFormularzContent");
           div.innerHTML= bledy;
       }
       else{
          var id = Wizyty.insert(wizyta);
          if(id){
              $("#dodajWizyte").modal('hide');
          }
       }


   }
});
