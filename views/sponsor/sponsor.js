/**
 * Created by victor on 22/6/17.
 */
'use strict';

angular.module('pcg.projects-sponsor', ['ngRoute', 'pcg.sponsor-service'])

  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/sponsors', {
      templateUrl: 'views/sponsor/sponsor.html',
      controller: 'SponsorCtrl'
    });
  }])

  .controller('SponsorCtrl', ['$scope', '$rootScope', '$window', 'SponsorService'
    ,function($scope, $rootScope, $window, SponsorService) {

    SponsorService.getSponsors(function(sponsors){
      $scope.sponsors = sponsors;
      console.log($scope.sponsors);
    });

      $scope.goBeSponsor=function(){
        $window.location.href = "#!/be_sponsor";
        // $window.location.reload();
        // $window.location.replace("#!/projects");
      };



    }]);