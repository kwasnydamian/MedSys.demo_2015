/**
 * Created by damian on 05.03.15.
 */
Uzytkownicy = Meteor.users;

Uzytkownicy.allow({
    insert:function(){
        return true;
    },
    update:function(){
        return true;
    }
});

Meteor.methods({
    addUser:function(user){
        if(_.isObject(user)){
            if(user.username){
                var id = Accounts.createUser(user);
                _.extend(user,{_id:id});
                return user;
            }
        }
    },
    editUser:function(user,_id){
        if(_.isObject(user)){
            Uzytkownicy.update(_id,{$set:user},{upsert:true});
        }
    }
});