(function(root, factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        define(['angular'], factory);
    } else if (typeof exports === 'object') {
        factory(require('angular'));
        module.exports = 'httpServer';
    } else {
        // Browser globals (root is window), we don't register it.
        factory(root.angular);
    }
}(this, function(angular) {
    'use strict';
    angular.module('httpServer', [])
        .factory('httpServer', ['$http', '$q', function($http, $q) {
            return function(url, params, type) {
                var deferred = $q.defer();
                postService(url, params, type).then(function(data) {
                    deferred.resolve(data);
                }, function(data) {
                    deferred.reject(data);
                });
                return deferred.promise;
            };
            /**
             * [postService 请求服务]
             * @param  {[type]} url            [请求地址]
             * @param  {[object]} params       [参数]
             * @param  {[string]} type         [请求方式]
             * @return {[type]}                [返回数据]
             */
            function postService(url, params, type) {
                var deferred = $q.defer();
                if (angular.isUndefined(type)) {
                    deferred.reject('所需参数type没有传入！');
                    alert('所需参数type没有传入！');
                    return deferred.promise;
                }
                if (type != 'POST' && type != 'GET') {
                    deferred.reject('参数【' + type + '】错误！');
                    alert('参数【' + type + '】错误！');
                    return deferred.promise;
                }
                $http({
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    },
                    method: type,
                    url: url,
                    data: type == 'POST' ? 'param=' + JSON.stringify(params) : '', //用于get请求
                    params: type == 'POST' ? '' : 'param=' + JSON.stringify(params) //用于post请求
                }).success(function(data, header, config, status) {
                    deferred.resolve(data);
                }).error(function(data, header, config, status) {
                    if (status === 404) {
                        alert('您请求资源：【' + url + '】不存在！');
                    }
                    deferred.reject(data);
                });
                return deferred.promise;
            }
        }]);
}));

