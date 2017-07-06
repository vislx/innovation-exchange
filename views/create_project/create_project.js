/**
 * Created by victor on 21/6/17.
 */
'use strict';

angular.module('pcg.create-projects', ['ngRoute', 'pcg.project-service'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/start', {
      templateUrl: 'views/create_project/create_project.html',
      controller: 'CreateProjectCtrl'
    });
  }])

  .controller('CreateProjectCtrl', ['$scope', '$rootScope', 'ProjectService'
    , function ($scope, $rootScope, ProjectService) {

      ProjectService.getProjects(function (projects) {
        $scope.projects = projects;
      });

      $scope.createProjectForm = {
        data: {
          resources: {
            manpower: {
              need: [{name: '', quantity: ''}]
            }
          }
        },
      };

      $scope.createProjectForm.submit = function () {
        ProjectService.createProject($scope.createProjectForm.data, function (project) {
          console.log(project);
          $rootScope.goProjectCreate(project.id, true);
        });
      };

      $scope.createProjectForm.addResource = function () {
        $scope.createProjectForm.data.resources.manpower.need.push({name: '', quantity: ''});
      };


    }]);