/**
 * Created by Soflab on 2015-04-07.
 */
Template.bottomChat.helpers({
    activeChatItems:function(){
        return Session.get("activeChatItems");
    }
});

Template.itemChat.helpers({
   userChat:function(id){
       return Uzytkownicy.findOne({_id:id});
   },
    wiadomosci:function(id){
        return Wiadomosci.find({$or:[{id_autor:id,id_rozmowca:Meteor.userId()},{id_autor:Meteor.userId(),id_rozmowca:id}]});
    },
    isAuthor:function(id){
        var wiadomosc = Wiadomosci.findOne({_id:id});
        if(wiadomosc.id_autor==Meteor.userId())
            return true
        else
            return false
    }
});

Template.itemChat.events({
    'click #close-chat-item':function(event){
        var activeChatItems = Session.get("activeChatItems");
        for(var i=0;i<activeChatItems.length;i++){
            if(activeChatItems[i]==event.target.parentNode.id){
                delete activeChatItems[i];
            }
        }
        Session.set("activeChatItems",activeChatItems);
    },
    'keydown input#wiadomosc' : function (event) {
        if (event.which == 13) {
            var wiadomosc = event.target;
            var rozmowca = Uzytkownicy.findOne({_id: event.target.parentNode.id});

            if (wiadomosc.value != '') {
                Wiadomosci.insert({
                    message: wiadomosc.value,
                    time: moment().format("DD-MM-YYYY H:mm:ss"),
                    username: Meteor.user().profile.lastName + " " + Meteor.user().profile.firstName,
                    id_autor: Meteor.user()._id,
                    id_rozmowca: rozmowca._id
                });
                wiadomosc.value = '';

                var a = document.getElementsByClassName("item-content");
                for(var i=0;i< a.length;i++){
                    $(a[i]).scrollTop(a[i].scrollHeight);
                }
            }
        }
    }
});

Template.itemChat.rendered = function(){
    this.autorun(function(){
        var a = document.getElementsByClassName("item-content");
        for(var i=0;i< a.length;i++){
           $(a[i]).scrollTop(a[i].scrollHeight);
        }
    });
 }