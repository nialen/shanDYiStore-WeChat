/**
 * 公共的require配置
 */

require.config({
	baseUrl: '../../resources/js',
	urlArgs: 'v=20180304',
	paths: {
		'angular': './angular.min',
		'angular-animate': './angular-animate.min',
		'angular-sanitize': './angular-sanitize.min',
		'ui-bootstrap-tpls': './ui-bootstrap-tpls-2.5.0.min',
		'jquery': './jquery.min',
		'lodash': './lodash.min',
		'mock': './mock',
		'mockData': './mockData',
		'select': './select',
		'swiper': './swiper.min',
		'iscroll': './iscroll',
		'datepicker': './datepicker',		
		'jqueryDialog': './jquery.dialog',
		'ngJqueryDialog': './ngJqueryDialog',
		'httpServer': './httpServer',
		'httpMethod': './httpMethod',
	},
	shim: {
		'angular': {
			exports: 'angular'
		},		
		'angular-animate': {
			deps: ['angular'],
			exports: 'ngAnimate'
		},	
		'angular-sanitize': {
			deps: ['angular'],
			exports: 'ngSanitize'
		},	
		'ui-bootstrap-tpls': {
			deps: ['angular']
		},		
		'select': {
			deps: ['angular']
		},
		'ngJqueryDialog': {
			deps: ['angular', 'jquery', 'jqueryDialog']
		},		
		'httpServer': {
			deps: ['angular'],
			exports: 'httpServer'
		},
		'httpMethod': {
			deps: ['angular', 'httpServer'],
			exports: 'httpMethod'
		}
	}
});

require(['jquery'], function($) {
	var currentPage = $('#page').attr('current-page');
	var targetModule = $('#page').attr('target-module');

	// mockData 加载与否决定是否启用模拟数据
	require(['angular', 'mockData', currentPage], function(angular) {
		angular.bootstrap(document, [targetModule]);
	});
});
