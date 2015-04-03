/**
 * Created by damian on 18.03.15.
 */
Template.adminDashboard.helpers({
    usersStatus:function(){
        var u =Uzytkownicy.find({ });
        return u;
    },
    settings: function () {
        return {
            collection: Uzytkownicy.find({}),
            rowsPerPage: 10,
            showFilter: true,
            fields: [
                { key: 'status.online', label: 'status',fn:function(value,object){
                    if(value==true)
                        return new Spacebars.SafeString('<span class="fa fa-circle text-success"></span>');
                    else
                        return new Spacebars.SafeString('<span class="fa fa-circle-thin"></span>');
                } },
                { key: '_id', label: 'Użytkownik',fn:function(value,object){
                    var user = Uzytkownicy.findOne({_id:value});
                    return user.profile.lastName+" "+user.profile.firstName;
                } },
                { key: 'status.lastLogin.date', label: 'Ostatnia aktywność',fn: function (value) {
                    if(value!=null)
                        return moment(value).format("YYYY-MM-DD HH:mm");
                    else
                        return "";
                } }
            ]
        };
    }

});

Template.registerHelper('formatLongDate',function(date){
    if(date!="" && date !=undefined){
        return moment(date).format('DD-MM-YYYY HH:mm:ss');
    }
});