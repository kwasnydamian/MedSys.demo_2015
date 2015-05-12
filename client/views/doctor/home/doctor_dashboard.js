/**
 * Created by damian on 13.03.15.
 */
Template.doctorDashboard.helpers({
   umowioneWizyty:function(){
       return Wizyty.find({id_lekarz:Meteor.userId(),isAvailable:true,start:{$gte:moment().format()}},{limit:5});
   },
    odbyteWizyty:function(){
        return Wizyty.find({id_lekarz:Meteor.userId(),isAvailable:true,start:{$lt:moment().format()}},{limit:5});
    },
    iloscUmowionychWizyt:function(){
        return Wizyty.find({id_lekarz:Meteor.userId(),isAvailable:true,start:{$gte:moment().format()}}).count();
    },
    iloscOdbytychWizyt:function(){
        return Wizyty.find({id_lekarz:Meteor.userId(),isAvailable:true,start:{$lt:moment().format()}}).count();
    }
});

Template.wszystkieWizyty.rendered = function() {
    Session.set('idPollPatient','');
    Session.set('idPoll','');
    Session.set('idPacjenta','');
    document.getElementsByTagName('text').html="";
    this.autorun(function(){
        var wszystkie = [];
        var odrzucone = [];
        var doZaakceptowania = [];

        var data = moment().month("January");
        data = moment(data).date(1);
        data = moment(data).hour(00);
        data = moment(data).minutes(00);
        data = moment(data).seconds(00);

        for(i=0;i<12;i++){
            var itemWszystkie = Wizyty.find({id_lekarz:Meteor.userId(),start:{$gte:moment(data).format(),$lt:moment(data).add(1,'months').format()}}).count();
            wszystkie.push(itemWszystkie);

            var itemOdrzucone = Wizyty.find({id_lekarz:Meteor.userId(),start:{$gte:moment(data).format(),$lt:moment(data).add(1,'months').format()},isAccepted:false,isAvailable:false}).count();
            odrzucone.push(itemOdrzucone);

            var itemDoZaakceptowania = Wizyty.find({id_lekarz:Meteor.userId(),start:{$gte:moment(data).format(),$lt:moment(data).add(1,'months').format()},isAccepted:false,isAvailable:true}).count();
            doZaakceptowania.push(itemDoZaakceptowania);

            var data = moment(data).add(1,'months');
        }

        $('#wszystkie').highcharts({
            title: {
                text: 'Wizyty',
                x: -20 //center
            },
            subtitle: {
                text: '',
                x: -20
            },
            xAxis: {
                categories: ['Sty', 'Lut', 'Mar', 'Kwi', 'Maj', 'Cze',
                    'Lip', 'Sie', 'Wrz', 'Paź', 'Lis', 'Gru']
            },
            yAxis: {
                title: {
                    text: 'Ilość wizyt'
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            tooltip: {
                valueSuffix: ''
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle',
                borderWidth: 0
            },
            series: [{
                name: 'wszystkie',
                data: wszystkie
            },
            {
                name:'odrzucone',
                data: odrzucone
            },
            {
                name:'do zaakceptowania',
                data: doZaakceptowania
            }],
            credits:{
                enabled:false
            }
        });
    });
};

