
myApp.controller('AuthController', ['$scope', '$location', '$http', function($scope, $location, $http) {
    $scope.auth_info = {user_name: ''};
    $scope.user = null;

    $scope.login = function(){
        $http.post('/api/login', $scope.auth_info).then(
            function(res){
                console.log(res);
                $scope.user = res.data;
                $location.url('/bids');
            },
            function(err){
                console.log(err);
            }
        )

    }
}]);