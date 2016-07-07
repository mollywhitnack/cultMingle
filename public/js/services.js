'use strict';

var app = angular.module('myApp');


/*app.service('Users', function($http, $rootScope, $cookies, $state, $q, TOKENNAME){
  this.getAll = () =>{
    return $http.get('/api/users');
  }
})*/

app.service('User', function($http, $q) {

  this.profile = () => {
    return $http.get('/api/users/profile')
      .then(res => {
        return $q.resolve(res.data);
      });
  };

  this.getAll = () =>{
    return $http.get('/api/users');
  }

  this.updateProfile = (profileObj) =>{
    console.log("in update prof");
    return $http.put('api/users/profile', profileObj)
    .then(res => {
        console.log("res.data in update:", res.data)
        console.log("profileObj:", profileObj);
        return $q.resolve(res.data);
    })
    .catch(err =>{
      console.log("err:", err);
    });
  }

});
