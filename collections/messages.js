/**
 * Created by Dorian on 10.03.15.
 */
Messages = new Meteor.Collection('messages');
Messages.allow({
    insert:function(){
        if(Meteor.user())
            return true;
        else
            return false;
    }
})
