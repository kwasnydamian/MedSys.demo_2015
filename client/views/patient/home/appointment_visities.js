/**
 * Created by damian on 11.03.15.
 */
Template.umowioneWizyty.helpers({
    umowioneWizyty:function(){
        return Wizyty.find({id_pacjent:Meteor.userId(),start:{$gte:moment().format()}},{limit:5},{sort:{start:-1}});
    }
});

Template.registerHelper('formatDate',function(date){
    return moment(date).format('DD-MM-YYYY');
})

