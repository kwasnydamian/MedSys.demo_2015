/**
 * Created by damian on 04.03.15.
 */

if(Meteor.users.find().count()===0){
    // inicjalizacja ról
    Roles.createRole('admin');
    Roles.createRole('doctor');
    Roles.createRole('patient');

    // inicjalizacja specjalności
    var kard = Specjalnosci.insert({
        'nazwa':'kardiologia'
    });
    var neur = Specjalnosci.insert({
        'nazwa':'neurologia'
    });
    var prokt = Specjalnosci.insert({
        'nazwa':'proktologia'
    });

    // inicjalizacja 4 użytkowników
    var user =Accounts.createUser({
        'username': 'admin',
        'email': 'admin@test.com',
        'password': 'admin1',
        'profile': {
          'firstName': "Admin",
           'lastName': "Admin",
           'isDoctor':false,
           'isPatient':false
        }

    });
    Roles.setUserRoles(user,'admin');

    var doctor = Accounts.createUser({
        'username': 'damian',
        'email': 'damian@test.com',
        'password': 'piesek',
        'profile': {
            'firstName': "Damian",
            'lastName': "Kot",
            'isDoctor':true,
            'isPatient':false,
            'id_specjalnosc': prokt
        }
    });
    Roles.setUserRoles(doctor,'doctor');

    var doctor2 = Accounts.createUser({
        'username': 'dorian',
        'email': 'dorian@test.com',
        'password': 'piesek',
        'profile': {
            'firstName': "Dorian",
            'lastName': "Pies",
            'isDoctor':true,
            'isPatient':false,
            'id_specjalnosc': neur
        }
    });
    Roles.setUserRoles(doctor2,'doctor');

    var patient = Accounts.createUser({
        'username': 'pawel',
        'email': 'pawel@test.com',
        'password': 'piesek',
        'profile': {
            'firstName': "Paweł",
            'lastName': "Kowalski",
            'isDoctor':false,
            'isPatient':true
        }
    });
    Roles.setUserRoles(patient,'patient');

    //inicjalicja przychodni
    Przychodnie.insert({
        'nazwa':'Medistat',
        'miejscowosc':'Kraków',
        'adres':'Zielona 27, 34-232'
    });
    Przychodnie.insert({
        'nazwa':'Medikuk',
        'miejscowosc':'Limanowa',
        'adres':'Niebieska 273, 34-222'
    });
    Przychodnie.insert({
        'nazwa':'Medikok',
        'miejscowosc':'Tarnów',
        'adres':'Czerwona 247, 34-333'
    });

    //inicjalizacja województw
    Wojewodztwa.insert({
       'nazwa':'małopolskie'
    });
    Wojewodztwa.insert({
        'nazwa':'wielkopolskie'
    });

    //inicjalizacja powiatów
    Powiaty.insert({
        'nazwa':'chrzanowski'
    });
    Powiaty.insert({
        'nazwa':'nowosądecki'
    });
}