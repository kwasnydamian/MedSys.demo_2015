/**
 * Created by damian on 04.03.15.
 */
Template.loginTemplate.events({
    'submit form': function(e) {
        e.preventDefault();

        var login = $(e.target).find('[name=login]').val();
        var password = $(e.target).find('[name=password]').val();
        var user = {
            login: login,
            password: password
        }
        console.log(user.login);
        if (isNotEmpty(user.login) && isNotEmpty2(user.password)) {
            Meteor.loginWithPassword(user.login, user.password, function(err) {
                if (err) {
                    console.log(err.message);
                    return alert ('Niepoprawne dane logowania.');
                } else {
                    if(Meteor.loggingIn()) {
                        this.render('loading');
                    }
                    else{
                        Router.go('home');
                    }
                }
            });
        }else{
            return false;
        }

    }
});

function isNotEmpty(login) {
    if (login.length <= 0) {
        alert('Login nie może być pusty');
        return false;
    }
    return true;
}

function isNotEmpty2(password) {
    if(password.length < 3){
        alert('Hasło jest za krótkie');
        return false;
    }

    return true;
}