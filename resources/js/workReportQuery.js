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

                //创建现在的时间  
                var data=new Date();  
                //获取年  
                var year=data.getFullYear();  
                //获取月  
                var mon =data.getMonth()+1;  
                var arry=new Array();  
                // for(var i=0;i<5;i++){  
                    mon=mon-6;  
                    if(mon<=0){  
                        year=year-1;  
                        mon=mon+12;  
                    }  
                    if(mon<10){  
                        mon="0"+mon;  
                    }  
                    arry=year+"/"+mon;  
                // }        
                
                var param = {
                    'workReportCycle': '1',
                    'staffName': arg,
				    'commonRegionId': '',
				    'beginDt': $filter("date")(arry, "yyyy-MM"),
				    'endDt': $filter("date")(data, "yyyy-MM")
                }
                httpMethod.queryWorkReportList(param).then(function(rsp) {
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
                //创建现在的时间  
                var data=new Date();  
                //获取年  
                var year=data.getFullYear();  
                //获取月  
                var mon =data.getMonth()+1;  
                var arry=new Array();  
                mon=mon-6;  
                if(mon<=0){  
                    year=year-1;  
                    mon=mon+12;  
                }  
                if(mon<10){  
                    mon="0"+mon;  
                }  
                arry=year+"/"+mon;  
                var param = {
                    'workReportCycle': '2',
                    'staffName': arg,
				    'commonRegionId': '',
				    'beginDt': $filter("date")(arry, "yyyy-MM"),
                    'endDt': $filter("date")(data, "yyyy-MM")
                }
                httpMethod.queryWorkReportList(param).then(function(rsp) {
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