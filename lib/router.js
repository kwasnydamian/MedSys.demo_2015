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
        ];
    }
});

Router.map(function(){
    this.route('home',{path:'/'});
    this.route('adminTemplate',{path:'/admin_panel'});
});