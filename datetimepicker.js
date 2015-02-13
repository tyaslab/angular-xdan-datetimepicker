var datetimepicker = angular.module('xdan.datetimepicker', []);

datetimepicker.directive('xdanDatetimepicker', function() {
    return {
        require: '?ngModel',
        scope: {
            user_options: '=xdanDatetimepicker'
        },
        template: '<input type="text">',
        link: function(scope, element, attrs, ngModelController) {
            if (!ngModelController) {
                element.find('input[type=text]').datetimepicker(scope.options);
                return false;
            }

            // default options
            // I hate scrollMonth!!!
            scope.options = {
                scrollMonth: false,
                format: 'd-m-Y H:i' // The most famous date format in my country ;)
            };
            
            if (scope.user_options) {
                angular.extend(scope.options, scope.user_options)
            }

            if (scope.user_options.onChangeDateTime) {
                scope.options.onChangeDateTime = function(current_time, input) {
                    scope.user_options.onChangeDateTime();
                    ngModelController.$setViewValue(current_time);
                };
            } else {
                scope.options.onChangeDateTime = function(current_time, input) {
                    ngModelController.$setViewValue(current_time);
                }
            }

            ngModelController.$render = function() {
                element.find('input[type=text]').datetimepicker(scope.options);
            };

            ngModelController.$formatters.push(function(modelValue) {
                if (modelValue) {
                    var date = new Date(modelValue);
                    date = date.dateFormat(scope.options.format);
                    element.find('input[type=text]').val(date);
                }

                return modelValue
            });
        }
    }
});