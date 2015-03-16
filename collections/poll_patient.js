/**
 * Created by damian on 13.03.15.
 */
PollsPatients = new Meteor.Collection('pollspatients');

PollsPatients.allow({
    insert: function(){
        return true;
    },
    update:function(){
        return true;
    }
})