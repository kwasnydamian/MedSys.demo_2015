/**
 * Created by damian on 04.03.15.
 */
Router.onBeforeAction(function(){
    if (Meteor.userId()) {
        this.next();
    } else {
        Router.go('loginTemplate');
        this.next();
    }
});

Router.configure({
    layoutTemplate:'layout',
    loadingTemplate:'loading',
    waitOn: function(){
        return [
            Meteor.subscribe('przychodnie'),
            Meteor.subscribe('specjalnosci'),
            Meteor.subscribe('uzytkownicy'),
            Meteor.subscribe('powiaty'),
            Meteor.subscribe('wojewodztwa'),
            Meteor.subscribe('wizyty'),
            Meteor.subscribe('messages'),
            Meteor.subscribe('messagesDoctor'),
            Meteor.subscribe('polls'),
            Meteor.subscribe('pollquestions'),
            Meteor.subscribe('pollspatients'),
            Meteor.subscribe('answers'),
            Meteor.subscribe('wiadomosci'),
            Meteor.subscribe('settings'),
            Meteor.subscribe('notifications')
        ];
    }
});

Router.map(function() {
    this.route('home', {path: '/'});
    this.route('loginTemplate',  {path: '/login'});
    this.route('adminTemplate', {path: '/roles_manage'});
    this.route('registerVisit', {path: '/register_visit'});
    this.route('patientCalendarTemplate', {path: '/patient_calendar'});
    this.route('doctorCalendarTemplate', {path: '/doctor_calendar'});
    this.route('consultationTemplate', {path: '/doctor_consultation'});
    this.route('statsTemplate', {path: '/admin_stats'});
    this.route('videoTemplate', {path: '/video'});
    this.route('umowioneWizytyDoctorTable', {path: '/appointment_visities'});
    this.route('odbyteWizytyDoctorTable', {path: '/last_visities'});
    this.route('addUserTemplate', {path: '/add_user'});
    this.route('editUserTemplate',{
        path:'/edit_user/:_id',
        data: function(){
            return Uzytkownicy.findOne(this.params._id);
        }
    });
    this.route('detailsUserTemplate',{
        path:'/details_user/:_id',
        data:function(){
            return Uzytkownicy.findOne(this.params._id);
        }
    });
    this.route('systemSettingsTemplate',{
        path:'/system_settings',
        data:function(){
            return Settings.findOne();
        }
    });
    this.route('menuKonsultacja', {path: '/menu_konsultacja'})
});


// funkcje wywoływanie przed załadowaniem template
var BeforeHooks = {
    isAdmin: function() {
        if(Roles.userIsInRole(Meteor.user(),['admin']))
            this.next();
        else
           Router.go('home');
    },
    isDoctor: function() {
        if(Roles.userIsInRole(Meteor.user(),['doctor']))
            this.next();
        else
            Router.go('home');
    },
    isPatient: function() {
        if(Roles.userIsInRole(Meteor.user(),['patient']))
            this.next();
        else
            Router.go('home');
    }
}
Router.before(BeforeHooks.isAdmin,{only:['addUserTemplate','adminTemplate','statsTemplate']});
Router.before(BeforeHooks.isDoctor,{only:['doctorCalendarTemplate','consultationTemplate','videoTemplate','umowioneWizytyDoctorTable','odbyteWizytyDoctorTable']});
Router.before(BeforeHooks.isPatient,{only:['registerVisit']});

// funkcje wywoływane po załadowaniu template
var AfterHooks = {
    navActive: function(){
        //var a = window.location.pathname;
        //alert(a);
    }

}

Router.onAfterAction(AfterHooks.navActive);