/**
 * Created by damian on 11.03.15.
 */

Template.patientDashboard.helpers({
    iloscUmowionychWizyt:function(){
        return Wizyty.find({id_pacjent:Meteor.userId(),start:{$gte:moment().format()}}).count();
    },
    iloscOstatnichWizyt:function(){
        return Wizyty.find({id_pacjent:Meteor.userId(),start:{$lt:moment().format()}}).count();
    }
})



