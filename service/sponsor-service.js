/**
 * Created by victor on 5/6/17.
 */
angular.module('pcg.sponsor-service', ['LocalStorageModule'])

  .factory('SponsorService', function ($http, localStorageService) {
    var service = {};

    service.loadInitialSponsors = function(callback){

      $http.get('data/sponsors.json').then(function successCallback(response) {
        var sponsors = localStorageService.get("sponsors");
        if (!sponsors) {
          sponsors = [];
          sponsors = sponsors.concat(response.data);
          localStorageService.set("sponsors", sponsors);
        }
        callback(sponsors);
      }, function errorCallback(response) {});

    };

    service.getSponsors = function(callback){

      if (localStorageService.get("sponsors")){
        callback(localStorageService.get("sponsors"));
      } else {
        service.loadInitialSponsors(function(sponsors){
          callback(sponsors);
        });
      }

    };

    service.beSponsor = function(formData, callback){
      var sponsors = localStorageService.get("sponsors");
      if (!sponsors) sponsors = [];
      formData.id = sponsors.length;
      formData.sponsoring_projects = [];

      sponsors.push(formData);
      localStorageService.set("sponsors", sponsors);
      callback(formData);
    };

    return service;
  });