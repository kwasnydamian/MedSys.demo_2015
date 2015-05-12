/**
 * Created by Soflab on 2015-04-10.
 */
Template.editUserTemplate.helpers({
    emailHelper:function(emails){
        return emails[0].address;
    },
    isDoctor:function(id){
        return Roles.userIsInRole(id,['doctor']);
    }
});

Template.editUserTemplate.events({
    'submit form':function(e){
        e.preventDefault();

        var avatar = document.getElementById("avatar").src;
        var chatAvatar = document.getElementById("chat-avatar").value;
        var _id = $(event.target).find('[name=Id]').val();
        var username = $(event.target).find('[name=Login]').val();
        var email = $(event.target).find('[name=Email]').val();
        var firstName = $(event.target).find('[name=Imie]').val();
        var lastName = $(event.target).find('[name=Nazwisko]').val();
        var tytul = $(event.target).find('[name=Tytul]').val();
        var ulica = $(event.target).find('[name=Ulica]').val();
        var miejscowosc = $(event.target).find('[name=Miejscowosc]').val();
        var image = $(event.target).find('[name=ImageUrl]').val();

        var user = {
            username: username,
            emails:{0:{address:email}},
            profile:{
                firstName:firstName,
                lastName: lastName,
                name: lastName+" "+firstName,
                academicTitle:tytul,
                street:ulica,
                city:miejscowosc,
                image:image,
                avatar:avatar,
                chatAvatar:chatAvatar
            }
        }
        if(validateUser(user,email)){
            Meteor.call('editUser',user,_id,function(error,user){
                if(error){
                    alert("błąd "+error.reason);
                }else{
                    Router.go('home');
                }
            });
        }

    }
});

Template.editUserTemplate.rendered = function(){
    $(".img-rounded").cropper({
        aspectRatio: 1 / 1
    });

    $('.img-rounded').on('dragend.cropper', function (e) {
        document.getElementById("avatar").src=$(".img-rounded").cropper('getCroppedCanvas',{width:100,height:100}).toDataURL();
        document.getElementById("chat-avatar").value=$(".img-rounded").cropper('getCroppedCanvas',{width:20,height:20}).toDataURL();;
    });
}

function validateUser(user,email){
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
    // email
    if(email=="" || email==undefined){
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

    if(bledyCount!==0)
        return false;
    else
        return true;
}