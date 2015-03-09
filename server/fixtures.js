/**
 * Created by damian on 04.03.15.
 */

if(Meteor.users.find().count()===0){
    // inicjalizacja ról
    Roles.createRole('admin');
    Roles.createRole('doctor');
    Roles.createRole('patient');

    // inicjalizacja specjalności
    var kardiolog = Specjalnosci.insert({
        'nazwa':'kardiologia'
    });
    var neurolog = Specjalnosci.insert({
        'nazwa':'neurologia'
    });
    var proktolog = Specjalnosci.insert({
        'nazwa':'proktologia'
    });

    //inicjalicja przychodni
    var medicor = Przychodnie.insert({
        'nazwa':'Medicor Nowy Sącz',
        'miejscowosc':'Kraków',
        'adres':'Zielona 27, 34-232'
    });
    var wojskowy = Przychodnie.insert({
        'nazwa':'V Wojskowy Szpital Kliniczny w Krakowie',
        'miejscowosc':'Limanowa',
        'adres':'Niebieska 273, 34-222'
    });
    var prywatnaKlinika = Przychodnie.insert({
        'nazwa':'Klinika prywatna Maciej Kowalski',
        'miejscowosc':'Tarnów',
        'adres':'Czerwona 247, 34-333'
    });
    var klinikaKrakowska = Przychodnie.insert({
        'nazwa':'Klinika krakowska ',
        'miejscowosc':'Kraków',
        'adres':'Żółta 4, 34-222'
    });

    // inicjalizacja użytkowników
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

    var damian = Accounts.createUser({
        'username': 'damian',
        'email': 'damian@test.com',
        'password': 'piesek',
        'profile': {
            'firstName': "Damian",
            'lastName': "Kot",
            'isDoctor':true,
            'isPatient':false,
            'id_specjalnosc': proktolog,
            'id_klinika': medicor
        }
    });
    Roles.setUserRoles(damian,'doctor');
    var dorian = Accounts.createUser({
        'username': 'dorian',
        'email': 'dorian@test.com',
        'password': 'piesek',
        'profile': {
            'firstName': "Dorian",
            'lastName': "Pies",
            'isDoctor':true,
            'isPatient':false,
            'id_specjalnosc': neurolog,
            'id_klinika': medicor
        }
    });
    Roles.setUserRoles(dorian,'doctor');
    var robert = Accounts.createUser({
        'username': 'robert',
        'email': 'robert@test.com',
        'password': 'piesek',
        'profile': {
            'firstName': "Robert",
            'lastName': "Jaśkiewicz",
            'isDoctor':true,
            'isPatient':false,
            'id_specjalnosc': neurolog,
            'id_klinika':wojskowy
        }
    });
    Roles.setUserRoles(robert,'doctor');
    var marian = Accounts.createUser({
        'username': 'marian',
        'email': 'marian@test.com',
        'password': 'piesek',
        'profile': {
            'firstName': "Marian",
            'lastName': "Błażusiak",
            'isDoctor':true,
            'isPatient':false,
            'id_specjalnosc': neurolog,
            'id_klinika':wojskowy
        }
    });
    Roles.setUserRoles(marian,'doctor');
    var teresa = Accounts.createUser({
        'username': 'teresa',
        'email': 'teresa@test.com',
        'password': 'piesek',
        'profile': {
            'firstName': "Teresa",
            'lastName': "Zakrzewska",
            'isDoctor':true,
            'isPatient':false,
            'id_specjalnosc': kardiolog,
            'id_klinika': prywatnaKlinika
        }
    });
    Roles.setUserRoles(teresa,'doctor');
    var krystyna = Accounts.createUser({
        'username': 'krystyna',
        'email': 'krystyna@test.com',
        'password': 'piesek',
        'profile': {
            'firstName': "Krystyna",
            'lastName': "Pies",
            'isDoctor':true,
            'isPatient':false,
            'id_specjalnosc': kardiolog,
            'id_klinika': prywatnaKlinika
        }
    });
    Roles.setUserRoles(krystyna,'doctor');
    var tomasz = Accounts.createUser({
        'username': 'tomasz',
        'email': 'tomasz@test.com',
        'password': 'piesek',
        'profile': {
            'firstName': "Tomasz",
            'lastName': "Jarosz",
            'isDoctor':true,
            'isPatient':false,
            'id_specjalnosc': proktolog,
            'id_klinika': klinikaKrakowska
        }
    });
    Roles.setUserRoles(tomasz,'doctor');
    var adam = Accounts.createUser({
        'username': 'adam',
        'email': 'adam@test.com',
        'password': 'piesek',
        'profile': {
            'firstName': "Adam",
            'lastName': "Skowron",
            'isDoctor':true,
            'isPatient':false,
            'id_specjalnosc': proktolog,
            'id_klinika': klinikaKrakowska
        }
    });
    Roles.setUserRoles(adam,'doctor');

    var pawel = Accounts.createUser({
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
    Roles.setUserRoles(pawel,'patient');

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

    //inicjalizacja wizyt
    Wizyty.insert({
        'id_pacjent':pawel,
        'id_lekarz': damian,
        'start':'2015-03-09T9:00:00',
        'end':'2015-03-09T11:00:00',
        'title':'wizyta kontrolna',
        'description':'Wykonanie podstawowych badań'
    });
}