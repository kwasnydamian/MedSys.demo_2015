/**
 * Created by damian on 04.03.15.
 */

Router.configure({
    layoutTemplate:'layout',
    //loadingTemplate:'loading',
    WaitOn: function(){
        return [
           // Meteor.subscribe('allUsers'),
           // Meteor.subscribe('usersGroup'),
           // Meteor.subscribe('animals')
            Meteor.subscribe('calendar', function () {
                Session.set('superCalendarReady', true);
            })
        ];
    }
});

Router.map(function(){
    this.route('loginTemplate',{path:'/login'})
    this.route('home',{path:'/home'});
    this.route('adminTemplate',{path:'/admin_panel'});
    this.route('registerVisit',{path:'/register_visit'});
});

