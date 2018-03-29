define(['angular', 'jquery', 'lodash', 'mock', 'select', 'swiper', 'iscroll', 'datepicker', 'httpMethod'], function(angular, $, _, Mock) {
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

						//根据展示的数据显示已选择的对象
						var	receiveManFor = _.cloneDeep(_this.receiveMan);
						_.map(receiveManFor, function(item){
							_.map(_this.manList, function(val){
								if(val.receiveStaffId === item.receiveStaffId){
									val.isChecked = true;
								}
							})
						})
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
				var	checkedOffersListFor = _.cloneDeep(_this.checkedOffersList);
				_this.receiveMan = checkedOffersListFor;
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
		.controller('workReportWeekCtrl', ['$scope', '$rootScope', '$timeout', 'httpMethod', '$log', 'ReceiveMethod', '$http', function($scope, $rootScope, $timeout, httpMethod, $log, ReceiveMethod, $http){
			$scope.reader = new FileReader();   //创建一个FileReader接口
		    $scope.form = {     //用于绑定提交内容，图片或其他数据
		        image:{},
		    };
		    $scope.thumb = [];      //用于存放图片的base64
		    $scope.files = []; 
		    $scope.img_upload = function(files) {       //单次提交图片的函数
		    	$scope.files.push(files[0].name);
		        $scope.guid = (new Date()).valueOf();   //通过时间戳创建一个随机数，作为键名使用
		        $scope.reader.readAsDataURL(files[0]);  //FileReader的方法，把图片转成base64
		        $scope.reader.onload = function(ev) {
		            $scope.$apply(function(){
		            	var img = {
		            		imgSrc : ev.target.result,  //接收base64
		            	}
		                $scope.thumb.push(img);
		            });
		        };
	        
		        var data = new FormData();      //以下为像后台提交图片数据
		        data.append('image', files[0]);
		        data.append('guid',$scope.guid);
		        $http({
		            method: 'post',
		            url: 'http://192.168.74.17:9082/point-manager-web/workReportQueryService/uploadImg',
		            data:data,
		            headers: {'Content-Type': undefined},
		            transformRequest: angular.identity
		        }).success(function(data) {
		            if (data.result_code == 'SUCCESS') {
		                $scope.form.image[data.guid] = data.result_value;
		                $scope.thumb[data.guid].status = 'SUCCESS';
		                console.log($scope.form)
		            }
		            if(data.result_code == 'FAIL'){
		                console.log(data)
		            }
		        })
	    	};

		    $scope.img_del = function(key) {    //删除，删除的时候thumb和form里面的图片数据都要删除，避免提交不必要的
		        var guidArr = [];
		        for(var p in $scope.thumb){
		            guidArr.push(p);
		        }
		       	$scope.files.splice(key, 1);
		       	$scope.thumb.splice(key, 1);
		        delete $scope.form.image[guidArr[key]];
		    };

		    $scope.myInterval = 5000;
			$scope.noWrapSlides = false;
			$scope.active = 0;
			var slides = $scope.slides = [];
			var currIndex = 0;


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
	        $scope.weekPopData.receiveMan = [{
	        	'receiveName': '张三', 
			    'receiveCode': '111', 
			    'receiveStaffId': '111', 
			    'receiveMail': '1234@qq.com', 
			    'receiveNum': '1399999999'
	        }];	       			
	        //弹窗显示
	        $scope.weekPopData.showing = false;
	        $scope.addReceiveMan = function(){
	        	$scope.weekPopData.showing = true;
	        	$scope.weekPopData.queryStaffMan();
	        	//设置展示的在列表中被选中
	        	var receiveManFor = _.cloneDeep($scope.weekPopData.receiveMan);
	        	$scope.weekPopData.checkedOffersList = receiveManFor;
	        }
	        $scope.popClose = function(){
	        	$scope.weekPopData.showing = false;
	        }

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
		.directive('swipers',swipers);
        swipers.$inject = ['$timeout'];
        function swipers($timeout) {
            return {
                restrict: "EA",
                scope: {
                    data:"="
                },
                template: '<div class="swiper-container silder">'+
                                '<ul class="swiper-wrapper">'+
                                '<li class="swiper-slide" ng-repeat="item in data">'+
                                '<img ng-src="{{item.imgSrc}}" alt="" />'+
                                '</li>'+
                                '</ul>'+
                                '<div class="swiper-pagination"></div>'+
                                '</div>',
                link: function(scope, element, attrs) {
                          $timeout(function(){
                                 var swiper = new Swiper('.swiper-container', {   //轮播图绑定样式名
                                 		direction: 'vertical',
                                      	pagination: {
									  		el: '.swiper-pagination',
									  	},     
                                      	paginationClickable: true,                                                     	
                                });  
                         },100); 
                }
            };
        }
		// .directive('weekpicSlide', function($rootScope){
		// 	return {
		// 		restrict: 'EA',
		// 		link: function(scope, el, attrs){
		// 			var ulEle = angular.element(el.children()[0]).find('ul')[0];
		// 			$rootScope.$watch('thumb', function(newValue){

		// 				if(newValue.length){
		// 					var len = newValue.length;
		//                     for(var i=0;i<len;i++){
		//                         angular.element(ulEle).append('<li><img _src="'+ newValue[i].imgSrc +'" src=""/></li>');
		//                     };
	 //                    	TouchSlide({ 
		// 						slideCell: "#focus",
		// 						titCell:".hd ul", //开启自动分页 autoPage:true ，此时设置 titCell 为导航元素包裹层
		// 						mainCell:".bd ul", 
		// 						effect:"left", 
		// 						autoPlay:false,//自动播放
		// 						autoPage:true, //自动分页
		// 						switchLoad:"_src" //切换加载，真实图片路径为"_src" 
		// 					});
		// 				}
		// 			}, true)		
		// 		}
		// 	}
		// })
		// .directive('monthpicSlide', function($rootScope){
		// 	return {
		// 		restrict: 'EA',
		// 		link: function(scope, el, attrs){
		// 			var ulEle = angular.element(el.children()[0]).find('ul')[0];
		// 			$scope.$watch('thumb', function(newValue){
		// 				if(newValue){
		// 					var len = newValue.length;
		//                     for(var i=0;i<len;i++){
		//                         angular.element(ulEle).append('<li><img _src="'+ newValue[i] +'" src=""/></li>');
		//                     };
	 //                    	TouchSlide({ 
		// 						slideCell: "#focus",
		// 						titCell:".hd ul", //开启自动分页 autoPage:true ，此时设置 titCell 为导航元素包裹层
		// 						mainCell:".bd ul", 
		// 						effect:"left", 
		// 						autoPlay:false,//自动播放
		// 						autoPage:true, //自动分页
		// 						switchLoad:"_src" //切换加载，真实图片路径为"_src" 
		// 					});
		// 				}
		// 			})		
		// 		}
		// 	}
		// })
});