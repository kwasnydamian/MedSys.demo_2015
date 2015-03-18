/**
 * Created by damian on 05.03.15.
 */
Uzytkownicy = Meteor.users;

Uzytkownicy.allow({
    update:function(){
        return true;
    }
})