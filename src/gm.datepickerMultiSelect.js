/*
The MIT License (MIT)

Copyright (c) 2014 Gregory McGee

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
								day.selected = selectedDates.indexOf(day.date.setHours(0, 0, 0, 0)) > -1
							});
						});
					}
				}
			}

			return $delegate;
		}]);
	}])
	.directive('multiSelect', function() {
		return {
			require: ['ngModel'],
			link: function(scope, elem, attrs, ctrls) {
				var selectedDates;

				/* Called when directive is compiled */
				scope.$on('requestSelectedDates', function() {
					scope.$broadcast('update', selectedDates);
				});

				scope.$watchCollection(attrs.multiSelect, function(newVal) {
					selectedDates = newVal || [];
					scope.$broadcast('update', selectedDates);
				});

				scope.$watch(attrs.ngModel, function(newVal, oldVal) {
					if(!newVal) return;

					var dateVal = newVal.getTime();

					if(selectedDates.indexOf(dateVal) < 0) {
						selectedDates.push(dateVal);
					} else {
						selectedDates.splice(selectedDates.indexOf(dateVal), 1);
					}
				});
			}
		}
	})
	.directive('rangeSelect', function() {
		return {
			require: ['ngModel'],
			link: function(scope, elem, attrs, ctrls) {
				var selectedDates;

				/* Called when directive is compiled */
				scope.$on('requestSelectedDates', function() {
					scope.$broadcast('update', selectedDates);
				});

				scope.$watchCollection(attrs.rangeSelect, function(newVal) {
					selectedDates = newVal || [];
					scope.$broadcast('update', selectedDates);
				});

				scope.$watch(attrs.ngModel, function(newVal, oldVal) {
					if(!newVal) return;

					var dateVal = newVal.getTime();

					/* selected range cancellation */
					if(selectedDates.length > 1)
					  for(var i = selectedDates.length; i > 0; i--)
							selectedDates.splice(selectedDates.indexOf(selectedDates[i]), 1);

					/* select a day for the first time */
					if(!selectedDates.length)
						return selectedDates.push(dateVal);

					selectedDates.sort();
					var prevVal = selectedDates[0];
					var nextVal = selectedDates[selectedDates.length - 1];

					var setNext = function () {
						next = new Date(nextVal);
						next.setDate(next.getDate() + 1);
						nextVal = next.getTime();
						selectedDates.push(nextVal);
					};

					var setPrev = function () {
						prev = new Date(prevVal);
						prev.setDate(prev.getDate() - 1);
						prevVal = prev.getTime();
						selectedDates.push(prevVal);
					};

					/* create a range */
					if(dateVal > nextVal)
						do setNext(); while (nextVal < dateVal);
					else if (dateVal < nextVal)
						do setPrev(); while (prevVal > dateVal);
					else 
						selectedDates.splice(selectedDates.indexOf(dateVal), 1);
				});

			}
		}
	});
})();
