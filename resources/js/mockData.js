(function(root, factory) {
	'use strict';
	if (typeof define === 'function' && define.amd) {
		define(['mock'], factory);
	} else if (typeof exports === 'object') {
		factory(require('mock'));
		module.exports = 'mockData';
	} else {
		//Browser globals (root is window), we don't register it.
		factory(root.Mock);
	}
})(this, function(Mock) {
	//人员搜索
	Mock.mock(new RegExp('/workReportService/queryLinkPeopleByStaffName'), {
		rsphead: 's',
		success: 'true', //是否成功true/失败false
		code: null,
		msg: null, //失败信息
		error: null,
		'data': [{
			'receiveName': '张三', 
		    'receiveCode': '111', 
		    'receiveStaffId': '111', 
		    'receiveMail': '1234@qq.com', 
		    'receiveNum': '1399999999'
		},{
			'receiveName': '李四', 
		    'receiveCode': '222', 
		    'receiveStaffId': '222', 
		    'receiveMail': '1359@qq.com', 
		    'receiveNum': '1399999999'
		},{
			'receiveName': '张飞', 
		    'receiveCode': '333', 
		    'receiveStaffId': '333', 
		    'receiveMail': '1360@qq.com', 
		    'receiveNum': '1399999999'
		},{
			'receiveName': '李白', 
		    'receiveCode': '444', 
		    'receiveStaffId': '444', 
		    'receiveMail': '1360@qq.com', 
		    'receiveNum': '1399999999'
		}]
	});

	//添加新人员保存
	Mock.mock(new RegExp('/workReportQueryService/insertWorkReportLinkPeople'), {
		rsphead: 's',
		success: 'true', //是否成功true/失败false
		code: null,
		msg: null, //失败信息
		error: null,
		'data|5': [{
			'receiveName': '@cname', 
		    'receiveCode': '@id', 
		    'receiveStaffId': '@id', 
		    'receiveMail': '@email', 
		    'receiveNum|1-100': 100
		}]
	});

	//图片上传
	Mock.mock(new RegExp('/workReportQueryService/uploadImg'), {
		rsphead: 's',
		success: 'true', //是否成功true/失败false
		code: null,
		msg: null, //失败信息
		error: null,
		data: {
			'name': '@cword(4)', 
		    'url': '@url'
		}
	});

	// 工作汇报列表查看页面（周报）、（月报）
	Mock.mock(new RegExp('/workReportQueryService/queryWorkReportList'), {
		rsphead: 's',
		success: 'true', //是否成功true/失败false
		code: null,
		msg: null, //失败信息
		error: null,
		data: {
			'total': 100, 
			'rows|5': [{
			    'createStaff': '@cname', 
			    'beginDt': '@date', 
			    'endDt': '@date', 
			    'createDt': '@date',
			    'completeContent': '@cword(10)',
			    'reportId': '@id'
			}]
		}
	});

});
