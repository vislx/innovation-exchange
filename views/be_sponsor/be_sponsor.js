/**
 * Created by victor on 22/6/17.
 */

angular.module('pcg.be-sponsor', ['ngRoute', 'pcg.sponsor-service'])

  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/be_sponsor', {
      templateUrl: 'views/be_sponsor/be_sponsor.html',
      controller: 'BeSponsorCtrl'
    });
  }])

  .controller('BeSponsorCtrl', ['$scope', '$rootScope', '$window', 'SponsorService'
    ,function($scope, $rootScope, $window, SponsorService) {

      $scope.beSponsorForm = {
        data:{},
        interest_areas:
          [{"name": "Artificial Intelligences", "class": "badge-primary"},

            {"name": "Automating SDLC", "class": "badge-info"},

            {"name": "Automation", "class": "badge-danger"},

            {"name": "Business Innovation", "class": "badge-danger"},

            { "name": "Cloud", "class": "badge-primary"},
            {
              "name": "Data Science/Big Data", "class": "badge-success"},
            {
              "name": "Deployment Tools", "class": "badge-info"},
            {
              "name": "Development Tools", "class": "badge-danger"},
            {
              "name": "Environment Management", "class": "badge-success"},
            {
              "name": "Monitoring & Support", "class": "badge-info"},
            {
              "name": "Pain Remover", "class": "badge-primary"},
            {
              "name": "Knowledge Sharing", "class": "badge-info"},
            {
              "name": "Solving Business Problem", "class": "badge-danger"},
            {
              "name": "Test Tools", "class": "badge-primary"},
            {
              "name": "Robotics", "class": "badge-success"}
          ],
      };


      $scope.beSponsorForm.submit = function(){
        SponsorService.beSponsor($scope.beSponsorForm.data, function(sponsor){
          $window.location.href = "#!/sponsors";
          $window.location.reload();
        });
      };

      SponsorService.getSponsors(function(sponsors){
        $scope.sponsors = sponsors;
        console.log($scope.sponsors);
      });




    }]);