angular.module('goplay.controllers')
    .controller('ProfileCtrl', function($log, $scope, $stateParams, dataFactory, $state) {
        $scope.selectedUserId = null;
        $scope.profile = null;
        $scope.feeds = [];
        $scope.stepChartConfig = {
            options: {
                chart: {
                    type: 'column'
                },
                tooltip: {
                    style: {
                        padding: 10,
                        fontWeight: 'bold'
                    }
                }
            },
            series: [],
            title: {
                text: 'Fitness Stats'
            },
            subtitle: {
                text: 'Source: Live from Google Fit API'
            },
            xAxis: {
                type: 'datetime'
            },
            // yAxis: [{
            //     title: ''
            // }],
            size: {
                // width: 400,
                height: 300
            }
        }

        $scope.goBack = function() {
            $state.go('play.discover.people');
        }
        $scope.gotoAd = function(link) {
            if (link) {
                window.open(link, '_system');
            }
        }

        $scope.$on('$ionicView.enter', function() {
            console.log($stateParams);
            $scope.selectedUserId = $stateParams.userId;
            $scope.profile = dataFactory.getPerson($scope.selectedUserId);
            dataFactory.getStepCharts().then(function(response) {
                $log.log(response);

                var crap = response.data.data;

                var seriesData = {};
                seriesData.name = 'steps';
                // seriesData.yAxis = 1;
                // seriesData.type = 'column';
                var dataArray = [];
                for (var i = 0; i < crap.length; i++) {
                    var itemDate = moment(crap[i]['date']).toObject();
                    dataArray.push([
                        Date.UTC(itemDate.years, itemDate.months, itemDate.date),
                        crap[i]['steps']
                    ]);
                }
                seriesData.data = dataArray;
                $scope.stepChartConfig.series = [seriesData]

            }, function(err) {
                $log.error(err);
            })
            dataFactory.getUserFeeds($scope.selectedUserId).then(function(response) {
                $scope.feeds = response.data.data;
            }, function(error) {
                $log.error(error);
            });

        });
    });
