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
            Meteor.subscribe('messages')
        ];
    }
});

Router.map(function(){
    this.route('loginTemplate',{path:'/login'})
    this.route('home',{path:'/'});
    this.route('adminTemplate',{path:'/admin_panel'});
    this.route('registerVisit',{
        path:'/register_visit'
        //waitOn:function(){
        //    return Meteor.subscribe("wojewodztwa");
        //}
    });
    this.route('client',{path:'/chat'});
});

var requireLogin = function() {
    if (!Meteor.user()) {
        if(Meteor.loggingIn()){
            this.render(this.loadingTemplate);
        }
        else {
            this.render('home');
        }
    }
    this.next();
}

Router.before(requireLogin,{only:'registerVisit'});