/**
 * Created by dschnelzer on 3/6/14.
 */
var module = angular.module('flickrPhotoServices', []);

console.log("loading blog_services.js ...");

module.factory('FeedLoader', function ($http,$q) {
    // console.log("Creating FeedLoader...");
    // return $resource('http://ajax.googleapis.com/ajax/services/feed/load', {}, {
    //     fetch: { method: 'JSONP', params: {v: '1.0', callback: 'JSON_CALLBACK'} }
    // });

        return {
          fetch : function(searchField){

            var deferred = $q.defer();
            $http.jsonp("http://api.flickr.com/services/feeds/photos_public.gne?tags="+searchField+"&format=json&jsoncallback=JSON_CALLBACK")
            .success(function(data) {
                    deferred.resolve(data);
                    console.log("Success")
            }).error(deferred.reject);
            return deferred.promise;

            }
        };

});

module.service('FeedList', function ($rootScope, FeedLoader) {
    var feeds = [];
    console.log("loading feeds...");
    this.getFeeds = function(searchedBy) {
             feeds = FeedLoader.fetch(searchedBy);
            if(feeds.items){
                feeds = feeds.items;
            }
         
        
        return feeds;
    };
});