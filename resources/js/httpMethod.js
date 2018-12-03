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
			httpMethod.workReportDetail = function(params) {
				return httpServer(
					httpConfig.siteUrl + '/workReportQueryService/workReportDetail',
					params,
					'POST'
				);
			};
            //版本说明列表查询客户端
            httpMethod.versionQueryListByClient = function(params) {
                return httpServer(httpConfig.siteUrl + '/channel-mobile-web/versionService/versionQueryListByClient', params, 'POST');
            };
            //版本说明详情查询客户端
            httpMethod.versionQueryClientById = function(params) {
                return httpServer(httpConfig.siteUrl + '/channel-mobile-web/versionService/versionQueryClientById', params, 'POST');
            };

            //我的客户部分
            //客户列表查询接口
            httpMethod.queryMyCustListByClient = function(params) {
                return httpServer(httpConfig.siteUrl + '/channel-mobile-web/myCustomerService/queryMyCustListByClient', params, 'POST');
            };
            //客户详情接口
            httpMethod.custDetail = function(params) {
                return httpServer(httpConfig.siteUrl + '/channel-mobile-web/myCustomerService/custDetail', params, 'POST');
            };
            //关联渠道列表接口
            httpMethod.quertChannelListByCustId = function(params) {
                return httpServer(httpConfig.siteUrl + '/channel-mobile-web/myCustomerService/quertChannelListByCustId', params, 'POST');
            };
            //通讯录接口
            httpMethod.phoneList = function(params) {
                return httpServer(httpConfig.siteUrl + '/channel-mobile-web/phoneService/phoneList', params, 'POST');
			};
			//员工签到日历查询接口
			httpMethod.queryStaffSignMonth = function(params) {
                return httpServer(httpConfig.siteUrl + '/channel-manager-web/newSignService/queryStaffSignMonth', params, 'POST');
			};
			//员工请假接口
			httpMethod.staffAskForLeave = function(params) {
                return httpServer(httpConfig.siteUrl + '/channel-manager-web/newSignService/staffAskForLeave', params, 'POST');
			};
			//员工查询请假状态接口
			httpMethod.queryStaffVacationApproval = function(params) {
                return httpServer(httpConfig.siteUrl + '/channel-manager-web/newSignService/queryStaffVacationApproval', params, 'POST');
			};
			//员工补卡接口
			httpMethod.patchStaffSign = function(params) {
                return httpServer(httpConfig.siteUrl + '/channel-manager-web/newSignService/patchStaffSign', params, 'POST');
			};
			return httpMethod;
		}
	]);
