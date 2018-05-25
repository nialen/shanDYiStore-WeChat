define(['angular', 'jquery', 'httpMethod', 'lodash', 'angular-animate', 'ngStorage'], function(angular, $, httpMethod, _) {
    angular
        .module('updateDetailModule', ['httpMethod', 'ngStorage'])
        .filter('typeName', function(){
            return function(value){
                switch(value){
                    case 'L':
                        return '直播中';
                        break;
                    case 'N':
                        return '未开播';
                        break;
                    case 'R':
                        return '录播';
                        break;
                }
            }
        })
        .controller('homeCtrl', ['$scope', '$rootScope', '$log', 'httpMethod', '$sessionStorage', function($scope, $rootScope, $log, httpMethod, $sessionStorage) {
            function GetQueryString(name) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
                var r = window.location.search.substr(1).match(reg);
                if (r != null) return unescape(r[2]);
                return null;
            };

            $scope.updateSysVerList = $sessionStorage[GetQueryString('updateSysVerList')] ? JSON.parse($sessionStorage[GetQueryString('updateSysVerList')]) : [];

            var param = {
                'versionId': $scope.updateSysVerList.versionId,
            }
            httpMethod.versionQueryClientById(param).then(function (rsp) {
                $scope.updateSysVerDetail = rsp.data;
            }, function () {
                $log.log('调用接口失败.');
            });



        }])      
});