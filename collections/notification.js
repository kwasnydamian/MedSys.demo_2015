/**
 * Created by Soflab on 2015-04-15.
 */
Notifications = new Meteor.Collection('notifications');
Notifications.allow({
    insert:function(){
        if(Meteor.user())
            return true;
        else
            return false;
    },
    update:function(){
        if(Meteor.user())
            return true;
        else
            return false;
    }
})