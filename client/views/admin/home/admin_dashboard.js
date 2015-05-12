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
            rowClass: function(item) {
                //return item._id;
            },
            fields: [
                { key: 'status.online', label: 'Status',fn:function(value,object){
                    if(value==true)
                        return new Spacebars.SafeString('<span id="'+object._id+'" class="fa fa-circle text-success"></span>');
                    else
                        return new Spacebars.SafeString('<span id="'+object._id+'" class="fa fa-circle-thin"></span>');
                } },
                { key: 'profile.firstName', label: 'Imię' },
                { key: 'profile.lastName', label: 'Nazwisko' },
                { key: 'status.lastLogin.date', label: 'Ostatnia aktywność',fn: function (value) {
                    if(value!=null)
                        return moment(value).format("YYYY-MM-DD HH:mm");
                    else
                        return "";
                } },
                { key: 'opcje', label: 'Opcje',
                    fn: function (value,object) {
                    return new Spacebars.SafeString('<a id="'+object._id+'" class="edit btn btn-default btn-sm">Edycja</a> ' +
                    '<a id="'+object._id+'" class="details btn btn-default btn-sm">Szczegóły</a> ');
                    },
                    cellClass:'col-md-2'
                }
            ]
        };
    }

});

Template.adminDashboard.events({
    'click .reactive-table tr': function (event) {
        var tr = event.target.parentNode.classList[0];
    },
    'click .reactive-table tr a.edit': function (event) {
        var id = event.target.id;
        Router.go('/edit_user/'+id);
    },
    'click .reactive-table tr a.details': function (event) {
        var id = event.target.id;
        Router.go('/details_user/'+id);
    },
    'click .reactive-table tr a.delete': function (event) {
        event.preventDefault();
        var id = event.target.id;
    }
});

Template.registerHelper('formatLongDate',function(date){
    if(date!="" && date !=undefined){
        return moment(date).format('DD-MM-YYYY HH:mm:ss');
    }
});

//ReactiveTable.publish({
//    fields:{'profile.lastName':1}
//});