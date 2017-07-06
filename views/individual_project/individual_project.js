/**
 * Created by victor on 21/6/17.
 */
'use strict';

angular.module('pcg.individual-projects', ['ngRoute', 'pcg.project-service'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/project/:id', {
      templateUrl: 'views/individual_project/individual_project.html',
      controller: 'ProjectCtrl'
    });
  }])

  .controller('ProjectCtrl', ['$scope', '$routeParams', 'ProjectService'
    , function ($scope, $routeParams, ProjectService) {

      $scope.commentForm = {
        data: {}
      };

      $scope.commentForm.submit = function () {
        ProjectService.addComment($scope.project.id, $scope.commentForm.data, function (project) {
          $scope.commentForm.data = {};
          ProjectService.getProjectById($routeParams.id, function (project) {
            $scope.project = project;
          });
          // console.log(project);
        });
      };

      ProjectService.getProjects(function (projects) {
        $scope.projects = projects;
      });

      ProjectService.getProjectById($routeParams.id, function (project) {
        $scope.project = project;
        $scope.isCreate = $routeParams.isCreate;
      });

      $scope.clickUpVote = function () {
        console.log('click up vote project', $scope.project.id);
        ProjectService.upVoteProject($scope.project.id);
        ProjectService.getProjectById($routeParams.id, function (project) {
          $scope.project = project;
        });
      };

      $scope.clickDownVote = function () {
        console.log('click down vote project', $scope.project.id);
        ProjectService.downVoteProject($scope.project.id);
        ProjectService.getProjectById($routeParams.id, function (project) {
          $scope.project = project;
        });
      };

      $scope.postDateFormat = function (postDate) {
        return moment(postDate).format("MMM DD, YYYY");
      };

    }]);