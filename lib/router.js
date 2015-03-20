/**
 * Created by damian on 04.03.15.
 */
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
    this.route('home', {path: '/',
        onBeforeAction: function () {
            if (Meteor.userId()) {
                this.next();
            } else {
                Router.go('loginTemplate');
            }
            this.next();
        }});

    this.route('loginTemplate',  {path: '/login',
        onBeforeAction: function () {

            if (Meteor.userId()) {
                this.next();
            } else {
                Router.go('loginTemplate');
            }
            this.next();

        }});

    this.route('adminTemplate', {path: '/roles_manage',
        onBeforeAction: function () {
            if (Meteor.userId()) {
                this.next();
            } else {
                Router.go('loginTemplate');
            }
            this.next();
        }});
    this.route('registerVisit', {path: '/register_visit',
        onBeforeAction: function () {
            if (Meteor.userId()) {
                this.next();
            } else {
                Router.go('loginTemplate');
            }
            this.next();
        }
    });

    this.route('patientCalendarTemplate', {path: '/patient_calendar',
        onBeforeAction: function () {
            if (Meteor.userId()) {
                this.next();
            } else {
                Router.go('loginTemplate');
            }
            this.next();
        }
    });

    this.route('doctorCalendarTemplate', {path: '/doctor_calendar',
        onBeforeAction: function () {
            if (Meteor.userId()) {
                this.next();
            } else {
                Router.go('loginTemplate');
            }
            this.next();
        }
    });

    this.route('consultationTemplate', {path: '/doctor_consultation',
        onBeforeAction: function () {
            if (Meteor.userId()) {
                this.next();
            } else {
                Router.go('loginTemplate');
            }
            this.next();
        }
    });
    this.route('client', {path: '/chat'});

    this.route('*', {
        name: 'accessDenied',
        onBeforeAction: function () {
            if (Meteor.userId()) {
                Router.go('home');
            }
            else
            {
                this.render('accessDenied');
            }
        }
    });
});



