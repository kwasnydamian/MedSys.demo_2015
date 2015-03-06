/**
 * Created by damian on 04.03.15.
 */

Router.configure({
    layoutTemplate:'layout',
    WaitOn: function(){
        return [
            Meteor.subscribe('powiaty'),
            Meteor.subscribe('wojewodztwa'),
            Meteor.subscribe('przychodnie'),
            Meteor.subscribe('specjalnosci'),
            Meteor.subscribe('wizyty'),
            Meteor.subscribe('uzytkownicy'),
        ];
    }
});

Router.map(function(){
    this.route('loginTemplate',{path:'/login'})
    this.route('home',{path:'/home'});
    this.route('adminTemplate',{path:'/admin_panel'});
    this.route('registerVisit',{path:'/register_visit'});
});