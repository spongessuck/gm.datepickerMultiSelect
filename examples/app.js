(function(angular) {
	'use strict';
	
	angular.module('app', ['gm.datepickerMultiSelect'])
	.controller('AppCtrl', function($filter) {
		var today = Date.parse($filter('gmISODate')(new Date()))
		this.activeDate;
		this.selectedDates = [today];
		this.type = 'individual';
		
		this.removeFromSelected = function(dt) {
			this.selectedDates.splice(this.selectedDates.indexOf(dt), 1);
		}
		
		this.activeDate1;
		var tomorrow = Date.parse($filter('gmISODate')(new Date().setHours(24, 0, 0, 0)))
		this.selectedDates1 = [tomorrow];
		this.type1 = 'individual';
		
		this.removeFromSelected1 = function(dt) {
			this.selectedDates1.splice(this.selectedDates1.indexOf(dt), 1);
		}
	});
})(window.angular);
