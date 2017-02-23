
myApp.controller('ResultController', ['$scope', '$location', '$filter', '$http', 'Bids', function($scope, $location, $filter, $http, Bids) {
    $scope.prods = [];
    $scope.prevBids = [];
    $scope.users = [];
    $scope.highItems = {};

    var get_users = function(){
        $http.get('/api/get-users').then(
            function(res){
                $scope.users = res.data;
                get_prev_bids();
            },
            function(err){
                console.log(err);
            }
        );
    };

    var get_prev_bids = function(){
        Bids.query({},
            function(res){
                $scope.prevBids = res;
                var highItems = {};
                for (var i=0; i<$scope.prevBids.length; i++){
                    var bidItem = $scope.prevBids[i];
                    if (!highItems[bidItem.prod_id]){
                        highItems[bidItem.prod_id] = bidItem;
                    }
                    else if(highItems[bidItem.prod_id].amount < bidItem.amount){
                        highItems[bidItem.prod_id] = bidItem;
                    }
                }
                $scope.highItems = highItems;
            },
            function(err){
                console.log(err);
            }
        )
    };

    var get_prods = function(){
        $http.get('/prods.json').then(function(res){
            $scope.prods = res.data;

            get_users();
        })
    };

    $scope.init = function(){
        if (!$scope.user)
            return $location.url('/');
        get_prods();
    };

    $scope.start_bid = function(){
        Bids.remove({user_id: $scope.user._id},
            function(res){
                $location.url('/bids');
            },
            function(err){
                console.log(err);
            }
        )
    }
}]);