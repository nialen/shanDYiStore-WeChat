define(['angular', 'jquery', 'lodash', 'mock', 'httpMethod', 'ngStorage', 'angular-animate', 'ng-infinite-scroll'], function(angular, $, _, Mock) {
	angular
		.module('workReportQueryModule', ['httpMethod', 'ngStorage', 'infinite-scroll'])
		.factory('Reddit', ['httpMethod', '$filter', '$log', function(httpMethod, $filter, $log) {
            var Reddit = function() {
                this.weekItems = [];
                this.weekBusy = false;
                this.weekPage = 1;
                this.monthItems = [];
                this.monthBusy = false;
                this.monthPage = 1;
            };
            Reddit.prototype.weekNextPage = function(arg) {
                var _this = this;
                if (_this.weekBusy) return;
                _this.weekBusy = true;

                var param = {
                    'workReportCycle': '1',
                    'staffName': arg,
				    'commonRegionId': '',
				    'beginDt': '',
				    'endDt': ''
                }
                httpMethod.queryWorkReportList(param).then(function(rsp) {
                    var items = rsp.data.rows;
                    // _.map(items, function(it) {
                    //     var datetime = $filter("date")(it.answerDate, "yyyy-MM-dd HH:mm:ss")
                    //     it.reckontime = TimeReckon(it.answerDate);
                    //     _this.weekItems.push(it);
                    // })
                    _this.weekItems = rsp.data.rows;
                    _this.weekBusy = false;
                    _this.weekPage += 1;
                }, function() {
                    $log.log('调用接口失败.');
                });
            };
            Reddit.prototype.monthNextPage = function(arg) {
                var _this = this;
                if (_this.monthBusy) return;
                _this.monthBusy = true;

                var param = {
                    'workReportCycle': '2',
                    'staffName': arg,
				    'commonRegionId': '',
				    'beginDt': '',
				    'endDt': ''
                }
                httpMethod.queryWorkReportList(param).then(function(rsp) {
                    var items = rsp.data.rows;
                    // _.map(items, function(it) {
                    //     var datetime = $filter("date")(it.answerDate, "yyyy-MM-dd HH:mm:ss")
                    //     it.reckontime = TimeReckon(it.answerDate);
                    //     _this.items.push(it);
                    // })
                    _this.monthItems = rsp.data.rows;
                    _this.monthBusy = false;
                    _this.monthPage += 1;
                }, function() {
                    $log.log('调用接口失败.');
                });
            };
            return Reddit;
        }])
		.controller('workReportQueryCtrl', ['$scope', '$localStorage', 'Reddit', function($scope, $localStorage, Reddit){
			$scope.flag = 1;
			$scope.changeReport = function(index){
				$scope.flag = index;
			}
			$scope.reddit = new Reddit();
			
			$scope.$watch('weekName', function(newValue){
				if(newValue){
	        		$scope.reddit.weekNextPage(newValue);
	        	}
			})
			$scope.$watch('monthName', function(newValue){
				if(newValue){
	        		$scope.reddit.monthNextPage(newValue);
	        	}
			})
			$scope.delWorkReportWeek = function(item){
				var param = {
					'workReportId': item.reportId
				}
				httpMethod.queryWorkReportList(param).then(function(rsp) {
                    if(rsp.success){
                    	$scope.reddit.weekNextPage();
                    }
                }, function() {
                    $log.log('调用接口失败.');
                });
			}
			$scope.delWorkReportMonth = function(item){
				var param = {
					'workReportId': item.reportId
				}
				httpMethod.queryWorkReportList(param).then(function(rsp) {
                    if(rsp.success){
                    	$scope.reddit.monthNextPage();
                    }
                }, function() {
                    $log.log('调用接口失败.');
                });
			}
			//查看更多
			$scope.checkMoreWeek = function(item){
				$localStorage[item.reportId] = JSON.stringify(item);
				window.open('./workReportWeekDetail.html', '_self');
			}
			//查看更多
			$scope.checkMoreMonth = function(item){
				$localStorage[item.reportId] = JSON.stringify(item);
				window.open('./workReportMonthDetail.html');
			}
		}])
});