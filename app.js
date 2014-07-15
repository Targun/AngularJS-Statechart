var State = statechart.State,
    app   = angular.module('myApp', []);

app.factory('$state', function() { return {}; });

app.factory('$statechart', function($state) {
  return State.define(function() {
    this.trace = true;
    
    this.state('W', function() {
      this.state('X', {H: true}, function() {
        this.enter(function() {
          $state.mainElement = $state.panelHeading = this.name;
        });
        
        this.state('Y', function() {
          this.enter(function() { $state.selectedOption = this.name;});
        });
        
        this.state('Z', function() {
          this.enter(function() { $state.selectedOption = this.name; });
        });
        
        this.event('selectOption', function(option) { this.goto(option); });
      });
      
      this.state('P', {concurrent: true}, function() {
        this.enter(function() { $state.mainElement = this.name; });
        
        this.state('P1', function() {
          this.state('A', function() {
            this.enter(function() { $state.selectedP1Option = this.name; });
            this.event('toggle', function() { this.goto('../B'); });
          });
          
          this.state('B', function() {
            this.enter(function() { $state.selectedP1Option = this.name; })
            this.event('toggle', function() { this.goto('../A'); });
          });
          
          this.event('selectP1Option', function(option) { this.goto(option); });
        });
        
        this.state('P2', function() {
          this.state('C', function() {
            this.enter(function() { $state.selectedP2Option = this.name; })
            this.event('toggle', function() { this.goto('../D'); });
          });
          
          this.state('D', function() {
            this.enter(function() { $state.selectedP2Option = this.name; })
            this.event('toggle', function() { this.goto('../C'); });
          });
          
          this.event('selectP2Option', function(option) { this.goto(option); });
        });
        
        this.state('P3', function() {
          this.state('E', function() {
            this.enter(function() { $state.selectedP3Option = this.name; })
            this.event('toggle', function() { this.goto('../F'); });
          });
          
          this.state('F', function() {
            this.enter(function() { $state.selectedP3Option = this.name; })
            this.event('toggle', function() { this.goto('../E'); });
          });
          
          this.event('selectP3Option', function(option) { this.goto(option); });
        });
      });
      
      this.event('selectTab', function(tab) { this.goto(tab); });
    });
  });
});

app.controller('MainCtrl', function($scope, $state, $statechart) {
  $scope.$state = $state;
  $scope.event = function() {
    $statechart.send.apply($statechart, arguments);
  };
  $scope.currentState = function() {
    return $statechart.current();
  };
});

app.run(function($statechart) { $statechart.goto(); });
