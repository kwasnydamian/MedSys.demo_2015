/**
 * Created by damian on 25.03.15.
 */
Template.odbyteWizytyDoctorTable.helpers({
    settings: function () {
        return {
            collection: Wizyty.find({id_lekarz:Meteor.userId(),start:{$lt:moment().format()}}),
            rowsPerPage: 10,
            showFilter: true,
            fields: [
                { key: 'title', label: 'Tytuł' },
                { key: 'start', label: 'Termin',fn:function(value,object){
                    return moment(value).format("YYYY-MM-DD HH:mm");
                } },
                { key: 'id_pacjent', label: 'Pacjent',fn:function(value,object){
                    var user = Uzytkownicy.findOne({_id:value});
                    return user.profile.lastName+" "+user.profile.firstName;
                } },
                { key: 'isAvailable', label: 'Dostępne',fn: function (value) {
                    if(value==true)
                        return new Spacebars.SafeString('<span class="fa fa-check"></span>');
                    else
                        return new Spacebars.SafeString('<span class="fa fa-remove"></span>');
                } },
                { key: 'isAccepted', label: 'Zaakaceptowane' ,fn: function (value) {
                    if(value==true)
                        return new Spacebars.SafeString('<span class="fa fa-check"></span>');
                    else
                        return new Spacebars.SafeString('<span class="fa fa-remove"></span>');
                }}
            ]
        };
    }
})