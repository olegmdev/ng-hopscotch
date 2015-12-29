angular.module('ngHopscotch', []);

angular.module('ngHopscotch').factory('hopscotch', function() {
  if (!window.hopscotch) {
    throw new Error('Missing hopscotch dependency');
  }

  return window.hopscotch;
});

angular.module('ngHopscotch').factory('HSHelper', function() {

  var helper = {
    extend : function(child, parent) {
      for (var key in parent) {
        if (parent.hasOwnProperty(key)) {
          child[key] = parent[key];
        }
      }
    }
  };

  return helper;
});

angular.module('ngHopscotch').service('HSTour', ['hopscotch', 'HSHelper', function(hopscotch, HSHelper) {

  function HSTour(tour) {
    this.tour = tour;
  }

  HSTour.prototype.init = function(tour) {
    this.tour = tour;
  };

  HSTour.prototype.start = function() {
    hopscotch.startTour(this.tour);
  };

  HSTour.prototype.bind = function(options) {
    for (var key in options) {
      var step = this.tour.steps.find(function(item) { return item.target === key; });
      if (step) {
        HSHelper.extend(step, options[key]);
      }
    }
  };

  HSTour.prototype.removeStep = function(step) {
    switch(typeof step) {
      case 'number':
        delete this.tour.steps[step];
        break;
      case 'string':
        this.tour.steps.splice(this.tour.steps.findIndex(function(item) {
          return item.target === step;
        }), 1);
      case 'object':
        break;
    }
  };

  return HSTour;
}]);
