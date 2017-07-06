/**
 * Created by victor on 21/6/17.
 */
'use strict';

angular.module('pcg.browse-projects', ['ngRoute', 'pcg.project-service'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/projects', {
      templateUrl: 'views/browse_projects/browse_projects.html',
      controller: 'ProjectsCtrl'
    });
  }])

  .controller('ProjectsCtrl', ['$scope', '$routeParams', 'ProjectService'
    , function ($scope, $routeParams, ProjectService) {

      ProjectService.getProjects(function (projects) {
        $scope.projects = projects;
      });
      $scope.category = $routeParams.category;

    }]);