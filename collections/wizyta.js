/**
 * Created by damian on 05.03.15.
 */
Wizyty =  new Meteor.Collection('wizyty');

Wizyty.allow({
    insert:function(){
        return true;
    }
})