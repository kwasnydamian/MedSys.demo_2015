/**
 * Created by Soflab on 2015-04-07.
 */
Wiadomosci = new Meteor.Collection('wiadomosci');
Wiadomosci.allow({
    insert:function(){
        if(Meteor.user())
            return true;
        else
            return false;
    }
})