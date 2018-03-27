define(['angular', 'jquery', 'lodash', 'mock', 'select', 'iscroll', 'datepicker', 'ngFileUploadShim', 'ngFileUpload', 'touchSlide', 'httpMethod', 'angular-animate'], function(angular, $, _, Mock) {
	angular
		.module('workReportModule', ['ui.select', 'httpMethod'])
		.factory('ReceiveMethod', ['$filter', 'httpMethod', function($filter, httpMethod){
	        var ReceiveMethod = function() {
	            this.receive = 1;
	            this.checkedOffersList = [];
	            this.receiveMan = [];
	            this.manList = [];
	            this.manListFor = [];
	            this.showing = true;
	            this.newManList = [{
					'receiveName': '', 
					'receiveMail': '', 
				    'receiveNum': ''
				}];
	        };
	        //人员搜索
	        ReceiveMethod.prototype.queryStaffMan =  function(param){
	        	var _this = this;
	            httpMethod.queryLinkPeopleByStaffName(param).then(function(rsp) {
					if (rsp.success) {
						_this.manList = rsp.data;
						_this.manListFor = _this.manList;
					}
				},function() {
					$log.log('调用接口失败.');
				});
	        };
	        
	        //添加人员模式切换
	        ReceiveMethod.prototype.changReceive = function(index){
	            var _this = this;
	            _this.receive = index;
	        	_this.checkedOffersList = [];
	        };
	        //选择人员添加
			ReceiveMethod.prototype.check = function(val, chk){
	            var _this = this;
	            var valueOfIndex = '';
				_this.checkedOffersList.length && _.forEach(_this.checkedOffersList, function(item, index){
					if (item.receiveStaffId === val.receiveStaffId) {
						valueOfIndex = index;
					}
				}); 
				chk ? valueOfIndex === '' && _this.checkedOffersList.push(val) : _this.checkedOffersList.splice(valueOfIndex, 1);
	        };
			//确认添加
			ReceiveMethod.prototype.addCheckedReceive = function(){
				var _this = this;
	            _.forEach(_this.checkedOffersList, function(item){
	            	
					_this.receiveMan.push(item);
				}); 
				_this.showing = false;
	        };
			//再加一行
			ReceiveMethod.prototype.addAnother = function(){
				var _this = this;
	            _this.newManList.push({
					'receiveName': '', 
					'receiveMail': '', 
				    'receiveNum': ''
				})
	        };
			//添加新人员保存
			ReceiveMethod.prototype.addNewReceive = function(){
				var _this = this;
	            
				httpMethod.insertWorkReportLinkPeople(_this.newManList).then(function(rsp) {
					if (rsp.success) {
						_this.receiveManList = rsp.data;
						_.forEach(_this.receiveManList, function(item){
							_this.receiveMan.push(item);
						}); 
						_this.showing = false;
					}
				},function() {
					$log.log('调用接口失败.');
				});				
	        };
	        return ReceiveMethod;
	    }])
		.controller('workReportCtrl', ['$scope', '$rootScope', '$timeout', 'httpMethod', '$log', function($scope, $rootScope, $timeout, httpMethod, $log){
			$scope.flag = 1;
			$scope.changeReport = function(index){
				$scope.flag = index;
			}
		}])
		.controller('workReportWeekCtrl', ['$scope', '$rootScope', '$timeout', 'httpMethod', '$log', 'ReceiveMethod', function($scope, $rootScope, $timeout, httpMethod, $log, ReceiveMethod){
			$scope.beginDt = ''; //开始时间
        	$scope.endDt = ''; //结束时间
        	$('#startDt1').date({}, function(datestr) {
	            $scope.beginDt = datestr;
	            $scope.$apply();
	        });
	        $('#endDt1').date({}, function(datestr) {
	            $scope.endDt = datestr;
	            $scope.$apply();
        	});

	        $scope.weekPopData = new ReceiveMethod();
	        //弹窗显示
	        $scope.weekPopData.showing = false;
	        $scope.addReceiveMan = function(){
	        	$scope.weekPopData.showing = true;
	        }
	        $scope.popClose = function(){
	        	$scope.weekPopData.showing = false;
	        }
	       
	        $scope.weekPopData.queryStaffMan();

	        //模糊查询
	        $scope.$watch('staffName', function(newValue){
	        	if(newValue){
	        		$scope.weekPopData.manListFor = [];
	        		_.forEach($scope.weekPopData.manList, function(item){
		        		var reg = new RegExp(newValue);
						if (item.receiveName.match(reg)){
							$scope.weekPopData.manListFor.push(item);
						}
					}); 
	        	}else{
	        		$scope.weekPopData.manListFor = $scope.weekPopData.manList;
	        	}
	        })

	        //图片预览
	        $scope.view = false;
	        $scope.viewImg = function(){
	        	$scope.view = true;
	        }
	        $scope.viewClose = function(){
	        	$scope.view = false;
	        }
	        $scope.weekfiles = [];
	        $scope.uploadFiles = function(file, errFiles) {
		        $scope.f = file;
		        $scope.errFile = errFiles && errFiles[0];
		        if (file) {
		            file.upload = Upload.upload({
		                url: 'http://192.168.74.17:9082/point-manager-web/workReportQueryService/uploadImg',
		                data: {file: file}
		            });
			      	file.upload.then(function (response) {
		                $timeout(function () {
		                    file.result = response.data;
		                });
		            }, function (response) {
		                if (response.status > 0)
		                    $scope.errorMsg = response.status + ': ' + response.data;
		            }, function (evt) {
		                file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
		            });
				    $scope.weekfiles.push(file.result);
		        }  
		    } 
	        //周报提交
	        $scope.reportWeekSubmit = function(){
	        	var param = {
	        		'createStaff': '', 
		    		'beginDt': $scope.startDt, 
		    		'endDt': $scope.endDt, 
		    		'completeContent': $scope.completeContent,
		    		'reportType': 0,//0：周报，1：月报
				    'needComplete': $scope.needComplete,
				    'needHelp': $scope.needHelp, 
				    'fileInfo': $scope.weekfiles, 
				    'sendMethod': $scope.sendMethod,
				    'sendPeople': $scope.receiveMan
	        	}
	        	httpMethod.insertWorkReport(param).then(function(rsp) {
					if (rsp.success) {
						// 提交之后的操作
					}
				},function() {
					$log.log('调用接口失败.');
				});
	        }      
		}])
		.controller('workReportMonthCtrl', ['$scope', '$rootScope', '$timeout', 'httpMethod', '$log', 'ReceiveMethod', function($scope, $rootScope, $timeout, httpMethod, $log, ReceiveMethod){
	        $scope.monthPopData = new ReceiveMethod();
	        //弹窗显示
	        $scope.monthPopData.showing = false;
	        $scope.addReceiveMan = function(){
	        	$scope.monthPopData.showing = true;
	        }
	        $scope.popClose = function(){
	        	$scope.monthPopData.showing = false;
	        }
	        $scope.monthPopData.queryStaffMan();
	        //模糊查询
	        $scope.$watch('staffName', function(newValue){
	        	if(newValue){
	        		$scope.monthPopData.manListFor = [];
	        		_.forEach($scope.monthPopData.manList, function(item){
		        		var reg = new RegExp(newValue);
						if (item.receiveName.match(reg)){
							$scope.monthPopData.manListFor.push(item);
						}
					}); 
	        	}else{
	        		$scope.monthPopData.manListFor = $scope.monthPopData.manList;
	        	}
	        })

	        //图片预览
	        $scope.view = false;
	        $scope.viewImg = function(){
	        	$scope.view = true;
	        }
	        $scope.viewClose = function(){
	        	$scope.view = false;
	        }
	       
	        //月报提交
	        $scope.reportMonthSubmit = function(){
	        	var param = {
	        		'createStaff': '', 
		    		'beginDt': $scope.startDt, 
		    		'endDt': $scope.endDt, 
		    		'completeContent': $scope.completeContent,
		    		'reportType': 0,//0：周报，1：月报
				    'needComplete': $scope.needComplete,
				    'needHelp': $scope.needHelp, 
				    'fileInfo': $scope.files, 
				    'sendMethod': $scope.sendMethod,
				    'sendPeople': $scope.receiveMan
	        	}
	        	httpMethod.insertWorkReport(param).then(function(rsp) {
					if (rsp.success) {
						// 提交之后的操作
					}
				},function() {
					$log.log('调用接口失败.');
				});
	        }
	        //月报提交
		}])		
		.directive('weekpicSlide', function($rootScope){
			return {
				restrict: 'EA',
				link: function(scope, el, attrs){
					var ulEle = angular.element(el.children()[0]).find('ul')[0];
					$rootScope.$watch('weekfiles', function(newValue){
						if(newValue){
							var len = newValue.length;
		                    for(var i=0;i<len;i++){
		                        angular.element(ulEle).append('<li><img _src="'+ newValue[i] +'" src=""/></li>');
		                    };
	                    	TouchSlide({ 
								slideCell: "#focus",
								titCell:".hd ul", //开启自动分页 autoPage:true ，此时设置 titCell 为导航元素包裹层
								mainCell:".bd ul", 
								effect:"left", 
								autoPlay:false,//自动播放
								autoPage:true, //自动分页
								switchLoad:"_src" //切换加载，真实图片路径为"_src" 
							});
						}
					})		
				}
			}
		})
		.directive('monthpicSlide', function($rootScope){
			return {
				restrict: 'EA',
				link: function(scope, el, attrs){
					var ulEle = angular.element(el.children()[0]).find('ul')[0];
					$rootScope.$watch('monthfiles', function(newValue){
						if(newValue){
							var len = newValue.length;
		                    for(var i=0;i<len;i++){
		                        angular.element(ulEle).append('<li><img _src="'+ newValue[i] +'" src=""/></li>');
		                    };
	                    	TouchSlide({ 
								slideCell: "#focus",
								titCell:".hd ul", //开启自动分页 autoPage:true ，此时设置 titCell 为导航元素包裹层
								mainCell:".bd ul", 
								effect:"left", 
								autoPlay:false,//自动播放
								autoPage:true, //自动分页
								switchLoad:"_src" //切换加载，真实图片路径为"_src" 
							});
						}
					})		
				}
			}
		})
});