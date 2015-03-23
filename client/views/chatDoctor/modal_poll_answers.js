/**
 * Created by damian on 23.03.15.
 */
Template.pollAnswersModalTemplate.helpers({
    nazwaAnkiety:function(){
        var idAnkiety = Session.get('idPoll');
        return Polls.find({_id:idAnkiety});
    },
    answers:function(){
        return Answers.find({id_pollpatient:Session.get('idPollPatient')});
    },
    idPollPatient:function(){
        return Session.get('idPollPatient');
    }
});