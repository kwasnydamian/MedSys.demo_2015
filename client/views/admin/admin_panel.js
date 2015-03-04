/**
 * Created by damian on 04.03.15.
 */
if(Meteor.isServer){
    Meteor.startup(function(){
        if(Meteor.users.findOne("XkX6NbrmEQ8fmLLND"))
            Roles.addUsersToRoles("XkX6NbrmEQ8fmLLND",['admin'])
    });
}
if(Meteor.isClient){
    Template.adminTemplate.helpers({
        isAdminUser: function(){
            return Roles.userIsInRole(Meteor.user(),['admin']);
        }
    });
}