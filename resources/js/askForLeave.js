define(['angular', 'jquery', 'httpMethod', 'lodash', 'angular-animate', 'swiper', 'ajaxfileupload', 'iscroll', 'datepicker'], function(angular, $, httpMethod, _) {
    angular
        .module('askForLeaveModule', ['httpMethod'])
        .controller('homeCtrl', ['$scope', '$rootScope', '$log', 'httpMethod', '$timeout', function($scope, $rootScope, $log, httpMethod, $timeout) {
            $scope.showLeave = false;
            $scope.choosedType = '';
            $scope.openLeaveType = function(){
                $scope.showLeave = true;
            }
            $scope.cancel = function(){
                $scope.showLeave = false;
            }
            $scope.chooseType = function(val, name){
                var obj = {
                    typeCd: val,
                    typeName: name
                }
                $scope.checked = obj;
            }
            $scope.confirm = function(){
                $scope.choosedType = $scope.checked;
                $scope.showLeave = false;
            }
            // 时间
            $scope.askForLeaveForm = {
                beginDate: '',
                endDate: ''
            };    
            $('#startDt').date({}, function (datestr) {
                $scope.askForLeaveForm.beginDate = datestr;
                $scope.$apply();
            });
            $('#endDt').date({}, function (datestr) {
                $scope.askForLeaveForm.endDate = datestr;
                $scope.$apply();
            });

            $scope.reader = new FileReader(); 
            $scope.pics = [];    
            $scope.img_upload = function (files) {       //单次提交图片的函数
                $scope.reader.readAsDataURL(files[0]);  //FileReader的方法，把图片转成base64
                $scope.reader.onload = function (ev) {
                    $scope.$apply(function () {
                        var img = {
                            imgSrc: ev.target.result,  //接收base64
                        }
                        $scope.pics.push(img);
                        document.querySelector('#one-input').value = null
                    });
                };
                var data = new FormData();      //以下为像后台提交图片数据 通过FormData将文件转成二进制数据
                data.append('image', files[0]);
                $scope.ajaxFileUpload(files[0]);
            };
            $scope.vacationPicUrl = [];
            $scope.ajaxFileUpload = function(obj) {
                $.ajaxFileUpload({
                    fileElementId: obj.id,
                    // url: 'URL', //用于文件上传的服务器端请求地址
                    secureuri: false, //一般设置为false
                    fileElementId: 'file', //文件上传空间的id属性  <input type="file" id="file" name="file" />
                    dataType: 'json', //返回值类型 一般设置为json
                    success: function (data, status) {  //服务器成功响应处理函数
                        // console.log(data)
                        $scope.vacationPicUrl.push(data);
                    }, error: function (data, status, e) {//服务器响应失败处理函数
                        alert(e);
                    }
                });
                return false;
            };

            $scope.img_del = function (key) {    //删除，删除的时候thumb和form里面的图片数据都要删除，避免提交不必要的
                $scope.pics.splice(key, 1);
                $scope.vacationPicUrl.splice(key, 1);
            };

            $scope.picview = false;
            $scope.viewImg = function () {
                $scope.picview = true;
                $timeout(function () {
                    var el = document.querySelector('.focus');
                    new PinchZoom.default(el, {});    
                    $scope.$apply(); 
                }, 101);                  
            }
            $scope.viewClose = function () {
                $scope.picview = false;
            }
            $scope.submit = function(){
                var param = {
                    'vacationType': _.get($scope, 'choosedType.typeCd'),
                    'beginDate': _.get($scope, 'askForLeaveForm.beginDate'),
                    'endDate': _.get($scope, 'askForLeaveForm.endDate'),
                    'duration': $scope.askForLeaveForm.duration,
                    'vacationReason': $scope.askForLeaveForm.vacationReason,
                    'vacationPicUrl': $scope.vacationPicUrl,
                    'approvalStaff': $scope.askForLeaveForm.approvalStaff
                }
                httpMethod.queryMyCustListByClient(param).then(function(rsp) {
                    if (rsp.success) {
                        
                    }
                },function() {
                    $log.log('调用接口失败.');
                });
            }
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
                    $this = $(el);
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