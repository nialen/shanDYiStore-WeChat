define(['angular', 'jquery', 'httpMethod', 'lodash', 'angular-animate', 'ngStorage', 'ng-infinite-scroll'], function(angular, $, httpMethod, _) {
    angular
        .module('relationStoreModule', ['httpMethod', 'ngStorage', 'infinite-scroll'])
        .factory('RelationStore', ['$filter', 'httpMethod', '$log', function($filter, httpMethod, $log){
            var RelationStore = function() {
                this.busy = false;
                this.page = 1;
                this.pageSize = 10;
                this.relationStoreList = [];
            };
            //渠道查询
            RelationStore.prototype.queryRelationStore =  function(custId){
                var _this = this,
                    params = {
                        'custId': custId,
                        'curPage': _this.page,
                        'pageSize': _this.pageSize
                    };
                if(_this.busy){
                    return;
                }//判断当前数据是否请求完成
                _this.busy = true;
                httpMethod.quertChannelListByCustId(params).then(function(rsp) {
                    if (rsp.success) {
                        if(rsp.data.rows.length > 0){
                            var items = rsp.data.rows;
                            items.forEach(function(item) {
                                _this.relationStoreList.push(item);
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
            return RelationStore;
        }])
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
        .controller('homeCtrl', ['$scope', '$rootScope', '$log', 'httpMethod', '$sessionStorage', 'RelationStore', function($scope, $rootScope, $log, httpMethod, $sessionStorage, RelationStore) {
            function GetQueryString(name) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
                var r = window.location.search.substr(1).match(reg);
                if (r != null) return unescape(r[2]);
                return null;
            };

            $scope.myCustomerList = $sessionStorage[GetQueryString('myCustomerList')] ? JSON.parse($sessionStorage[GetQueryString('myCustomerList')]) : [];


            $scope.relationStore = new RelationStore();
        }])
});