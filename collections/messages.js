/**
 * Created by Dorian on 10.03.15.
 */
Messages = new Meteor.Collection('messages');
Messages.allow({
    insert:function(){
        return true;
    }
})
