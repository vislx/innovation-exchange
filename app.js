'use strict';

// Declare app level module which depends on views, and components
angular.module('pcg', [
  'ngRoute',
  'LocalStorageModule',
  'pcg.navbar',
  'pcg.home',
  'pcg.browse-projects',
  'pcg.individual-projects',
  'pcg.create-projects',
  'pcg.projects-sponsor',
  'pcg.be-sponsor',
  'pcg.project-service',
  'pcg.sponsor-service',
])
  .config(['$locationProvider', '$routeProvider', 'localStorageServiceProvider'
  ,function($locationProvider, $routeProvider, localStorageServiceProvider) {
    $locationProvider.hashPrefix('!');

    $routeProvider.otherwise({redirectTo: '/home'});

    localStorageServiceProvider
      .setPrefix('pcg')
      .setStorageType('localStorage')
      .setNotify(true, true);

}])
  .run(['$rootScope', '$window', 'ProjectService', 'SponsorService'
  ,function($rootScope, $window, ProjectService, SponsorService) {
      ProjectService.loadInitialProjects(function(projects){});
      SponsorService.loadInitialSponsors(function(sponsors){});

      $rootScope.goProject = function(id){
        $window.location.href = '#!/project/' + id;
        $window.location.reload();
      };

      $rootScope.goProjectCreate = function(id, isCreate){
        $window.location.href = '#!/project/' + id + '?isCreate=true';
        $window.location.reload();
      };

  }])

;
