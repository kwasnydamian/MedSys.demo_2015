/**
 * Created by damian on 14.03.15.
 */
Answers = new Meteor.Collection('answers');

Answers.allow({
    insert:function(){
        return true;
    }
})