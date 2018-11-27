define(['angular', 'jquery', 'httpMethod', 'lodash', 'angular-animate', 'ngStorage', 'ajaxfileupload', 'iscroll', 'datepicker', 'calendar'], function(angular, $, httpMethod, _) {
    angular
        .module('applyForAddPunchCardModule', ['httpMethod', 'ngStorage'])
        .filter('channelStatusName', function(){
            return function(value){
                switch(value){
                    case 1000:
                        return '有效';
                        break;
                    case 1001:
                        return '主动暂停';
                        break;
                    case 1002:
                        return '异常暂停';
                        break;
                    case 1100:
                        return '失效';
                        break;
                }
            }
        })
        .controller('homeCtrl', ['$scope', '$rootScope', '$log', 'httpMethod', '$sessionStorage', function($scope, $rootScope, $log, httpMethod, $sessionStorage) {
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
            $scope.beginDt = ''; //开始时间
            $scope.endDt = ''; //结束时间
            $('#startDt').date({}, function (datestr) {
                $scope.beginDt = datestr;
                $scope.$apply();
            });
            $('#endDt').date({}, function (datestr) {
                $scope.endDt = datestr;
                $scope.$apply();
            });

            $scope.imgSrc = null;
            $scope.reader = new FileReader(); 
            $scope.img_upload = function (files) {       //单次提交图片的函数
                $scope.reader.readAsDataURL(files[0]);  //FileReader的方法，把图片转成base64
                $scope.reader.onload = function (ev) {
                    $scope.$apply(function () {
                        $scope.imgSrc = ev.target.result; //接收base64
                        document.querySelector('#one-input').value = null
                    });
                };
                var data = new FormData();      //以下为像后台提交图片数据 通过FormData将文件转成二进制数据
                data.append('image', files[0]);
                $scope.ajaxFileUpload(files[0]);
            };

            $scope.ajaxFileUpload = function(obj) {
                $.ajaxFileUpload({
                    fileElementId: obj.id,
                    // url: 'URL', //用于文件上传的服务器端请求地址
                    secureuri: false, //一般设置为false
                    fileElementId: 'file', //文件上传空间的id属性  <input type="file" id="file" name="file" />
                    dataType: 'json', //返回值类型 一般设置为json
                    success: function (data, status) {  //服务器成功响应处理函数
                        console.log(data)
                    }, error: function (data, status, e) {//服务器响应失败处理函数
                        alert(e);
                    }
                });
                return false;
            };

            $scope.img_del = function () {    //删除，删除的时候thumb和form里面的图片数据都要删除，避免提交不必要的
                $scope.imgSrc = null;
            };

        }])
});