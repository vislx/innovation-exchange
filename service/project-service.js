/**
 * Created by victor on 5/6/17.
 */
angular.module('pcg.project-service', ['LocalStorageModule'])

  .factory('ProjectService', function ($http, localStorageService) {
    var service = {};

    service.loadInitialProjects = function(callback){

      $http.get('data/projects.json').then(function successCallback(response) {
          var projects = localStorageService.get("projects");
          if (!projects) {
            projects = [];
            projects = projects.concat(response.data);
            localStorageService.set("projects", projects);
          }
          callback(projects);
        }, function errorCallback(response) {

        });

    };

    service.getProjects = function(callback){

      if (localStorageService.get("projects")){
        callback(localStorageService.get("projects"));
      } else {
        service.loadInitialProjects(function(projects){
          callback(projects);
        });
      }

    };

    service.getProjectById = function(id, callback){
      if (localStorageService.get("projects")){
        if(localStorageService.get("projects").length > id)
          callback(localStorageService.get("projects")[id]);
        else
          callback(false);
      } else {
        service.loadInitialProjects(function(projects){
          if(projects.length > id)
            callback(projects[id]);
          else
            callback(false);
        });
      }
    };

    service.createProject = function(formData, callback){

      //...validation here

      formData.post_date = moment().format("YYYY-MM-DD");
      formData.status = "proposed";
      formData.up_vote = 0;
      formData.comments = [];
      formData.down_vote = 0;

      var projects = localStorageService.get("projects");
      if (!projects) projects = [];
      formData.id = projects.length;
      projects.push(formData);
      localStorageService.set("projects", projects);

      callback(formData);
    };

    service.upVoteProject = function(id){
      var projects = localStorageService.get("projects");
      if(!projects || projects.length <= id) return;

      projects[id].up_vote ++;

      localStorageService.set("projects", projects);
    };

    service.downVoteProject = function(id){
      var projects = localStorageService.get("projects");
      if(!projects || projects.length <= id) return;

      projects[id].down_vote ++;

      localStorageService.set("projects", projects);
    };

    service.addComment = function(id, formData, callback){

      //...validation here

      formData.post_date = moment().format("YYYY-MM-DD HH:mm:ss");

      var projects = localStorageService.get("projects");
      if(!projects || projects.length <= id) return;

      projects[id].comments.push(formData);

      localStorageService.set("projects", projects);

      callback(projects[id]);
    };

    service.getTopProject = function(callback){
      if(localStorageService.get("project"))
        callback(localStorageService.get("project")[0]);
      else
        callback(null);
    };

    return service;
  });