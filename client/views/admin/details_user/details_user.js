/**
 * Created by Soflab on 2015-04-14.
 */
Template.detailsUserTemplate.helpers({
    emailHelper:function(emails){
        return emails[0].address;
    },
    isDoctor:function(id){
        return Roles.userIsInRole(id,['doctor']);
    }
});