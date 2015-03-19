/**
 * Created by Dorian on 17.03.15.
 */
Template.ostatnieWizyty.helpers({
    przeszleWizyty:function(){
        return Wizyty.find({id_pacjent:Meteor.userId(),start:{$lt:moment().format()}},{sort:{start:-1}},{limit:5});
    }
});

Template.registerHelper('formatDate',function(date){
    return moment(date).format('DD-MM-YYYY');
});
