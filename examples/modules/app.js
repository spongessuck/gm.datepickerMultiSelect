(function(angular) {
	'use strict';
	
	angular.module('app', ['gm.datepickerMultiSelect'])
	.controller('AppCtrl', function() {
		this.activeDate;
		this.selectedDates = [new Date().setHours(0, 0, 0, 0)];
		this.type = 'individual';
		
		this.removeFromSelected = function(dt) {
			this.selectedDates.splice(this.selectedDates.indexOf(dt), 1);
		}
		
		this.activeDate1;
		this.selectedDates1 = [new Date().setHours(24, 0, 0, 0)];
		this.type1 = 'individual';
		
		this.removeFromSelected1 = function(dt) {
			this.selectedDates1.splice(this.selectedDates1.indexOf(dt), 1);
		}
	});
})(window.angular);