angular.module('ngHopscotch', []);

angular.module('ngHopscotch').factory('hopscotch', function() {
  if (!window.hopscotch) {
    throw new Error('Missing hopscotch dependency');
  }

  return window.hopscotch;
});

angular.module('ngHopscotch').factory('HSTour', ['hopscotch', function(hopscotch) {
  return hopscotch;
}]);
