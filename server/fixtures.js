/**
 * Created by damian on 04.03.15.
 */

if(Meteor.users.find().count()===0){
    var user = Meteor.users.insert({
        profile: {Imie:"Administrator", Nazwisko:"główny"},
        username: "admin",
        services: {password:{bcrypt:"$2a$10$SIq.6patpDF.Fcm6Tu1YQOUJzWllhBdATwOqu4zaiHozIvdgrNFlC"}}
    })

    Roles.createRole('admin');
    Roles.createRole('doctor');
    Roles.createRole('patient');

    Roles.setUserRoles(user,'admin');

    Accounts.createUser({
        'username': 'damian',
        'email': 'damian@test.com',
        'password': 'piesek',
        'firstName':'Damian',
        'lastName': 'Nowak'
    });
    Accounts.createUser({
        'username': 'pawel',
        'email': 'pawel@test.com',
        'password': 'piesek',
        'firstName':'Pawel',
        'lastName': 'Kowalski'
    });
}