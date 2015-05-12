/*
The MIT License (MIT)

Copyright (c) 2014 Gregory McGee / Daniel Neri

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

(function() {
	angular.module('gm.datepickerMultiSelect', ['ui.bootstrap'])
	.config(['$provide', function($provide) {
		$provide.decorator('daypickerDirective', ['$delegate', function($delegate) {
			var directive = $delegate[0];

			/* Override compile */
			var link = directive.link;

			directive.compile = function() {
				return function(scope, element, attrs, ctrl) {
					link.apply(this, arguments);

					var selectedDates = [];

					/* Called when multiSelect model is updated */
					scope.$on('update', function(event, newDates) {
						selectedDates = newDates;
						update();
					});

					/* Get dates pushed into multiSelect array before Datepicker is ready */
					scope.$emit('requestSelectedDates');

					/* Fires when date is selected or when month is changed. */
					scope.$watch(function () {
						return ctrl.activeDate.getTime();
					}, update);

					function update() {
						angular.forEach(scope.rows, function(row) {
							angular.forEach(row, function(day) {

								if(angular.isUndefined(selectedDates)) selectedDates = [];
								
								var selectedDateIndex = selectedDates.indexOf(day.date.setHours(12, 0, 0, 0));
								if(selectedDateIndex > -1) {
									day.overrideDisabled = true;
									day.selected = true;
								}else{
									day.overrideDisabled = false;
									day.selected = false;
								}

								day.firstInRange = (selectedDateIndex === 0) ? true : false;
								day.lastInRange = (selectedDateIndex === selectedDates.length - 1) ? true : false;
								
							});
						});
					}
				}
			}

			return $delegate;
		}]);
	}])
	.directive('selectRange', function() {
		return {
			link: function(scope, elem, attrs, ctrls) {
				var selectedDates;

				/* Called when directive is compiled */
				scope.$on('requestSelectedDates', function() {
					scope.$broadcast('update', selectedDates);
				});

				attrs.$observe('selectRange', function(newVal) {
				  selectRange = !!newVal && newVal !== "false";
				});

				scope.$watch(attrs.ngModel, function(newVal, oldVal) {

					if (!newVal) return;

					if (angular.isUndefined(scope.selectedRange)) selectedRange = 0;

					selectedDates = [];

					var dateVal = angular.copy(newVal);
					dateVal.setHours(12,0,0,0);

					selectedDates.push(dateVal.getTime());

					for(var i = 0; i < (scope.selectRange - 1); i++) {
						var d = new Date(angular.copy(selectedDates[i]));
						d.setDate(d.getDate() + 1);
						selectedDates.push(d.getTime());

					}

					scope.$broadcast('update', selectedDates);
				});
			}
		}
	});
})();