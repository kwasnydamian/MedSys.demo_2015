/**
 * Created by damian on 04.03.15.
 */
Meteor.publish('powiaty', function () {
    return Powiaty.find();
});
Meteor.publish('przychodnie', function () {
    return Przychodnie.find();
});
Meteor.publish('specjalnosci', function () {
    return Specjalnosci.find();
});
Meteor.publish('uzytkownicy', function () {
    return Uzytkownicy.find();
});
Meteor.publish('wizyty', function () {
    return Wizyty.find();
});
Meteor.publish('wojewodztwa', function () {
    return Wojewodztwa.find();
});
Meteor.publish('lekarze', function () {
    return Uzytkownicy.find({'profile.isDoctor':true});
});
Meteor.publish('messages', function (){
   return Messages.find();
});
Meteor.publish('messagesDoctor', function (){
    return Messages.find();
});
Meteor.publish('polls', function (){
    return Polls.find();
});
Meteor.publish('pollquestions', function (){
    return PollQuestions.find();
});
Meteor.publish('pollspatients', function (){
    return PollsPatients.find();
});
Meteor.publish('answers', function (){
    return Answers.find();
});
Meteor.publish('wiadomosci', function (){
    return Wiadomosci.find();
});
Meteor.publish('settings', function (){
    return Settings.find();
});
Meteor.publish('notifications',function(){
   return Notifications.find();
});