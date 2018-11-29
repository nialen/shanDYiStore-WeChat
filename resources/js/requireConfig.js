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
		'jquery': './jquery.min',
		'pinch-zoom': './pinch-zoom.umd',
		'lodash': './lodash.min',
		'mock': './mock',
		'mockData': './mockData',
		'ngStorage': './ngStorage',
		'ng-infinite-scroll': '../../resources/js/ng-infinite-scroll.min',
		'select': './select',
		'swiper': './swiper.min',
		'iscroll': './iscroll',
		'datepicker': './datepicker',		
		'jqueryDialog': './jquery.dialog',
		'ngJqueryDialog': './ngJqueryDialog',
		'httpServer': './httpServer',
		'httpMethod': './httpMethod',
		'ajaxfileupload': './ajaxfileupload',
		'moment': '../../resources/js/moment',
		'calendar': './jquery.calendar',	
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
		'ngStorage': {
			deps: ['angular']
		},
		'ng-infinite-scroll': {
			deps: ['angular']
		},
		'pinch-zoom': {
			deps: ['jquery']
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
		},
		'moment': {
            init: function(moment) {
                return moment;
            }
		},
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
