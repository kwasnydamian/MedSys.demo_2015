/**
 * Created by Soflab on 2015-04-03.
 */
Template.rightChat.helpers({
    onlineUsers:function(){
        if(Meteor.user().roles == "doctor")
        return Uzytkownicy.find({_id:{$ne:Meteor.userId()}});
        else if(Meteor.user().roles == "patient")
        return Uzytkownicy.find({_id:{$ne:Meteor.userId()}, 'profile.isDoctor': true, 'status.online': true});
    }
});
Template.rightChat.events({
    'click div.chat-container ul li':function(event){
        var rozmowca = Uzytkownicy.findOne({_id:event.currentTarget.id});
        var activeChatItems = [];
        var flaga = false;

        if(Session.get("activeChatItems")){
            activeChatItems=Session.get("activeChatItems");
            for(var i=0;i<activeChatItems.length;i++){
                if(activeChatItems[i]==rozmowca._id){
                    flaga = true;
                }
            }
        };
        if(flaga==false){
            activeChatItems.push(rozmowca._id);
        }
        Session.set('activeChatItems', activeChatItems);
    }
});

function createChatItem(id){
    var rozmowca = Uzytkownicy.findOne({_id:id});

    // tworzenie elementów
    var div = document.createElement("div");
    var header = document.createElement("div");
    var content = document.createElement("div");
    var footer = document.createElement("div");
    var input = document.createElement("input");
    var header_text = document.createTextNode(rozmowca.profile.lastName+" "+rozmowca.profile.firstName);
    var content_text = document.createTextNode("test test test et efdf d f fd fd d fdfdff dfdf dff d fd fd f fd test test test test test test test test test test test test test test test test test test test test test test test testtest test test test test");
    var footer_text = document.createTextNode(rozmowca.profile.lastName+" "+rozmowca.profile.firstName);

    // nadawanie klas i atrybut�w
    div.classList.add("chat-user-item");
    header.classList.add("item-header");
    content.classList.add("item-content");
    footer.classList.add("item-footer");
    input.setAttribute("type","text");
    input.setAttribute("placeholder","Wiadomość");
    input.classList.add("form-control");

    header.appendChild(header_text);
    content.appendChild(content_text);
    footer.appendChild(input);
    div.appendChild(header);
    div.appendChild(content);
    div.appendChild(footer);


    document.getElementById("chat-users-container").appendChild(div);
}