define(['angular', 'jquery', 'httpMethod', 'lodash', 'angular-animate', 'ngStorage', 'ng-infinite-scroll'], function(angular, $, httpMethod, _) {
    angular
        .module('updateListModule', ['httpMethod', 'ngStorage', 'infinite-scroll'])
        .factory('UpdateQuery', ['$filter', 'httpMethod', '$log', function($filter, httpMethod, $log){
            var UpdateQuery = function() {
                this.busy = false;
                this.page = 1;
                this.pageSize = 10;
                this.updateSysVerList = [];
            };
            //版本更新查询
            UpdateQuery.prototype.querySysVer =  function(){
                var _this = this,
                    params = {
                        'curPage': _this.page,
                        'pageSize': _this.pageSize
                    };
                if(_this.busy){
                    return;
                }//判断当前数据是否请求完成
                _this.busy = true;
                httpMethod.versionQueryListByClient(params).then(function(rsp) {
                    if (rsp.success) {
                        if(rsp.data.rows.length > 0){
                            var items = rsp.data.rows;
                            items.forEach(function(item) {
                                _this.updateSysVerList.push(item);
                            });
                            _this.busy = false;
                            _this.page += 1;
                            if(_this.page > rsp.data.total){
                                _this.busy = true;
                            }
                        }else{
                            _this.busy = true;
                        }
                        $log.log('调用接口成功.');
                    }else{
                        _this.busy = true;
                    }
                },function() {
                    $log.log('调用接口失败.');
                });
            };
            return UpdateQuery;
        }])
        .controller('homeCtrl', ['$scope', '$rootScope', '$log', 'httpMethod', '$sessionStorage', 'UpdateQuery', function($scope, $rootScope, $log, httpMethod, $sessionStorage, UpdateQuery) {

            $scope.updateQuery = new UpdateQuery();

            //跳转至详情页
            $scope.goToUpdateDetail = function(updateSysVerList){
                $sessionStorage[updateSysVerList.versionId] = JSON.stringify(updateSysVerList);
                window.open('../../view/updateInstruction/updateDetail.html?versionId=' + updateSysVerList.versionId, '_self');
            }

        }])      
});