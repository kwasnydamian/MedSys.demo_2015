/**
 * Created by damian on 11.03.15.
 */
Template.umowioneWizyty.helpers({
    umowioneWizyty:function(){
        return Wizyty.find({id_pacjent:Meteor.userId(),start:{$gte:moment().format()}},{sort:{start:1}},{limit:5});
    }
});

Template.registerHelper('formatDate',function(date){
    return moment(date).format('DD-MM-YYYY');
})

