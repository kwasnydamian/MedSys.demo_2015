/**
 * Created by damian on 11.03.15.
 */
Template.umowioneWizyty.helpers({
    listaWizyt:function(){
        return Wizyty.find({id_pacjent:Meteor.userId()},{limit:5});
    },
    przyszleWizyty:function(){
        return Wizyty.find({id_pacjent:Meteor.userId(),start:{$gte:moment().format()}},{sort:{start:-1}}
            ,{limit:3});
    }
});

Template.registerHelper('formatDate',function(date){
    return moment(date).format('DD-MM-YYYY');
})

