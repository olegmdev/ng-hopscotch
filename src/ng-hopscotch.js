var ngHopscotch = angular.module('ngHopscotch', []);

ngHopscotch.factory('HSTour', ['hopscotch', function(hopscotch) {
  return hopscotch;
}]);

ngHopscotch.factory('hopscotch', function() {
  if (!window.hopscotch) {
    throw new Error('Missing hopscotch dependency');
  }

  return window.hopscotch;
});

