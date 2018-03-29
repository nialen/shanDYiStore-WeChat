define(['angular', 'jquery', 'lodash', 'mock', 'httpMethod', 'ngStorage', 'angular-animate'], function(angular, $, _, Mock) {
	angular
		.module('workReportWeekDetailModule', ['httpMethod', 'ngStorage'])
		.controller('workReportMonthDetailCtrl', ['$scope', '$localStorage', 'httpMethod', '$log', function($scope, $localStorage, httpMethod, $log){
			function GetQueryString(name) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
                var r = window.location.search.substr(1).match(reg);
                if (r != null) return unescape(r[2]);
                return null;
            };
            $scope.reportId = $localStorage[GetQueryString('reportId')] ? JSON.parse($localStorage[GetQueryString('reportId')]) : null;

            var param = {
                'reportId': $scope.reportId
            }
            httpMethod.workReportDetail(param).then(function(rsp) {
                if (rsp.success) {
                    $scope.workReportList = rsp.data;
                }
            },function() {
                $log.log('调用接口失败.');
            });
		}])
});