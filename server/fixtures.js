/**
 * Created by damian on 04.03.15.
 */

if(Meteor.users.find().count()===0){
    Roles.createRole('admin');
    Roles.createRole('doctor');
    Roles.createRole('patient');

    var user =Accounts.createUser({
        'username': 'admin',
        'email': 'admin@test.com',
        'password': 'admin1',
        'firstName':'Admin',
        'lastName': 'Admin'
    });
    Roles.setUserRoles(user,'admin');

    var doctor = Accounts.createUser({
        'username': 'damian',
        'email': 'damian@test.com',
        'password': 'piesek',
        'firstName':'Damian',
        'lastName': 'Nowak',
        'Name':'Nejm',
        'id_specjalnosc': 'specjalnosc1'
    });
    Roles.setUserRoles(doctor,'doctor');

    var patient = Accounts.createUser({
        'username': 'pawel',
        'email': 'pawel@test.com',
        'password': 'piesek',
        'firstName':'Pawel',
        'lastName': 'Kowalski'
    });
    Roles.setUserRoles(patient,'patient');

}