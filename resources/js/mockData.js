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
		'data|5': [{
			'receiveName': '@cname', 
		    'receiveCode': '@id', 
		    'receiveStaffId': '@id', 
		    'receiveMail': '@email', 
		    'receiveNum|1-100': 100
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
});
