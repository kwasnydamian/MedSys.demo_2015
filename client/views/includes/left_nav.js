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
})