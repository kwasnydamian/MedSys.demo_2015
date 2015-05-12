/**
 * Created by Soflab on 2015-04-14.
 */
Template.systemSettingsTemplate.events({
    'submit form':function(e){
        e.preventDefault();

        var _id = $(event.target).find('[name=Id]').val();
        var systemname = $(event.target).find('[name=SystemName]').val();
        var systemnamecolor = $(event.target).find('[name=SystemNameColor]').val();
        var chatheadercolor = $(event.target).find('[name=ChatHeaderColor]').val();

        var settings = {
            systemname: systemname,
            systemnamecolor:systemnamecolor,
            chatheadercolor:chatheadercolor
        }
        if(validateSettings(settings)){
            Meteor.call('editSettings',settings,_id,function(error){
                if(error){
                    AntiModals.alert("błąd "+error.reason);
                }else{
                    AntiModals.alert("Zapisano");
                }
            });
        }

    }
})

function validateSettings(settings){
    var bledyCount = 0;

    // systemname
    if(settings.systemname=="" || settings.systemname==undefined){
        document.getElementById('SystemNameGroup').classList.add('has-error');
        document.getElementById('SystemNameError').innerHTML="Nazwa systemu jest wymagana";
        bledyCount++;
    }else{
        document.getElementById('SystemNameGroup').classList.remove('has-error');
        document.getElementById('SystemNameError').innerHTML="";
    }

    if(bledyCount!==0)
        return false;
    else
        return true;
}