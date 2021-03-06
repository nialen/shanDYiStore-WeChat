define(['angular', 'jquery', 'lodash', 'mock', 'select', 'swiper', 'ajaxfileupload', 'iscroll', 'datepicker', 'httpMethod', 'ng-infinite-scroll'], function (angular, $, _, Mock) {
    angular
        .module('workReportModule', ['ui.select', 'httpMethod', 'infinite-scroll'])
        .factory('ReceiveMethod', ['$filter', 'httpMethod', '$log', function ($filter, httpMethod, $log) {
            var ReceiveMethod = function () {
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
                this.busy = false;
                this.page = 1;
                this.bottom = false;
            };
            //人员搜索
            ReceiveMethod.prototype.queryStaffMan = function (param) {
                var _this = this,
                    params = {
                        'staffName': param,
                        'curPage': _this.page
                    };

                if (_this.busy) {
                    return;
                }//判断当前数据是否请求完成
                _this.busy = true;
                httpMethod.queryLinkPeopleByStaffName(params).then(function (rsp) {
                    if (rsp.success) {
                        if (rsp.data.length > 0) {
                            var items = rsp.data;
                            items.forEach(function (item) {
                                _this.manList.push(item);
                            });
                            _this.busy = false;
                            _this.bottom = false;
                            _this.page += 1;
                            if (_this.page > rsp.data.total) {
                                _this.busy = true;
                                _this.bottom = true;
                            }
                        } else {
                            _this.busy = true;
                            _this.bottom = true;
                        }

                        //根据展示的数据显示已选择的对象
                        var receiveManFor = _.cloneDeep(_this.receiveMan);
                        _.map(receiveManFor, function (item) {
                            _.map(_this.manList, function (val) {
                                if (val.receiveStaffId === item.receiveStaffId) {
                                    val.isChecked = true;
                                }
                            })
                        })

                        $log.log('调用接口成功.');
                    } else {
                        _this.busy = true;
                    }
                }, function () {
                    $log.log('调用接口失败.');
                });

            };

            //添加人员模式切换
            ReceiveMethod.prototype.changReceive = function (index) {
                var _this = this;
                _this.receive = index;
            };
            //选择人员添加
            ReceiveMethod.prototype.check = function (val, chk) {
                var _this = this;
                var valueOfIndex = '';
                _this.checkedOffersList.length && _.forEach(_this.checkedOffersList, function (item, index) {
                    if (item.receiveStaffId === val.receiveStaffId) {
                        valueOfIndex = index;
                    }
                });
                chk ? valueOfIndex === '' && _this.checkedOffersList.push(val) : _this.checkedOffersList.splice(valueOfIndex, 1);
            };
            //确认添加
            ReceiveMethod.prototype.addCheckedReceive = function () {
                var _this = this;
                var checkedOffersListFor = _.cloneDeep(_this.checkedOffersList);
                _this.receiveMan = checkedOffersListFor;
                _this.showing = false;
            };
            //再加一行
            ReceiveMethod.prototype.addAnother = function () {
                var _this = this;
                _this.newManList.push({
                    'receiveName': '',
                    'receiveMail': '',
                    'receiveNum': ''
                })
            };
            //添加新人员保存
            ReceiveMethod.prototype.addNewReceive = function () {
                var _this = this;
                httpMethod.insertWorkReportLinkPeople(_this.newManList).then(function (rsp) {
                    if (rsp.success) {
                        _this.receiveManList = rsp.data;
                        _.forEach(_this.receiveManList, function (item) {
                            _this.receiveMan.push(item);
                        });
                        ReceiveMethod.prototype.queryStaffMan();
                        _this.showing = false;
                    }
                }, function () {
                    $log.log('调用接口失败.');
                });
            };
            return ReceiveMethod;
        }])
        .controller('workReportCtrl', ['$scope', '$rootScope', '$timeout', 'httpMethod', '$log', function ($scope, $rootScope, $timeout, httpMethod, $log) {
            $scope.flag = 1;
            $scope.changeReport = function (index) {
                $scope.flag = index;
            }
        }])
        .controller('workReportWeekCtrl', ['$scope', '$rootScope', '$timeout', 'httpMethod', '$log', 'ReceiveMethod', '$http', function ($scope, $rootScope, $timeout, httpMethod, $log, ReceiveMethod, $http) {
            $scope.weekReportForm = {};
            $scope.reader = new FileReader();   //创建一个FileReader接口
            $rootScope.weekthumb = [];      //用于存放图片的base64
            $scope.files = [];
            $scope.img_upload = function (files) {       //单次提交图片的函数
                // $scope.imgFlag = true;
                $scope.files.push(files[0]);
                $scope.reader.readAsDataURL(files[0]);  //FileReader的方法，把图片转成base64
                $scope.reader.onload = function (ev) {
                    $scope.$apply(function () {
                        var img = {
                            imgSrc: ev.target.result,  //接收base64
                        }
                        $rootScope.weekthumb.push(img);
                    });
                };

                var data = new FormData();      //以下为像后台提交图片数据 通过FormData将文件转成二进制数据
                data.append('image', files[0]);

                // 新增 20180403 15:24
                // $.ajax({
                //     url: 'URL',
                //     type: 'POST',
                //     data: data,
                //     processData: false, //用来回避jquery对formdata的默认序列化，XMLHttpRequest会对其进行正确处理
                //     contentType: false, //设为false才会获得正确的conten-Type
                //     xhr: function () { //用以显示上传进度
                //         var xhr = $.ajaxSettings.xhr();
                //         if (xhr.upload) {
                //             xhr.upload.addEventListener('progress', function (event) {
                //                 var percent = Math.floor(event.loaded / event.total * 100);
                //                 document.querySelector("#progress span").style.width = percent + "%";
                //             }, false);
                //         }
                //         return xhr
                //     },
                //     success: function (data) {
                //         $scope.imgFlag = false;
                //     }
                // })
                $scope.ajaxFileUpload(files);
            };

            $scope.ajaxFileUpload = function(obj) {
                $.ajaxFileUpload({
                    fileElementId: obj.id,
                    // url: 'URL', //用于文件上传的服务器端请求地址
                    secureuri: false, //一般设置为false
                    fileElementId: 'file', //文件上传空间的id属性  <input type="file" id="file" name="file" />
                    dataType: 'json', //返回值类型 一般设置为json
                    success: function (data, status) {  //服务器成功响应处理函数
                        $scope.imgFlag = false;
                    }, error: function (data, status, e) {//服务器响应失败处理函数
                        alert(e);
                    }
                });
                return false;
            };

            $scope.img_del = function (key) {    //删除，删除的时候thumb和form里面的图片数据都要删除，避免提交不必要的
                $scope.files.splice(key, 1);
                $rootScope.weekthumb.splice(key, 1);
            };

            $scope.beginDt = ''; //开始时间
            $scope.endDt = ''; //结束时间
            $('#startDt1').date({}, function (datestr) {
                $scope.beginDt = datestr;
                $scope.$apply();
            });
            $('#endDt1').date({}, function (datestr) {
                $scope.endDt = datestr;
                $scope.$apply();
            });
            $scope.weekPopData = new ReceiveMethod();
            $scope.weekPopData.busy = true;
            //弹窗显示
            $scope.weekPopData.showing = false;
            $scope.addReceiveMan = function () {
                $scope.weekPopData.busy = false;
                $scope.weekPopData.showing = true;
                //设置展示的在列表中被选中
                var receiveManFor = _.cloneDeep($scope.weekPopData.receiveMan);
                $scope.weekPopData.checkedOffersList = receiveManFor;
            }
            $scope.popClose = function () {
                $scope.weekPopData.showing = false;
            }

            //模糊查询
            $scope.$watch('staffName', function (newValue) {
                if (newValue) {
                    $scope.weekPopData.busy = false;
                    $scope.weekPopData.manList = [];
                    $scope.weekPopData.page = 1;
                    $scope.weekPopData.queryStaffMan();
                }
            })

            //图片预览
            $rootScope.weekview = false;
            $scope.viewImg = function () {
                $rootScope.weekview = true;
            }
            $rootScope.weekviewClose = function () {
                $rootScope.weekview = false;
            }
            //周报提交
            $scope.reportWeekSubmit = function () {
                var param = {
                    'createStaff': '',
                    'beginDt': $scope.weekReportForm.startDt,
                    'endDt': $scope.weekReportForm.endDt,
                    'completeContent': $scope.weekReportForm.completeContent,
                    'reportType': 0,//0：周报，1：月报
                    'needComplete': $scope.weekReportForm.needComplete,
                    'needHelp': $scope.weekReportForm.needHelp,
                    'fileInfo': '',
                    'sendMethod': $scope.weekReportForm.sendMethod,
                    'sendPeople': $scope.weekPopData.receiveMan
                }
                httpMethod.insertWorkReport(param).then(function (rsp) {
                    if (rsp.success) {
                        // 提交之后的操作
                    }
                }, function () {
                    $log.log('调用接口失败.');
                });
            }
        }])
        .controller('workReportMonthCtrl', ['$scope', '$rootScope', '$timeout', 'httpMethod', '$log', 'ReceiveMethod', function ($scope, $rootScope, $timeout, httpMethod, $log, ReceiveMethod) {
            $scope.monthList = [{
                monthNub: '1',
                monthName: '一月'
            },
                {
                    monthNub: '2',
                    monthName: '二月'
                },
                {
                    monthNub: '3',
                    monthName: '三月'
                },
                {
                    monthNub: '4'
                },
                {
                    monthNub: '5'
                },
                {
                    monthNub: '6'
                },
                {
                    monthNub: '7'
                },
                {
                    monthNub: '8'
                },
                {
                    monthNub: '9'
                },
                {
                    monthNub: '10'
                },
                {
                    monthNub: '11'
                },
                {
                    monthNub: '12'
                }];

            $scope.reader = new FileReader();   //创建一个FileReader接口
            $rootScope.monththumb = [];      //用于存放图片的base64
            $scope.files = [];
            $scope.img_upload = function (files) {       //单次提交图片的函数
                $scope.files.push(files[0]);
                $scope.reader.readAsDataURL(files[0]);  //FileReader的方法，把图片转成base64
                $scope.reader.onload = function (ev) {
                    $scope.$apply(function () {
                        var img = {
                            imgSrc: ev.target.result,  //接收base64
                        }
                        $rootScope.monththumb.push(img);
                    });
                };

                // var data = new FormData();      //以下为像后台提交图片数据 入参
                // data.append('image', files[0]);
                // data.append('guid',$scope.guid);
                $http({
                    method: 'post',
                    url: 'http://192.168.74.17:9082/point-manager-web/workReportQueryService/uploadImg',
                    data: data,
                    headers: {'Content-Type': undefined},
                    transformRequest: angular.identity
                }).success(function (rsp) {
                    if (rsp.success) {
                        // 出参
                    }
                })
            };

            $scope.img_del = function (key) {    //删除，删除的时候thumb和form里面的图片数据都要删除，避免提交不必要的
                $scope.files.splice(key, 1);
                $rootScope.monththumb.splice(key, 1);
            };

            $scope.monthPopData = new ReceiveMethod();
            $scope.monthPopData.queryStaffMan();
            $scope.monthPopData.busy = true;
            //弹窗显示
            $scope.monthPopData.showing = false;
            $scope.addReceiveMan = function () {
                $scope.monthPopData.busy = false;
                $scope.monthPopData.showing = true;
                //设置展示的在列表中被选中
                var receiveManFor = _.cloneDeep($scope.monthPopData.receiveMan);
                $scope.monthPopData.checkedOffersList = receiveManFor;
            }
            $scope.popClose = function () {
                $scope.monthPopData.showing = false;
            }

            //模糊查询
            $scope.$watch('staffName', function (newValue) {
                if (newValue) {
                    $scope.monthPopData.manListFor = [];
                    _.forEach($scope.monthPopData.manList, function (item) {
                        var reg = new RegExp(newValue);
                        if (item.receiveName.match(reg)) {
                            $scope.monthPopData.manListFor.push(item);
                        }
                    });
                } else {
                    $scope.monthPopData.manListFor = $scope.monthPopData.manList;
                }
            })

            //图片预览
            $rootScope.monthview = false;
            $scope.viewImg = function () {
                $rootScope.monthview = true;
            }
            $rootScope.monthviewClose = function () {
                $rootScope.monthview = false;
            }

            $scope.month = $scope.monthList[0];

            //月报提交
            $scope.reportMonthSubmit = function () {
                var param = {
                    'createStaff': '',
                    'beginDt': '',
                    'endDt': '',
                    'month': $scope.month,
                    'completeContent': $scope.monthReportForm.completeContent,
                    'reportType': 1,//0：周报，1：月报
                    'needComplete': $scope.monthReportForm.needComplete,
                    'needHelp': $scope.monthReportForm.needHelp,
                    'fileInfo': '',
                    'sendMethod': $scope.monthReportForm.sendMethod,
                    'sendPeople': $scope.monthPopData.receiveMan
                }
                httpMethod.insertWorkReport(param).then(function (rsp) {
                    if (rsp.success) {
                        // 提交之后的操作
                    }
                }, function () {
                    $log.log('调用接口失败.');
                });
            }
            //月报提交
        }])
        .directive('swipers', function ($timeout) {
            return {
                restrict: 'EA',
                scope: {
                    data: "="
                },
                template: '<div class="swiper-container silder">' +
                '<ul class="swiper-wrapper">' +
                '<li class="swiper-slide" ng-repeat="item in data">' +
                '<div class="swiper-zoom-container">' +
                '<img ng-src="{{item.imgSrc}}" alt="" />' +
                '</div>' +
                '</li>' +
                '</ul>' +
                '<div class="swiper-pagination"></div>' +
                '</div>',
                link: function (scope, el, attrs) {
                    $timeout(function () {
                        var topSwiper = new Swiper('.swiper-container', {
                            zoom: true,
                            virtual: true,
                            pagination: '.swiper-pagination',
                            paginationType: 'fraction',
                            observer: true,//修改swiper自己或子元素时，自动初始化swiper
                            observeParents: true,//修改swiper的父元素时，自动初始化swiper
                        });
                    }, 100)

                }
            }
        })
});