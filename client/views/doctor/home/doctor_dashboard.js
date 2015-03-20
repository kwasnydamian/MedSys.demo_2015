/**
 * Created by damian on 13.03.15.
 */
Template.doctorDashboard.helpers({
   umowioneWizyty:function(){
       return Wizyty.find({id_lekarz:Meteor.userId(),start:{$gte:moment().format()}},{limit:5});
   },
    odbyteWizyty:function(){
        return Wizyty.find({id_lekarz:Meteor.userId(),start:{$lt:moment().format()}},{limit:5});
    },
    iloscUmowionychWizyt:function(){
        return Wizyty.find({id_lekarz:Meteor.userId(),start:{$gte:moment().format()}}).count();
    },
    iloscOdbytychWizyt:function(){
        return Wizyty.find({id_lekarz:Meteor.userId(),start:{$lt:moment().format()}}).count();
    }
});


