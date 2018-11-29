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
            // 图片上传
            $scope.picsthumb = [];      //用于存放图片的base64       
            $scope.img_upload = function (files) {       //单次提交图片的函数
                if(($scope.picsthumb.length + files.length) > 3 ){
                    alert("图片最多只能上传3张!");
                    return false;
                }     
                _.map(files, function(item){                   
                    $scope.reader = new FileReader();                   
                    $scope.reader.readAsDataURL(item);  //FileReader的方法，把图片转成base64
                    $scope.reader.onload = function (ev) {
                        $scope.$apply(function () {
                            var img = {
                                imgSrc: ev.target.result,  //接收base64
                            }
                            $scope.picsthumb.push(img);                                  
                            document.querySelector('#one-input').value = null
                        });
                    };
                    var data = new FormData();      //以下为像后台提交图片数据 通过FormData将文件转成二进制数据
                    data.append('image', item);
                    $scope.ajaxFileUpload(item);
                })                             
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

            $scope.img_del = function (key) {    //删除，删除的时候thumb和form里面的图片数据都要删除，避免提交不必要的
                $scope.picsthumb.splice(key, 1);
            };
            $scope.picview = false;
            $scope.viewImg = function () {
                $scope.picview = true;
            }
            $scope.viewClose = function () {
                $scope.picview = false;
            }
        }])
});