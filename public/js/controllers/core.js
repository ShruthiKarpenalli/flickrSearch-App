// JavaScript source code
var flickrSearchApp = angular.module('flickrSearchApp', ['ngRoute',
'flickrPhotoServices', 'chieffancypants.loadingBar','ngAnimate']);
flickrSearchApp.config(function(cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeSpinner = true;
  })

flickrSearchApp.controller('flickrSearchController',['$scope','FeedList','cfpLoadingBar', function ($scope,FeedList,cfpLoadingBar) {
    $scope.searchBy = '';
        $scope.getPhotos = function(searchedBy){
        $scope.start();
        FeedList.getFeeds(searchedBy).then(function (response) {
            $scope.feeds =  response.items;
            $scope.complete();
        }, function (error) {
            $scope.complete();
            $scope.errorMessage = 'Unable to load customer data: ' + error.message;
        });
    }

    $scope.start = function() {
        cfpLoadingBar.start();
      };
  
      $scope.complete = function () {
        cfpLoadingBar.complete();
      }
    
    
}]);
