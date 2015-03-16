/**
 * Created by damian on 14.03.15.
 */
Template.pollModalTemplate.helpers({
    nazwaAnkiety:function(){
        var idAnkiety = Session.get('idPoll');
        return Polls.find({_id:idAnkiety});
    },
    questions:function(){
        return PollQuestions.find({id_ankiety:Session.get('idPoll')});
    },
    idPollPatient:function(){
        return Session.get('idPollPatient');
    }
});

Template.pollModalTemplate.events({
    'submit #answersForm':function(event){
        event.preventDefault();

        var idPollPatient = Session.get('idPollPatient');
        var idPoll = Session.get('idPoll');
        var questions = PollQuestions.find({id_ankiety:idPoll});

        questions.forEach(function(question){
            var id=question._id;
            var odp = document.getElementById(id);
            var odpowiedz = {
                pytanie: question.pytanie,
                odpowiedz: odp.value,
                id_pollpatient: idPollPatient
            }
            Answers.insert(odpowiedz);
        });
        PollsPatients.update({_id:idPollPatient},{$set:{isDone:true}});
        $("#pollModal").modal('hide');
        Session.set('idPoll','');
        Session.set('idPollPatient','');
    }
})