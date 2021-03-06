/**
 * Created by damian on 20.03.15.
 */
Template.leftNav.helpers({
    isAdminUser: function(){
        return Roles.userIsInRole(Meteor.user(),['admin']);
    },
    isPatientUser: function(){
        return Roles.userIsInRole(Meteor.user(),['patient'])
    },
    isDoctorUser: function(){
        return Roles.userIsInRole(Meteor.user(),['doctor'])
    }
});

Template.leftNav.rendered=function(){
    this.autorun(function(){
        $('li.navLi').on('click',function(){
            var selector = document.getElementsByClassName('navLi');
            for (var i = 0; i < selector.length; i++){
                selector[i].style.color = "#999";
            }
            $(this).attr("style","color:white;");
        });

        var selector = document.getElementsByClassName('navLi');
        for (var i = 0; i < selector.length; i++){
            selector[i].style.color = "#999";
        }
        var path = window.location.pathname.substr(1);
        if(path==""){
            var element = document.getElementsByClassName('home');
            element[0].style.color = "#fff";
        }else{
            var element = document.getElementsByClassName(path);
            element[0].style.color = "#fff";
        }

    });
};