/**
 * Created by damian on 04.03.15.
 */
if(Meteor.isClient){
    Template.header.helpers({
        isAdminUser: function(){
            return Roles.userIsInRole(Meteor.user(),['admin']);
        },
        isPatientUser: function(){
            return Roles.userIsInRole(Meteor.user(),['patient'])
        }
    });
}