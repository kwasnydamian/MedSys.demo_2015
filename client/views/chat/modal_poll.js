/**
 * Created by damian on 14.03.15.
 */
Template.pollModalTemplate.helpers({
    idPoll:function(){
        var pollPatient = Session.get('pollPatient');
        alert(pollPatient.id_ankieta);
        return pollPatient.id_ankieta;
    },
   questions:function(idPoll){
       return PollQuestions.find({id_ankiety:idPoll});
   },
    nazwaAnkiety:function(){
        return Polls.find({_id:Session.get('idPoll')});
    }
});

Template.pollModalTemplate.events({
    'form submit':function(){
        var idPollPatient = $(e.target).find('[name=idPollPatient]').val()
        var poll = Polls.find({_id:idPollPatient});
        var questions = PollQuestions.find({id_ankiety:poll._id});
        questions.forEach(function(question){
            var id=question._id;
            var odpowiedz = {
                pytanie: question.pytanie,
                odpowiedz: $(e.target).find('[name=id]').val(),
                id_pollpatient: idPollPatient
            }
            Answers.insert(odpowiedz);
        });
        PollsPatients.update({_id:idPollPatient},{$set:{isDone:true}});
        alert("dodano odpowiedzi i zaktualizowano tabele laczaca");
    }
})