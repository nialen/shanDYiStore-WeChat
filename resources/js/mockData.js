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

    //版本说明列表查询客户端
    Mock.mock(new RegExp('\/channel-mobile-web/versionService/versionQueryListByClient'), {
        'rsphead': 's',
        'success': 'true', //是否成功true/失败false
        'code': null,
        'msg': null, //失败信息
        'error': null,
        'data': {
            'total': 100,
            'rows|12': [{
                'versionId': '@id',
                'versionTitle': '@cword(5)',
                'versionDate': '@date',
                'versionNum|1-5': 1,
                'versionSys|+1': [1, 2],
                'versionTerminal|+1': [1, 2, 3],
                'versionContent': '@cword(20)'
            }]
        }
    });
    //版本说明详情查询客户端
    Mock.mock(new RegExp('\/channel-mobile-web/versionService/versionQueryClientById'), {
        'rsphead': 's',
        'success': 'true', //是否成功true/失败false
        'code': null,
        'msg': null, //失败信息
        'error': null,
        'data': {
            'versionId': '@id',
            'versionTitle': '@cword(5)',
            'versionDate': '@date',
            'versionNum|1-5': 5,
            'versionSys|+1': [1, 2],
            'versionTerminal|+1': [1, 2, 3],
            'versionContent': '@cword(100)',
            'picInfo|3': [{
                'fileId': '@id',
                'objCd': '@id',
                'objId': '@id',
                'fileType|+1': [1, 2],//picInfo照片信息固定传1,fileInfo附件信息固定传2
                'fileDir':'../../resources/images',
                'fileName|+1':['img1.jpg', 'img2.jpg', 'img3.jpg'],
                'fileUuid': '',//文件UUID
                'filePostfix': ''//文件后缀
            }]
        }
    });

    //客户列表查询
    Mock.mock(new RegExp('\/channel-mobile-web/myCustomerService/queryMyCustListByClient'), {
        'rsphead': 's',
        'success': 'true', //是否成功true/失败false
        'code': null,
        'msg': null, //失败信息
        'error': null,
        'data': {
            'total': 100,
            'rows|12': [{
                'custId': '@id',
				'custName': '@cname',
                'custPhone': '13378828222',
				'custStatus|+1': [1000, 1001, 1002, 1100],
				'bossName': '@cname',
				'bossPhone': '13378828222',
				'terminalPersonName': '@cname',
				'terminalPersonPhone': '13378828999',
				'custLevel|+1': [1000, 1100, 1200, 1300],
				'custAddr': '@cword(8)',
				'custChannelNum': '',
				'tygGoodsByDay|1-10': 5,//天翼购提货量，当日
				'tygGoodsByWeek|1-50': 20,//天翼购提货量，当周
				'tygGoodsByMonth|1-100': 30,//天翼购提货量，当月
				'pointByDay|1-10': 5,//提货积分，当日
				'pointByWeek|1-50': 20,//提货积分，当周
				'pointByMonth|1-100': 30,//提货积分，当月
			}]
        }
    });

    //客户详情
    Mock.mock(new RegExp('\/channel-mobile-web/myCustomerService/custDetail'), {
        'rsphead': 's',
        'success': 'true', //是否成功true/失败false
        'code': null,
        'msg': null, //失败信息
        'error': null,
        'data': {
                'custId': '@id',
                'custName': '@cname',
                'custStatus|+1':  [1000, 1001, 1002, 1100],//渠道状态：1000有效,1001主动暂停,1002异常暂停,1100失效
                'bossName': '@cname',
                'bossPhone': '13378828222',
                'terminalPersonName': '@cname',
                'terminalPersonPhone': '18978828999',
                'custLevel|+1': [1000, 1100, 1200, 1300],//1000集团级,1100省级,1200本地网级,1300本地网以下级
                'custAddr': '@cword(8)',
                'custChannelNum|1-10': 10,
                'tygGoodsByDay|1-10': 5,//天翼购提货量，当日
                'tygGoodsByWeek|1-50': 20,//天翼购提货量，当周
                'tygGoodsByMonth|1-100': 30,//天翼购提货量，当月
                'pointByDay|1-10': 5,//提货积分，当日
                'pointByWeek|1-50': 20,//提货积分，当周
                'pointByMonth|1-100': 30,//提货积分，当月
        }
    });

    //关联渠道列表
    Mock.mock(new RegExp('\/channel-mobile-web/myCustomerService/quertChannelListByCustId'), {
        'rsphead': 's',
        'success': 'true', //是否成功true/失败false
        'code': null,
        'msg': null, //失败信息
        'error': null,
        'data': {
            'total': 100,
            'rows|12': [{
                'channelId': '@id',
				'channelName': '@cword(5)',
				'channelAddr': '@cword(5)',
				'channelStatus|+1': [1000, 1001, 1002, 1100]//渠道状态：1000有效,1001主动暂停,1002异常暂停,1100失效
			}]
        }
    });

    //通讯录
    Mock.mock(new RegExp('\/channel-mobile-web/phoneService/phoneList'), {
        'rsphead': 's',
        'success': 'true', //是否成功true/失败false
        'code': null,
        'msg': null, //失败信息
        'error': null,
        'data': {
            'total': 100,
            'rows|12': [{
                'staffId': '@id',
				'staffName': '@cname',
				'staffPhone': '13382928321',
				'staffRole': '@cword(5)'
            }]
        }
    });

    //员工签到日历查询接口
    Mock.mock(new RegExp('\/channel-manager-web/newSignService/queryStaffSignMonth'), {
        'rsphead': 's',
        'success': 'true', //是否成功true/失败false
        'code': null,
        'msg': null, //失败信息
        'error': null,
        'signArray': [{
            'signDate': ['2018-12-01'],
            'signType|1': [1, 2, 3, 4, 5]
        },{
            'signDate': ['2018-12-02'],
            'signType|1': [1, 2, 3, 4, 5]
        }]
    });
    //员工请假接口
    Mock.mock(new RegExp('\/channel-manager-web/newSignService/staffAskForLeave'), {
        'rsphead': 's',
        'success': 'true', //是否成功true/失败false
        'code': null,
        "message":  "请假信息提交成功，正在审批中！"
    });
    //员工查询请假状态接口
    Mock.mock(new RegExp('\/channel-manager-web/newSignService/queryStaffVacationApproval'), {
        'rsphead': 's',
        'success': 'true', //是否成功true/失败false
        'code': null,
        'msg': null, //失败信息
        'error': null,
        "vacationList ":[{
            "vacationId":"@id",//请假编号
            "vacationType":"",//请假类型
            "staffId": "@id",
            "insertDate": "@date",//记录生成时间
            "beginDate": "@date",
            "endDate": "@date",
            "vacationReason":"@cword(3,6)",
            "vacationUrl": "",
            "duration": "", //请假时长
            "approvalStaffId":"@id",
            "approvalState|1": [1, 2, 3],//1、待审批 2、同意 3、驳回
            "approvalRemark":"@cword(3,6)",
            "approvalDate":"@date" 
        }]           
    });
    //员工补卡接口
    Mock.mock(new RegExp('\/channel-manager-web/newSignService/patchStaffSign'), {
        'rsphead': 's',
        'success': 'true', //是否成功true/失败false
        'code': null,
        "message":  "打卡成功"
    });
});
