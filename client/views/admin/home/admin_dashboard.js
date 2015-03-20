/**
 * Created by damian on 18.03.15.
 */
Template.adminDashboard.helpers({
    usersStatus:function(){
        var u =Uzytkownicy.find({ });
        return u;
    }
});

Template.registerHelper('formatLongDate',function(date){
    if(date!="" && date !=undefined){
        return moment(date).format('DD-MM-YYYY HH:mm:ss');
    }
});