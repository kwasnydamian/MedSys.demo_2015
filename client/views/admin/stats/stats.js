/**
 * Created by damian on 24.03.15.
 */
Template.statsTemplate.rendered = function(){
    this.autorun(function(){
        $(function () {
            $('#uzytkownicy').highcharts({
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false
                },
                title: {
                    text: 'Użytkownicy systemu'
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: false
                        },
                        showInLegend: true
                    }
                },
                series: [{
                    type: 'pie',
                    name: 'Rola',
                    data: [
                        ['Administratorzy', Roles.getUsersInRole('admin').count()],
                        ['Pacjenci', Roles.getUsersInRole('patient').count()],
                        ['Lekarze', Roles.getUsersInRole('doctor').count()],
                    ]
                }],
                credits:{
                    enabled:false
                }
            });

            //pobranie danych do wizyt
            var wszystkie = [];
            var odrzucone = [];
            var categories = [];
            data = moment().add(-6,'days').hour(00).minutes(00).seconds(00);

            for(i=0;i<7;i++){
                var itemWszystkie = Wizyty.find({start:{$gte:moment(data).format(),$lt:moment(data).add(1,'days').format()}}).count();
                wszystkie.push(itemWszystkie);

                var itemOdrzucone = Wizyty.find({start:{$gte:moment(data).format(),$lt:moment(data).add(1,'days').format()},isAccepted:false,isAvailable:false}).count();
                odrzucone.push(itemOdrzucone);

                var dzien = moment(data).days();
                categories.push(nazwaDnia(dzien));
                var data = moment(data).add(1,'days');
            }

            $('#wizyty').highcharts({
                chart: {
                    type: 'area'
                },
                title: {
                    text: 'Wizyty'
                },
                subtitle: {
                    text: 'ostatni tydzień'
                },
                xAxis: {
                    categories: categories
                },
                yAxis: {
                    title: {
                        text: 'Ilość'
                    }
                },
                tooltip: {
                    pointFormat: '{series.name} wizyty <b>{point.y:,.0f}</b>'
                },
                plotOptions: {
                    area: {
                        marker: {
                            enabled: false,
                            symbol: 'circle',
                            radius: 2,
                            states: {
                                hover: {
                                    enabled: true
                                }
                            }
                        }
                    }
                },
                series: [{
                    name: 'wszystkie',
                    data: wszystkie
                },
                {
                    name: 'odrzucone',
                    data: odrzucone
                }],
                credits:{
                    enabled:false
                }
            });
        });
    });
};

nazwaDnia = function(item) {
    switch (item){
        case 0:
            return 'Niedziela';
            break;
        case 1:
            return 'Poniedziałek';
            break;
        case 2:
            return 'Wtorek';
            break;
        case 3:
            return 'Środa';
            break;
        case 4:
            return 'Czwartek';
            break;
        case 5:
            return 'Piątek';
            break;
        case 6:
            return 'Sobota';
            break;
    }
}