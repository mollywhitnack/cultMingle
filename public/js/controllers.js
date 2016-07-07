'use strict';

var app = angular.module('myApp');

app.controller('mainCtrl', function($scope, $state, $auth) {
  console.log('mainCtrl!');

  $scope.isAuthenticated = () => $auth.isAuthenticated();

  $scope.logout = () => {
    $auth.logout();
    $state.go('home');
  };

  $scope.authenticate = provider => {
    $auth.authenticate(provider)
      .then(res => {
        $state.go('home');
      })
      .catch(err => {
        console.log('err:', err);
      })
  };
});


app.controller('loginCtrl', function($scope, $state, $auth) {
  console.log('loginCtrl!');

  $scope.login = () => {
      $auth.login($scope.user)
      .then(res =>{
        console.log("res: ", res);
        $state.go('profile');
      })
      .catch(err =>{
        console.log("err:", err);
      })
    };
});


app.controller('registerCtrl', function($scope, $state, $auth) {
  console.log('registerCtrl!');

  $scope.register = () => {
    if($scope.user.password !== $scope.user.password2){
      $scope.user.password = null;
      $scope.user.password2 = null;
      alert('Passwords must match!');
    }else{
      $auth.signup($scope.user)
      .then(res =>{
        console.log("res: ", res);
        $state.go('login');
      })
      .catch(err =>{
        console.log("err:", err);
      })
    }
  };
});


app.controller('feedCtrl', function($scope, $$state, User) {
  console.log('feedCtrl!');

  var userPromise = User.getAll();
  console.log("userPromise:", userPromise);
  userPromise.then(
    function(result) {
       console.log(result.data);
       $scope.userFeed = result.data;
    });
});

app.controller('profileCtrl', function($scope, Profile, $state, User) {
  console.log('profileCtrl!');
  console.log("user: ", User);
  $scope.user = Profile;

  console.log("user:", $scope.user );

  $scope.showPictureForm = () =>{
    console.log("show form");
    $scope.photoForm = true;
  }

  $scope.updatePicture = () => {
    $scope.photoForm = false;
    console.log("$state.current: ", $state.current);
    $scope.user.photoUrl = $scope.newItem.photoUrl;
    
    User.updateProfile($scope.newItem)
      .then(profile =>{
        console.log("profile:", profile);
      })
      .catch(err =>{
        console.log("err:", err);
      })
  $scope.newItem.photoUrl = '';
  }
     
    //npt right
    /*Profile.updateProfile($scope.newItem)
    .then(profile =>{
       console.log("profile:", profile);
    })
    .catch(err =>{
      console.log("err:", err);
    })
*/



  $scope.cancelPhotoUrl = () =>{
    $scope.photoForm = true;
    $scope.newItem.photoUrl = '';
  }

  //education
  $scope.showEducationForm = () =>{
    console.log("show form");
    $scope.educationForm = true;
  }

  $scope.updateEducation = () => {
    $scope.educationForm = false;
    $scope.user.education = $scope.newItem.education;
    $scope.newItem.education = '';
  }

  $scope.cancelEducation = () =>{
    $scope.educationForm = true;
    $scope.newItem.education = '';
  }

  //about
  $scope.showAboutForm = () =>{
    console.log("show form");
    $scope.aboutForm = true;
  }

  $scope.updateAbout = () => {
    $scope.aboutForm = false;
    $scope.user.about = $scope.newItem.about;
    $scope.newItem.about = '';
  }

  $scope.cancelAbout = () =>{
    $scope.aboutForm = true;
    $scope.newItem.about = '';
  }


});

