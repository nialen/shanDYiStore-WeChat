define(['angular', 'jquery', 'lodash', 'mock', 'select', 'httpMethod', 'angular-animate'], function(angular, $, _, Mock) {
	angular
		.module('workReportQueryModule', ['ui.select', 'httpMethod'])
		.controller('workReportQueryCtrl', ['$scope', function($scope){
			$scope.flag = 1;
			$scope.changeReport = function(index){
				$scope.flag = index;
			}
		}])



});