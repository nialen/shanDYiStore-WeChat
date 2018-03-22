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
			//渠道查询接口
			httpMethod.qryChannel = function(params) {
				return httpServer(
					httpConfig.siteUrl + '/point/common/qryChannel',
					params,
					'POST'
				);
			};
			//渠道选择接口
			httpMethod.selectChannel = function(params) {
				return httpServer(
					httpConfig.siteUrl + '/point/common/selectChannel',
					params,
					'POST'
				);
			};
			//地区查询接口
			httpMethod.qryArea = function(params) {
				return httpServer(
					httpConfig.siteUrl + '/point/common/qryArea',
					params,
					'POST'
				);
			};
			//地区选择接口
			httpMethod.selectArea = function(params) {
				return httpServer(
					httpConfig.siteUrl + '/point/common/selectArea',
					params,
					'POST'
				);
			};
			//客户信息查询
			httpMethod.qryCustInfo = function(params) {
				return httpServer(
					httpConfig.siteUrl + '/point/crmIntf/qryCustInfo',
					params,
					'POST'
				);
			};
			//客户可用积分查询
			httpMethod.queryCustAvailablePoint = function(params) {
				return httpServer(
					httpConfig.siteUrl +
						'/point/exchange/queryCustAvailablePoint',
					params,
					'POST'
				);
			};
			//礼品类型查询
			httpMethod.qryExchObjType = function(params) {
				return httpServer(
					httpConfig.siteUrl + '/point/exchange/qryExchObjType',
					params,
					'POST'
				);
			};
			//积分兑换
			httpMethod.exchangePoint = function(params) {
				return httpServer(
					httpConfig.siteUrl + '/point/exchange/exchangePoint',
					params,
					'POST'
				);
			};
			//账户信息查询接口
			httpMethod.qryPointAcct = function(params) {
				return httpServer(
					httpConfig.siteUrl + '/point/query/qryPointAcct',
					params,
					'POST'
				);
			};
			//积分冻结解冻账户信息查询接口
			httpMethod.qryPointAcctForFreeze = function(params) {
				return httpServer(
					httpConfig.siteUrl + '/point/query/qryPointAcctForFreeze',
					params,
					'POST'
				);
			};
			//支付积分帐户查询
			httpMethod.qryPayPointAcct = function(params) {
				return httpServer(
					httpConfig.siteUrl + '/point/query/qryPayPointAcct',
					params,
					'POST'
				);
			};
			//积分账本信息查询
			httpMethod.qryPointBalance = function(params) {
				return httpServer(
					httpConfig.siteUrl + '/point/query/qryPointBalance',
					params,
					'POST'
				);
			};
			//创建积分账本
			httpMethod.createPointBala = function(params) {
				return httpServer(
					httpConfig.siteUrl + '/point/createPointBala',
					params,
					'POST'
				);
			};
			//积分调整
			httpMethod.pointAdjust = function(params) {
				return httpServer(
					httpConfig.siteUrl + '/point/adjust/pointAdjust',
					params,
					'POST'
				);
			};
			//积分归集
			httpMethod.pointMerge = function(params) {
				return httpServer(
					httpConfig.siteUrl + '/point/pointMerge',
					params,
					'POST'
				);
			};
			//归集记录查询
			httpMethod.qryMergeInfo = function(params) {
				return httpServer(
					httpConfig.siteUrl + '/point/qryMergeInfo',
					params,
					'POST'
				);
			};
			//取消归集
			httpMethod.cancelPointMerge = function(params) {
				return httpServer(
					httpConfig.siteUrl + '/point/cancelPointMerge',
					params,
					'POST'
				);
			};
			//各渠道年度兑换查询
			httpMethod.pointExchangeReport = function(params) {
				return httpServer(
					httpConfig.siteUrl + '/point/pointExchangeReport',
					params,
					'POST'
				);
			};
			//账户异常变动信息查询
			httpMethod.qryAcctAbnormalChange = function(params) {
				return httpServer(
					httpConfig.siteUrl + '/point/qryAcctAbnormalChange',
					params,
					'POST'
				);
			};
			//账户异常情况详情查询
			httpMethod.qryAcctAbnormalChangeDetail = function(params) {
				return httpServer(
					httpConfig.siteUrl + '/point/qryAcctAbnormalChangeDetail',
					params,
					'POST'
				);
			};
			//超额积分兑换详情查询
			httpMethod.qryExcessPointExchRec = function(params) {
				return httpServer(
					httpConfig.siteUrl + '/point/qryExcessPointExchRec',
					params,
					'POST'
				);
			};
			//兑换记录详情查询
			httpMethod.qryPointExchangeDetail = function(params) {
				return httpServer(
					httpConfig.siteUrl +
						'/point/exchange/qryPointExchangeDetail',
					params,
					'POST'
				);
			};
			//超次积分兑换详情查询
			httpMethod.qryOverTimePointExchRec = function(params) {
				return httpServer(
					httpConfig.siteUrl + '/point/qryOverTimePointExchRec',
					params,
					'POST'
				);
			};
			//积分账本明细查询
			httpMethod.qryPointAcctBalaChng = function(params) {
				return httpServer(
					httpConfig.siteUrl + '/point/query/qryPointAcctBalaChng',
					params,
					'POST'
				);
			};
			//积分变动历史查询
			httpMethod.qryPayPointAcctChngHis = function(params) {
				return httpServer(
					httpConfig.siteUrl + '/point/qryPayPointAcctChngHis',
					params,
					'POST'
				);
			};
			//积分变动明细查询
			httpMethod.qryPointAcctChng = function(params) {
				return httpServer(
					httpConfig.siteUrl + '/point/query/qryPointAcctChng',
					params,
					'POST'
				);
			};
			//积分清零
			httpMethod.qryClearedRecord = function(params) {
				return httpServer(
					httpConfig.siteUrl + '/point/qryClearedRecord',
					params,
					'POST'
				);
			};
			//对账结果查询
			httpMethod.PointCheckBill = function(params) {
				return httpServer(
					httpConfig.siteUrl + '/point/PointCheckBill',
					params,
					'POST'
				);
			};
			//客户信息查询接口
			httpMethod.qryAbnormalCustInfo = function(params) {
				return httpServer(
					httpConfig.siteUrl + '/point/qryAbnormalCustInfo',
					params,
					'POST'
				);
			};
			//多次签到记录查询
			httpMethod.qryOverTimeSignInfo = function(params) {
				return httpServer(
					httpConfig.siteUrl + '/point/qryOverTimeSignInfo',
					params,
					'POST'
				);
			};
			//账户变动异常记录查询
			httpMethod.qryAbnormalAcctChangeList = function(params) {
				return httpServer(
					httpConfig.siteUrl + '/point/qryAbnormalAcctChangeList',
					params,
					'POST'
				);
			};
			//积分运营分析查询
			httpMethod.pointReport = function(params) {
				return httpServer(
					httpConfig.siteUrl + '/point/pointReport',
					params,
					'POST'
				);
			};
			//积分冻结/解冻接口
			httpMethod.pointFreezeOrThaw = function(params) {
				return httpServer(
					httpConfig.siteUrl + '/point/freeze/pointFreezeOrThaw',
					params,
					'POST'
				);
			};
			//外部系统对接口访问详情查询接口
			httpMethod.qrySerMonitDetail = function(params) {
				return httpServer(
					httpConfig.siteUrl + '/point/qrySerMonitDetail',
					params,
					'POST'
				);
			};
			//每小时访问量查询接口
			httpMethod.qrySerEveryHourVisitNum = function(params) {
				return httpServer(
					httpConfig.siteUrl + '/point/qrySerEveryHourVisitNum',
					params,
					'POST'
				);
			};
			//服务接口监控查询
			httpMethod.qrySerMonitInfo = function(params) {
				return httpServer(
					httpConfig.siteUrl + '/point/qrySerMonitInfo',
					params,
					'POST'
				);
			};
			//服务接口监控详情查询
			httpMethod.qrySerMonitRecord = function(params) {
				return httpServer(
					httpConfig.siteUrl + '/point/qrySerMonitRecord',
					params,
					'POST'
				);
			};
			//异常信息详情查询
			httpMethod.qrySerAbNormalDetail = function(params) {
				return httpServer(
					httpConfig.siteUrl + '/point/qrySerAbNormalDetail',
					params,
					'POST'
				);
			};
			//积分账户异常监控配置
			httpMethod.qryAcctMonConfig = function(params) {
				return httpServer(
					httpConfig.siteUrl + '/point/qryAcctMonConfig',
					params,
					'POST'
				);
			};
			//积分账户异常监控更改
			httpMethod.updAcctMonConfig = function(params) {
				return httpServer(
					httpConfig.siteUrl + '/point/updAcctMonConfig',
					params,
					'POST'
				);
			};
			//更新账户异常监控状态
			httpMethod.updAcctMonConfigStaus = function(params) {
				return httpServer(
					httpConfig.siteUrl + '/point/updAcctMonConfigStaus',
					params,
					'POST'
				);
			};
			//监控接口服务配置列表查询
			httpMethod.qrySerMonConfig = function(params) {
				return httpServer(
					httpConfig.siteUrl + '/point/qrySerMonConfig',
					params,
					'POST'
				);
			};
			//新增监控接口服务配置
			httpMethod.insertSerMonConfig = function(params) {
				return httpServer(
					httpConfig.siteUrl + '/point/insertSerMonConfig',
					params,
					'POST'
				);
			};
			//更新监控接口服务配置
			httpMethod.updSerMonConfig = function(params) {
				return httpServer(
					httpConfig.siteUrl + '/point/updSerMonConfig',
					params,
					'POST'
				);
			};
			//更新监控接口服务配置状态
			httpMethod.updSerMonConfigStaus = function(params) {
				return httpServer(
					httpConfig.siteUrl + '/point/updSerMonConfigStaus',
					params,
					'POST'
				);
			};
			//历史积分变动查询
			httpMethod.qryPointAcctChngHis = function(params) {
				return httpServer(
					httpConfig.siteUrl + '/point/query/qryPointAcctChngHis',
					params,
					'POST'
				);
			};
			//兑换记录详情查询
			httpMethod.qryPointExchangeDetailHis = function(params) {
				return httpServer(
					httpConfig.siteUrl +
						'/point/exchange/qryPointExchangeDetailHis',
					params,
					'POST'
				);
			};
			//积分审计查询
			httpMethod.qryAudit = function(params) {
				return httpServer(
					httpConfig.siteUrl + '/point/exchange/qryAudit',
					params,
					'POST'
				);
			};
			//审计提交
			httpMethod.submitAudit = function(params) {
				return httpServer(
					httpConfig.siteUrl + '/point/exchange/submitAudit',
					params,
					'POST'
				);
			};
			//查看兑换审计详情
			httpMethod.qryAuditDetail = function(params) {
				return httpServer(
					httpConfig.siteUrl + '/point/exchange/qryAuditDetail',
					params,
					'POST'
				);
			};
			//查询积分礼品
			httpMethod.qryGift = function(params) {
				return httpServer(
					httpConfig.siteUrl + '/point/exchange/qryGift',
					params,
					'POST'
				);
			};
			//新增积分礼品接口
			httpMethod.addGift = function(params) {
				return httpServer(
					httpConfig.siteUrl + '/point/exchange/addGift',
					params,
					'POST'
				);
			};
			//修改积分礼品接口
			httpMethod.modifyGift = function(params) {
				return httpServer(
					httpConfig.siteUrl + '/point/exchange/modifyGift',
					params,
					'POST'
				);
			};
			//上下架礼品接口
			httpMethod.upDownGift = function(params) {
				return httpServer(
					httpConfig.siteUrl + '/point/exchange/upDownGift',
					params,
					'POST'
				);
			};
			//查询审批事件下拉框列表接口
			httpMethod.qryApproveEvent = function(params) {
				return httpServer(
					httpConfig.siteUrl + '/point/approveConfig/qryApproveEvent',
					params,
					'POST'
				);
			};
			//查询审批流程列表接口
			httpMethod.qryApproveFlow = function(params) {
				return httpServer(
					httpConfig.siteUrl + '/point/config/qryApproveFlow',
					params,
					'POST'
				);
			};
			//删除审批流程接口
			httpMethod.delApproveFlow = function(params) {
				return httpServer(
					httpConfig.siteUrl + '/point/approveConfig/delApproveFlow',
					params,
					'POST'
				);
			};
			//新增审批流程接口
			httpMethod.addApproveFlow = function(params) {
				return httpServer(
					httpConfig.siteUrl + '/point/config/addApproveFlow',
					params,
					'POST'
				);
			};
			//修改审批流程接口
			httpMethod.updateApproveFlow = function(params) {
				return httpServer(
					httpConfig.siteUrl + '/point/config/updateApproveFlow',
					params,
					'POST'
				);
			};
			//积分调整审批查询
			httpMethod.queryPointAdjustApprForStaff = function(params) {
				return httpServer(
					httpConfig.siteUrl +
						'/point/adjust/queryPointAdjustApprForStaff',
					params,
					'POST'
				);
			};
			//积分调整审批接口
			httpMethod.pointAdjustApprove = function(params) {
				return httpServer(
					httpConfig.siteUrl + '/point/adjust/pointAdjustApprove',
					params,
					'POST'
				);
			};
			//新增流程节点接口
			httpMethod.addApproveNode = function(params) {
				return httpServer(
					httpConfig.siteUrl + '/point/config/addApproveNode',
					params,
					'POST'
				);
			};
			//修改流程节点接口
			httpMethod.updateApproveNode = function(params) {
				return httpServer(
					httpConfig.siteUrl + '/point/config/updateApproveNode',
					params,
					'POST'
				);
			};
			//删除流程节点接口
			httpMethod.delApproveNode = function(params) {
				return httpServer(
					httpConfig.siteUrl + '/point/config/delApproveNode',
					params,
					'POST'
				);
			};
			//查询操作员审批流程列表接口
			httpMethod.qryOperateFlow = function(params) {
				return httpServer(
					httpConfig.siteUrl + '/point/cofig/qryOperateFlow',
					params,
					'POST'
				);
			};
			//查询审批事件对应流程下拉列表
			httpMethod.qryOperateFlow4Selcet = function(params) {
				return httpServer(
					httpConfig.siteUrl + '/point/config/qryOperateFlow4Selcet',
					params,
					'POST'
				);
			};
			//新增操作员审批流程接口
			httpMethod.addOperateFlow = function(params) {
				return httpServer(
					httpConfig.siteUrl + '/point/config/addOperateFlow',
					params,
					'POST'
				);
			};
			//删除操作员审批流程接口
			httpMethod.delOperateFlow = function(params) {
				return httpServer(
					httpConfig.siteUrl + '/point/config/delOperateFlow',
					params,
					'POST'
				);
			};
			//积分对账结果列表查询
			httpMethod.qryCheckResult = function(params) {
				return httpServer(
					httpConfig.siteUrl + '/point/check/qryCheckResult',
					params,
					'POST'
				);
			};
			//重新生成对账文件
			httpMethod.regenerateCheckFile = function(params) {
				return httpServer(
					httpConfig.siteUrl + '/point/check/regenerateCheckFile',
					params,
					'POST'
				);
			};
			//积分计算ODS数据检查结果查询接口
			httpMethod.queryPointCalcOdsCheck = function(params) {
				return httpServer(
					httpConfig.siteUrl + '/point/calc/queryPointCalcOdsCheck',
					params,
					'POST'
				);
			};
			//积分计算作业页面状态查询接口
			httpMethod.queryPointCalcPage = function(params) {
				return httpServer(
					httpConfig.siteUrl + '/point/calc/queryPointCalcPage',
					params,
					'POST'
				);
			};
			//积分计算作业开始接口
			httpMethod.pointCalcRun = function(params) {
				return httpServer(
					httpConfig.siteUrl + '/point/calc/pointCalcRun',
					params,
					'POST'
				);
			};
			//积分计算作业步骤查询接口
			httpMethod.queryPointCalcStep = function(params) {
				return httpServer(
					httpConfig.siteUrl + '/point/calc/queryPointCalcStep',
					params,
					'POST'
				);
			};
			//积分计算ODS数据检查作业确认接口
			httpMethod.pointCalcOdsCheck = function(params) {
				return httpServer(
					httpConfig.siteUrl + '/point/calc/pointCalcOdsCheck',
					params,
					'POST'
				);
			};
			//积分计算报表查询接口
			httpMethod.queryPointCalcReport = function(params) {
				return httpServer(
					httpConfig.siteUrl + '/point/calc/queryPointCalcReport',
					params,
					'POST'
				);
			};
			//积分计算作业下一步接口
			httpMethod.pointCalcStepNextRun = function(params) {
				return httpServer(
					httpConfig.siteUrl + '/point/calc/pointCalcStepNextRun',
					params,
					'POST'
				);
			};
			//积分调整审批流程查询接口
			httpMethod.queryPointAdjustWorkflow = function(params) {
				return httpServer(
					httpConfig.siteUrl +
						'/point/adjust/queryPointAdjustWorkflow',
					params,
					'POST'
				);
			};
			//积分调整审批记录查询接口
			httpMethod.queryPointAdjustAppr = function(params) {
				return httpServer(
					httpConfig.siteUrl + '/point/adjust/queryPointAdjustAppr',
					params,
					'POST'
				);
			};
			//积分调整撤销接口
			httpMethod.pointAdjustAbort = function(params) {
				return httpServer(
					httpConfig.siteUrl + '/point/adjust/pointAdjustAbort',
					params,
					'POST'
				);
			};
			//归集客户信息查询
			httpMethod.qryCustInfo4Merge = function(params) {
				return httpServer(
					httpConfig.siteUrl + '/point/qryCustInfo4Merge',
					params,
					'POST'
				);
			};
			//积分到期清零作业页面状态查询
			httpMethod.queryClearStepInfo = function(params) {
				return httpServer(
					httpConfig.siteUrl + '/point/clear/queryClearStepInfo',
					params,
					'POST'
				);
			};
			//积分计算作业开始接口
			httpMethod.pointYearClearRun = function(params) {
				return httpServer(
					httpConfig.siteUrl + '/point/clear/pointYearClearRun',
					params,
					'GET'
				);
			};
			//积分到期清零作业步骤查询接口
			httpMethod.queryClearSubStepInfo = function(params) {
				return httpServer(
					httpConfig.siteUrl + '/point/clear/queryClearSubStepInfo',
					params,
					'GET'
				);
			};
			//积分到期清零作业下一步接口
			httpMethod.starNextSubStep = function(params) {
				return httpServer(
					httpConfig.siteUrl + '/point/clear/starNextSubStep',
					params,
					'POST'
				);
			};
			//清零记录查询接口
			httpMethod.qryPointClearRecord = function(params) {
				return httpServer(
					httpConfig.siteUrl + '/point/clear/qryPointClearRecord',
					params,
					'GET'
				);
			};
			//积分到期清零作业报表查询接口
			httpMethod.queryPointYearClearReport = function(params) {
				return httpServer(
					httpConfig.siteUrl +
						'/point/clear/queryPointYearClearReport',
					params,
					'GET'
				);
			};
			//查询业务类型下拉框列表接口
			httpMethod.qryPointBusiType = function(params) {
				return httpServer(
					httpConfig.siteUrl + '/point/config/qryPointBusiType',
					params,
					'POST'
				);
			};
			//修改默认流程接口
			httpMethod.setApproveFlowDefault = function(params) {
				return httpServer(
					httpConfig.siteUrl + '/point/config/setApproveFlowDefault',
					params,
					'POST'
				);
			};
			//启用/停用审批流程接口
			httpMethod.updateApproveFlowStatus = function(params) {
				return httpServer(
					httpConfig.siteUrl +
						'/point/config/updateApproveFlowStatus',
					params,
					'POST'
				);
			};
			//积分监管阀值配置查询接口
			httpMethod.queryPointSuperviceConfig = function(params) {
				return httpServer(
					httpConfig.siteUrl +
						'/point/config/queryPointSuperviceConfig',
					params,
					'POST'
				);
			};
			//积分监管阀值配置设置接口
			httpMethod.setPointSuperviceConfig = function(params) {
				return httpServer(
					httpConfig.siteUrl +
						'/point/config/setPointSuperviceConfig',
					params,
					'POST'
				);
			};
			//会员查询
			httpMethod.qryStarMember = function(params) {
				return httpServer(
					httpConfig.siteUrl + '/star/memberInfo/qryStarMember',
					params,
					'POST'
				);
			};
			//会员成长值记录
			httpMethod.qryStarGrowValue = function(params) {
				return httpServer(
					httpConfig.siteUrl + '/star/memberInfo/qryStarGrowValue',
					params,
					'POST'
				);
			};
			//政企客户星级会员成长值记录
			httpMethod.qryStarGrowValue4ZQAdjust = function(params) {
				return httpServer(
					httpConfig.siteUrl +
						'/star/memberInfo/qryStarGrowValue4ZQAdjust',
					params,
					'POST'
				);
			};
			//普通客户星级会员成长值记录
			httpMethod.qryStarGrowValue4Adjust = function(params) {
				return httpServer(
					httpConfig.siteUrl +
						'/star/memberInfo/qryStarGrowValue4Adjust',
					params,
					'POST'
				);
			};
			//会员变更记录
			httpMethod.qryStarChngInfo = function(params) {
				return httpServer(
					httpConfig.siteUrl + '/star/memberInfo/qryStarChngInfo',
					params,
					'POST'
				);
			};
			//会员拥有的权益
			httpMethod.qryStarRights = function(params) {
				return httpServer(
					httpConfig.siteUrl + '/star/rights/qryStarRights',
					params,
					'POST'
				);
			};
			//会员权益信息详细
			httpMethod.qryStarRightsDetail = function(params) {
				return httpServer(
					httpConfig.siteUrl + '/star/rights/qryStarRightsDetail',
					params,
					'POST'
				);
			};
			//会员权益剩余次数
			httpMethod.qryRightsUsedRemain = function(params) {
				return httpServer(
					httpConfig.siteUrl + '/star/rights/qryRightsUsedRemain',
					params,
					'POST'
				);
			};
			//会员行权记录详情
			httpMethod.qryRightsDetail = function(params) {
				return httpServer(
					httpConfig.siteUrl + '/star/rights/qryRightsDetail',
					params,
					'POST'
				);
			};
			//会员评定过程记录
			httpMethod.qryScoreByODS = function(params) {
				return httpServer(
					httpConfig.siteUrl + '/star/memberInfo/qryScoreByODS',
					params,
					'POST'
				);
			};
			//星级评级作业页面状态查询接口
			httpMethod.queryStarCalcStep = function(params) {
				return httpServer(
					httpConfig.siteUrl + '/star/calc/queryStarCalcStep',
					params,
					'GET'
				);
			};
			//星级评级作业开始接口
			httpMethod.starCalcRun = function(params) {
				return httpServer(
					httpConfig.siteUrl + '/star/calc/starCalcRun',
					params,
					'POST'
				);
			};
			//星级评级作业步骤查询接口
			httpMethod.queryStarCalcSubStep = function(params) {
				return httpServer(
					httpConfig.siteUrl + '/star/calc/queryStarCalcSubStep',
					params,
					'POST'
				);
			};
			//积分计算成长值数据检查作业确认接口
			httpMethod.starCalcOdsCheck = function(params) {
				return httpServer(
					httpConfig.siteUrl + '/star/calc/starCalcOdsCheck',
					params,
					'GET'
				);
			};
			//星级评级作业下一步接口
			httpMethod.starCalcStepNextRun = function(params) {
				return httpServer(
					httpConfig.siteUrl + '/star/calc/starCalcStepNextRun',
					params,
					'POST'
				);
			};
			//星级评级报表查询接口
			httpMethod.queryStarCalcReport = function(params) {
				return httpServer(
					httpConfig.siteUrl + '/star/calc/queryStarCalcReport',
					params,
					'GET'
				);
			};
			//查询会计报表情况
			httpMethod.qryAccountingStatementsAnalysis = function(params) {
				return httpServer(
					httpConfig.siteUrl +
						'/point/report/qryAccountingStatementsAnalysis',
					params,
					'POST'
				);
			};
			//积分计算作业步骤查询接口
			httpMethod.queryPointCalcSubStep = function(params) {
				return httpServer(
					httpConfig.siteUrl + '/point/calc/queryPointCalcSubStep',
					params,
					'POST'
				);
			};
			//短信模板查询接口
			httpMethod.qryMsgTemp = function(params) {
				return httpServer(
					httpConfig.siteUrl + '/point/baseConfig/qryMsgTemp',
					params,
					'GET'
				);
			};
			//短信模板保存接口
			httpMethod.saveMsgTemp = function(params) {
				return httpServer(
					httpConfig.siteUrl + '/point/baseConfig/saveMsgTemp',
					params,
					'POST'
				);
			};
			//使用人申请审批流程查询
			httpMethod.qryUserApproInfo = function(params) {
				return httpServer(
					httpConfig.siteUrl + '/star/userApplay/qryUserApproInfo',
					params,
					'POST'
				);
			};
			//使用人信息查询接口
			httpMethod.qryUserInfo = function(params) {
				return httpServer(
					httpConfig.siteUrl + '/star/userApplay/qryUserInfo',
					params,
					'POST'
				);
			};
			//使用人申请提交接口
			httpMethod.userApplaySubmit = function(params) {
				return httpServer(
					httpConfig.siteUrl + '/star/userApplay/userApplaySubmit',
					params,
					'POST'
				);
			};
			//使用人申请记录查询接口
			httpMethod.qryApplyRec4Approve = function(params) {
				return httpServer(
					httpConfig.siteUrl + '/star/userApplay/qryApplyRec4Approve',
					params,
					'POST'
				);
			};
			//使用人申请审批提交接口
			httpMethod.approveSubmit = function(params) {
				return httpServer(
					httpConfig.siteUrl + '/star/userApplay/approveSubmit',
					params,
					'POST'
				);
			};
			//使用人申请记录查询接口
			httpMethod.qryApplyRec = function(params) {
				return httpServer(
					httpConfig.siteUrl + '/star/userApplay/qryApplyRec',
					params,
					'POST'
				);
			};
			//政企客户星级会员查询接口
			httpMethod.qryStarMember4ZQAdjust = function(params) {
				return httpServer(
					httpConfig.siteUrl +
						'/star/memberInfo/qryStarMember4ZQAdjust',
					params,
					'POST'
				);
			};
			//普通客户星级会员查询接口
			httpMethod.qryStarMember4Adjust = function(params) {
				return httpServer(
					httpConfig.siteUrl +
						'/star/memberInfo/qryStarMember4Adjust',
					params,
					'POST'
				);
			};
			//查询创建记录接口
			httpMethod.qryCreateAcctRecord = function(params) {
				return httpServer(
					httpConfig.siteUrl + '/point/adjust/qryCreateAcctRecord',
					params,
					'POST'
				);
			};
			//创建积分账本接口
			httpMethod.createPointAcct = function(params) {
				return httpServer(
					httpConfig.siteUrl + '/point/adjust/createPointAcct',
					params,
					'POST'
				);
			};
			//调整普通星级会员等级接口
			httpMethod.adjustStarLevel = function(params) {
				return httpServer(
					httpConfig.siteUrl + '/star/adjust/adjustStarLevel',
					params,
					'POST'
				);
			};
			//调整政企星级会员等级接口
			httpMethod.adjustStarLevel4ZQ = function(params) {
				return httpServer(
					httpConfig.siteUrl + '/star/adjust/adjustStarLevel4ZQ',
					params,
					'POST'
				);
			};
			//审批列表查询接口
			httpMethod.qryAdjustApprList = function(params) {
				return httpServer(
					httpConfig.siteUrl + '/star/adjust/qryAdjustApprList',
					params,
					'POST'
				);
			};
			//申请列表查询接口
			httpMethod.qryAdjustApplyList = function(params) {
				return httpServer(
					httpConfig.siteUrl + '/star/adjust/qryAdjustApplyList',
					params,
					'POST'
				);
			};
			//审批详情列表查询接口(调整记录审批页面)
			httpMethod.qryApprDetailList = function(params) {
				return httpServer(
					httpConfig.siteUrl + '/star/adjust/qryApprDetailList',
					params,
					'POST'
				);
			};
			//审批详情列表查询接口(调整记录查询页面)
			httpMethod.qryAdjustApprDetail = function(params) {
				return httpServer(
					httpConfig.siteUrl + '/star/adjust/qryAdjustApprDetail',
					params,
					'POST'
				);
			};
			//星级会员调整审批接口
			httpMethod.memberAdjustApproval = function(params) {
				return httpServer(
					httpConfig.siteUrl + '/star/adjust/memberAdjustApproval',
					params,
					'POST'
				);
			};
			//客户短信提醒设置查询接口
			httpMethod.qryMsgCustConfig = function(params) {
				return httpServer(
					httpConfig.siteUrl + '/point/baseConfig/qryMsgCustConfig',
					params,
					'GET'
				);
			};
			//客户短信提醒设置修改接口
			httpMethod.saveMsgCustConfig = function(params) {
				return httpServer(
					httpConfig.siteUrl + '/point/baseConfig/saveMsgCustConfig',
					params,
					'POST'
				);
			};
			//政企客户审批流程查询接口
			httpMethod.qryAdjustApprFlow4ZQ = function(params) {
				return httpServer(
					httpConfig.siteUrl + '/star/adjust/qryAdjustApprFlow4ZQ',
					params,
					'POST'
				);
			};
			//普通客户审批流程查询接口
			httpMethod.qryAdjustApprFlow = function(params) {
				return httpServer(
					httpConfig.siteUrl + '/star/adjust/qryAdjustApprFlow',
					params,
					'POST'
				);
			};
			return httpMethod;
		}
	]);
