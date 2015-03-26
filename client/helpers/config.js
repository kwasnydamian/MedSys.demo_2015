/**
 * Created by damian on 04.03.15.
 */
Accounts.ui.config({
    passwordSignupFields: 'USERNAME_AND_OPTIONAL_EMAIL',
    requestPermissions:{},
    extraSignupFields:[{
        fieldName: 'firstName',
        fieldLabel: 'Imię',
        inputType: 'text',
        visible: true,
        saveToProfile: true
    },{
        fieldName: 'lastName',
        fieldLabel: 'Nazwisko',
        inputType: 'text',
        visible: true,
        saveToProfile: true
    }]

});

i18n.setLanguage('pl');