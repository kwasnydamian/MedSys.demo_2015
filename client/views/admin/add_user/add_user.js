/**
 * Created by damian on 25.03.15.
 */
Template.addUserTemplate.helpers({
   'role':function(){
       return Roles.getAllRoles();
   }
});

Template.addUserTemplate.events({
   'submit form':function(event){
       event.preventDefault();

       var username = $(event.target).find('[name=Login]').val();
       var email = $(event.target).find('[name=Email]').val();
       var password = $(event.target).find('[name=Haslo]').val();
       var passwordCheck = $(event.target).find('[name=Haslo2]').val();
       var firstName = $(event.target).find('[name=Imie]').val();
       var lastName = $(event.target).find('[name=Nazwisko]').val();
       var rola = $(event.target).find('[name=Rola]:checked').val();
       var isDoctor = false;
       var isPatient = false;

       if(rola=="doctor")
           isDoctor=true;
       if(rola=="patient")
           isPatient=true;

       var user = {
           username: username,
           email:email,
           password:password,
           profile:{
               firstName:firstName,
               lastName: lastName,
               isDoctor: isDoctor,
               isPatient: isPatient,
               name: lastName+" "+firstName
           }
       }

       if(validateUser(user,rola,passwordCheck)){
           Meteor.call('addUser',user,function(error,user){
               if(error){
                   alert("błąd "+error.reason);
               }else{
                   Roles.setUserRoles(user._id,rola);
                   Router.go('adminTemplate');
               }
           });
       }
   },
    'keyup #Haslo2':function(){
        var haslo2 = document.getElementById('Haslo2').value;
        var haslo = document.getElementById('Haslo').value;
        if(haslo!==haslo2){
            document.getElementById('Haslo2Group').classList.add('has-error');
            document.getElementById('Haslo2Error').innerHTML="Hasła są różne";
        }else{
            document.getElementById('Haslo2Group').classList.remove('has-error');
            document.getElementById('Haslo2Error').innerHTML="";
        }
    }
});

function validateUser(user,rola,passwordCheck){
    var bledyCount = 0;

    // login
    if(user.username=="" || user.username==undefined){
        document.getElementById('LoginGroup').classList.add('has-error');
        document.getElementById('LoginError').innerHTML="Login jest wymagany";
        bledyCount++;
    }else if(user.username.length<6){
        document.getElementById('LoginGroup').classList.add('has-error');
        document.getElementById('LoginError').innerHTML="Login musi się składać przynajmniej z 6 znaków";
        bledyCount++;
    }else if(user.username.length>20){
        document.getElementById('LoginGroup').classList.add('has-error');
        document.getElementById('LoginError').innerHTML="Login może się składać conajwyżej z 20 znaków";
        bledyCount++;
    }else{
        document.getElementById('LoginGroup').classList.remove('has-error');
        document.getElementById('LoginError').innerHTML="";
    }
    // hasło
    if(user.password=="" || user.password==undefined){
        document.getElementById('HasloGroup').classList.add('has-error');
        document.getElementById('HasloError').innerHTML="Hasło jest wymagane";
        bledyCount++;
    }else if(user.password.length<6){
        document.getElementById('HasloGroup').classList.add('has-error');
        document.getElementById('HasloError').innerHTML="Hasło musi się składać przynajmniej z 6 znaków";
        bledyCount++;
    }else{
        document.getElementById('HasloGroup').classList.remove('has-error');
        document.getElementById('HasloError').innerHTML="";
    }
    // hasło2
    if(user.password=="" || user.password==undefined){
        document.getElementById('Haslo2Group').classList.add('has-error');
        document.getElementById('Haslo2Error').innerHTML="Powtórzenie hasła jest wymagane";
        bledyCount++;
    }else if(user.password!==passwordCheck){
        document.getElementById('Haslo2Group').classList.add('has-error');
        document.getElementById('Haslo2Error').innerHTML="Hasła są różne";
        bledyCount++;
    }else{
        document.getElementById('Haslo2Group').classList.remove('has-error');
        document.getElementById('Haslo2Error').innerHTML="";
    }
    // email
    if(user.email=="" || user.email==undefined){
        document.getElementById('EmailGroup').classList.add('has-error');
        document.getElementById('EmailError').innerHTML="Email jest wymagany";
        bledyCount++;
    }else{
        document.getElementById('EmailGroup').classList.remove('has-error');
        document.getElementById('EmailError').innerHTML="";
    }
    // imię
    if(user.profile.firstName=="" || user.profile.firstName==undefined){
        document.getElementById('ImieGroup').classList.add('has-error');
        document.getElementById('ImieError').innerHTML="Imię jest wymagane";
        bledyCount++;
    }else{
        document.getElementById('ImieGroup').classList.remove('has-error');
        document.getElementById('ImieError').innerHTML="";
    }
    // nazwisko
    if(user.profile.lastName=="" || user.profile.lastName==undefined){
        document.getElementById('NazwiskoGroup').classList.add('has-error');
        document.getElementById('NazwiskoError').innerHTML="Nazwisko jest wymagane";
        bledyCount++;
    }else{
        document.getElementById('NazwiskoGroup').classList.remove('has-error');
        document.getElementById('NazwiskoError').innerHTML="";
    }
    // rola
    if(rola=="" || rola==undefined){
        document.getElementById('RolaGroup').classList.add('has-error');
        document.getElementById('RolaError').innerHTML="Rola jest wymagana";
        bledyCount++;
    }else{
        document.getElementById('RolaGroup').classList.remove('has-error');
        document.getElementById('RolaError').innerHTML="";
    }

    if(bledyCount!==0)
        return false;
    else
        return true;
}
