/**
 * Created by Dorian on 17.03.15.
 */
Template.ostatnieWizyty.helpers({
    przeszleWizyty:function(){
        return Wizyty.find({id_pacjent:Meteor.userId(),start:{$lt:moment().format()}},{limit:5},{sort:{start:-1}});
    }
});

Template.registerHelper('formatDate',function(date){
    return moment(date).format('DD-MM-YYYY');
});
Template.registerHelper('formatDateHour',function(date){
    return moment(date).format('DD-MM-YYYY HH:mm');
});