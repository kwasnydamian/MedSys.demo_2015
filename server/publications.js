/**
 * Created by damian on 04.03.15.
 */
if(Meteor.isServer){
    Meteor.publish('powiaty',function(){
        return Powiaty.find();
    });
    Meteor.publish('przychodnie',function(){
        return Przychodnie.find({});
    });
    Meteor.publish('specjalnosci',function(){
        return Specjalnosci.find();
    });
    Meteor.publish('wojewodztwa',function(){
        return Wojewodztwa.find();
    });
    Meteor.publish('wizyty',function(){
        return Wizyty.find();
    });
    Meteor.publish('uzytkownicy',function(){
        return Uzytkownicy.find();
    });
}