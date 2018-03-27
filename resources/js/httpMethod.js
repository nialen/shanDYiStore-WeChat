'use strict';
angular
	.module('httpMethod', ['httpServer'])
	.constant('httpConfig', {
		siteUrl: 'http://192.168.74.17:9082/point-manager-web' //积分管理
	})
	.factory('httpMethod', [
		'httpConfig',
		'httpServer',
		function(httpConfig, httpServer) {
			var httpMethod = {};
			//新增工作汇报
			httpMethod.insertWorkReport = function(params) {
				return httpServer(
					httpConfig.siteUrl + '/workReportService/insertWorkReport',
					params,
					'POST'
				);
			};
			//人员搜索
			httpMethod.queryLinkPeopleByStaffName = function(params) {
				return httpServer(
					httpConfig.siteUrl + '/workReportService/queryLinkPeopleByStaffName',
					params,
					'POST'
				);
			};
			//添加新人员保存
			httpMethod.insertWorkReportLinkPeople = function(params) {
				return httpServer(
					httpConfig.siteUrl + '/workReportQueryService/insertWorkReportLinkPeople',
					params,
					'POST'
				);
			};
			//工作汇报列表查看页面（周报）、（月报）
			httpMethod.queryWorkReportList = function(params) {
				return httpServer(
					httpConfig.siteUrl + '/workReportQueryService/queryWorkReportList',
					params,
					'POST'
				);
			};
			//工作汇报删除
			httpMethod.deleteWorkRepor = function(params) {
				return httpServer(
					httpConfig.siteUrl + '/workReportQueryService/deleteWorkRepor',
					params,
					'POST'
				);
			};
			//按人查询工作汇报
			httpMethod.queryWorkReportListByStaffName = function(params) {
				return httpServer(
					httpConfig.siteUrl + '/workReportQueryService/queryWorkReportListByStaffName',
					params,
					'POST'
				);
			};
			//工作汇报详情页面
			httpMethod.workReporDetail = function(params) {
				return httpServer(
					httpConfig.siteUrl + '/workReportQueryService/workReporDetail',
					params,
					'POST'
				);
			};
			return httpMethod;
		}
	]);
