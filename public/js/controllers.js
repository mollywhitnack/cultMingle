'use strict';

var app = angular.module('myApp');

app.controller('mainCtrl', function($scope, $state, $auth, $rootScope) {
  console.log('mainCtrl!');

  $rootScope.currentUser;

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


app.controller('loginCtrl', function($scope, $state, $auth, $rootScope) {
  console.log('loginCtrl!');

  $scope.login = () => {
      $auth.login($scope.user)
      .then(res =>{
        console.log("res: ", res);
        //$rootScope.currentUser = res.data;
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

app.controller('feedCtrl', function($scope, $$state, $state, User) {
  console.log('feedCtrl!');

  var userPromise = User.getAll();
  console.log("userPromise:", userPromise);
  userPromise.then(
    function(result) {
       console.log(result.data);
       $scope.userFeed = result.data;
    });



});

app.controller('profileCtrl', function($scope, Profile, ProfileByID, $state, User, $rootScope) {
  console.log('profileCtrl!');

  $rootScope.currentUser = Profile;

  $scope.user = ProfileByID || Profile;

  console.log("user:", $scope.user );
  console.log("curruser:", $rootScope.currentUser );

  $scope.showdisplayNameForm = () =>{
    console.log("show form");
    $scope.displayNameForm = true;
  }

  $scope.updatedisplayName = () => {
    $scope.displayNameForm = false;
    $scope.user.displayName = $scope.newItem.displayName;
    User.updateProfile($scope.user._id, $scope.newItem)
      .then(profile =>{
        console.log("profile:", profile);
        $scope.newItem.displayName = '';
      })
      .catch(err =>{
        console.log("err:", err);
      })
  }

  $scope.canceldisplayName = () =>{
    $scope.usernameForm = true;
    $scope.newItem.displayName = '';
  }

//photo
  $scope.showPictureForm = () =>{
    console.log("show form");
    $scope.photoForm = true;
  }

  $scope.updatePicture = () => {
    $scope.photoForm = false;
    console.log("$state.current: ", $state.current);
    $scope.user.profileImage = $scope.newItem.profileImage;
    console.log("$scope.newItem:", $scope.newItem);
    User.updateProfile($scope.user._id, $scope.newItem)
      .then(profile =>{
        console.log("profile:", profile);
        $scope.newItem.profileImage = '';
      })
      .catch(err =>{
        console.log("err:", err);
      })
  }

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
    User.updateProfile($scope.user._id, $scope.newItem)
      .then(profile =>{
        console.log("profile:", profile);
        $scope.newItem.education = '';
      })
      .catch(err =>{
        console.log("err:", err);
      })
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
    User.updateProfile($scope.user._id, $scope.newItem)
      .then(profile =>{
        console.log("profile:", profile);
        $scope.newItem.about = '';
      })
      .catch(err =>{
        console.log("err:", err);
      })
  }

  $scope.cancelAbout = () =>{
    $scope.aboutForm = true;
    $scope.newItem.about = '';
  }

  $scope.deleteAccount = (user) =>{
    //add swal
    console.log(user._id);
    User.deleteAccount(user._id)
      .then()
      .catch(err =>{
        console.log("err: ", err);
      });
  }


});

