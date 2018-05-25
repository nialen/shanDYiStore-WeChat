define(['angular', 'jquery', 'httpMethod', 'lodash', 'angular-animate', 'ngStorage', 'ng-infinite-scroll'], function(angular, $, httpMethod, _) {
    angular
        .module('myCustomerModule', ['httpMethod', 'ngStorage', 'infinite-scroll'])
        .factory('CustomerQuery', ['$filter', 'httpMethod', '$log', function($filter, httpMethod, $log){
            var CustomerQuery = function() {
                this.busy = false;
                this.page = 1;
                this.pageSize = 10;
                this.myCustomerList = [];
            };
            //版本更新查询
            CustomerQuery.prototype.queryMyCustomer =  function(type, regionId, name){
                var _this = this,
                    params = {
                        'customerType': type,
                        'commonRegionId': regionId,
                        'custName': name,
                        'curPage': _this.page,
                        'pageSize': _this.pageSize
                    };
                if(_this.busy){
                    return;
                }//判断当前数据是否请求完成
                _this.busy = true;
                httpMethod.queryMyCustListByClient(params).then(function(rsp) {
                    if (rsp.success) {
                        if(rsp.data.rows.length > 0){
                            var items = rsp.data.rows;
                            items.forEach(function(item) {
                                _this.myCustomerList.push(item);
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
            return CustomerQuery;
        }])
        .filter('custStatusName', function(){
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
        .controller('homeCtrl', ['$scope', '$rootScope', '$log', 'httpMethod', '$sessionStorage', 'CustomerQuery', function($scope, $rootScope, $log, httpMethod, $sessionStorage, CustomerQuery) {

            $scope.customerQuery = new CustomerQuery();
            $scope.customerTypeList = [{
                customerType:1000,
                customerTypeName:'集团级'
            },{
                customerType:1100,
                customerTypeName:'省级'
            },{
                customerType:1200,
                customerTypeName:'本地网级'
            },{
                customerType:1300,
                customerTypeName:'本地网以下级'
            }];
            //跳转至详情页
            $scope.goToDetail = function(myCustomerList){
                $sessionStorage[myCustomerList.custId] = JSON.stringify(myCustomerList);
                window.open('../../view/shanDongYiStoreWebchat/myCustomerDetail.html?versionId=' + myCustomerList.custId, '_self');
            }

        }])
});