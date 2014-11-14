angular.module('gm.datepickerMultiSelect', ['ui.bootstrap'])
.config(function($provide) {
	$provide.decorator('daypickerDirective', function($delegate) {
		var directive = $delegate[0];
    
		/* Override compile */
		var link = directive.link;

		directive.compile = function() {
			return function(scope, element, attrs, ctrl) {
				link.apply(this, arguments);
        
				scope.$on('selection', function(event, selectedDates) {
					angular.forEach(scope.rows, function(row) {
            angular.forEach(row, function(day) {
              day.selected =  selectedDates.indexOf(day.date.setHours(0, 0, 0, 0)) > -1
            });
          });
				});
			}
		}
		
		return $delegate;
	});
})
.directive('multiSelect', function() {
	return {
		require: ['datepicker', 'ngModel'],
    link: function(scope, elem, attrs, ctrls) {
			var selectedDates = scope.$eval(attrs.multiSelect);
      
      elem.isolateScope().selectedDates = selectedDates;
      
      scope.$watchCollection(attrs.multiSelect, function(newVal) {
        scope.$broadcast('selection', selectedDates);
      });

			scope.$watch(attrs.ngModel, function(newVal) {
				if(!newVal) return;
        
				var dateVal = newVal.getTime();
        
				if(selectedDates.indexOf(dateVal) < 0) {
					selectedDates.push(dateVal);
				} else {
          selectedDates.splice(selectedDates.indexOf(dateVal), 1);
        }
        selectedDates.sort();
			});
		}
	}
});