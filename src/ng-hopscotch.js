function HSRemoveTourItem(element, tourId, isFinal) {
  var current = document.querySelector('.hopscotch-bubble:not(.hide)');
  current.parentNode.removeChild(current);
  isFinal && localStorage.setItem('HSTour:' + tourId + ':completed', 1);
};

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

angular.module('ngHopscotch').factory('HSCache', function() {

  var cache = {
    isEnded : false,
    isClosed : false
  };

  return cache;
});

angular.module('ngHopscotch').service('HSTour', ['hopscotch', 'HSHelper', 'HSCache', function(hopscotch, HSHelper, HSCache) {

  function HSTour(tour) {
    this.tour = tour;
  };

  HSTour.refresh = function() {
    HSCache = {};
  };

  HSTour.patch = function(tour, isFinal) {
    tour.onEnd = function() {
      HSCache.isEnded = true;
    };

    tour.onClose = function() {
      HSCache.isClosed = true;
    };

    tour.steps.forEach(function(step) {
      step.content += "<br /><a style='position:absolute;bottom:20px' href='#' onclick='HSRemoveTourItem(this,\"" + tour.id + "\"," + !!isFinal + ")'>Skip all</a>"
    });
  };

  HSTour.prototype.init = function(tour) {
    this.tour = tour;
  };

  HSTour.prototype.start = function(isFinal, stepNum) {
    HSTour.patch(this.tour, isFinal);
    if (!isFinal || (isFinal && (!parseInt(localStorage.getItem('HSTour:' + this.tour.id + ':completed')) && (!HSCache.isEnded && !HSCache.isClosed)))) {
      hopscotch.startTour(this.tour, stepNum);
    }
  };

  HSTour.prototype.end = function(clearCookie) {
    hopscotch.endTour(clearCookie);
  };

  HSTour.prototype.getCurrentStep = function() {
    return this.tour.steps[hopscotch.getCurrStepNum()];
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
