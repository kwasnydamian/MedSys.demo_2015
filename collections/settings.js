/**
 * Created by Soflab on 2015-04-14.
 */
Settings = new Meteor.Collection('settings');

Settings.allow({
    insert:function(){
        return true;
    },
    update:function(){
        return true;
    }
});

Meteor.methods({
    editSettings:function(settings,_id){
        if(_.isObject(settings)){
            Settings.update(_id,{$set:settings},{upsert:true});
        }
    }
});