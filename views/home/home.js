/**
 * Created by victor on 20/6/17.
 */
'use strict';

angular.module('pcg.home', ['ngRoute', 'pcg.project-service'])

  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/home', {
      templateUrl: 'views/home/home.html',
      controller: 'HomeCtrl'
    });
  }])

  .controller('HomeCtrl', ['$scope', 'ProjectService', '$window'
    ,function($scope, ProjectService, $window) {

    $('#carousel_home').carousel({
      interval: 3000,
      pause: 'null',
    });

    ProjectService.getProjects(function(projects){
      $scope.projects = projects;
      $scope.topProject = projects[0];
    });

    $scope.goSeeAll=function(){
      $window.location.href = "#!/projects";
      $window.location.reload();
      // $window.location.replace("#!/projects");
    };

  }]);