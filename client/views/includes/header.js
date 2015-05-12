/**
 * Created by damian on 04.03.15.
 */
if(Meteor.isClient){
    Template.header.helpers({
        isAdminUser: function(){
            return Roles.userIsInRole(Meteor.user(),['admin']);
        },
        isPatientUser: function(){
            return Roles.userIsInRole(Meteor.user(),['patient'])
        },
        settings:function(){
           return Settings.findOne({});
        },
        notifications:function(){
            return Notifications.find({receiver:Meteor.userId(),wasRead:false});
        },
        isNotification:function(){
            var notif = Notifications.find({receiver:Meteor.userId(),wasRead:false}).count();
            if(notif==0)
                return false;
            else
                return true
        },
        getUserName:function(userId){
            return Uzytkownicy.findOne({_id:userId}).profile.name;
        }
    });

    Template.header.events({
        'click a.notificationItem':function(event){
            Notifications.update(event.target.id,{$set:{wasRead:true}});
            var s = new buzz.sound('/sounds/0547.ogg');
            s.play();
        }
    })
}