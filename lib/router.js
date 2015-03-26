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
            Meteor.subscribe('answers')
        ];
    }
});

Router.map(function() {
    this.route('home', {path: '/'});
    this.route('loginTemplate',  {path: '/login'});
    this.route('adminTemplate', {path: '/roles_manage'});
    this.route('registerVisit', {path: '/register_visit'});
    this.route('patientCalendarTemplate', {path: '/patient_calendar',});
    this.route('doctorCalendarTemplate', {path: '/doctor_calendar'});
    this.route('consultationTemplate', {path: '/doctor_consultation'});
    this.route('statsTemplate', {path: '/admin_stats'});
    this.route('videoTemplate', {path: '/video'});
    this.route('umowioneWizytyDoctorTable', {path: '/appointment_visities'});
    this.route('odbyteWizytyDoctorTable', {path: '/last_visities'});
    this.route('addUserTemplate', {path: '/add_user'});
});

