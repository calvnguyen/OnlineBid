
myApp.controller('BidsController', ['$scope', '$location', '$filter', '$http', 'Bids', function($scope, $location, $filter, $http, Bids) {

    $scope.prods = [];
    $scope.bidError = {};
    $scope.prevBids = [];
    $scope.users = [];
    $scope.query = [];

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
                console.log(res);
                $scope.prevBids = res;
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

    $scope.submit_bid = function(prodItem){
        var filterPrevBids = $filter('filter')($scope.prevBids, {prod_id: prodItem._id});
        var is_present = false;
        for (var i=0; i<filterPrevBids.length; i++){
            if (prodItem.amount <= filterPrevBids[i].amount){
                $scope.bidError[prodItem._id] = 'Bid amount should be higher than the previous bid.';
                return;
            }
            if (filterPrevBids[i].user_id == $scope.user._id){
                is_present = filterPrevBids[i];
            }
        }
        $scope.bidError[prodItem._id] = '';
        if (!is_present){
            var newBid = {
                prod_id: prodItem._id,
                user_id: $scope.user._id,
                amount: prodItem.amount
            };
            Bids.save(newBid,
                function(res){
                    console.log(res);
                    get_users();
                },
                function(err){
                    console.log(err);
                }
            )
        }
        else {
            var updateBid = angular.copy(is_present);
            updateBid.amount = prodItem.amount;
            Bids.update(updateBid,
                function(res){
                    get_users();
                },
                function(err){
                    console.log(err);
                }
            )
        }
    };

    $scope.end_bid = function(){
        for (var i=0; i<$scope.prods.length; i++){
            if (!$filter('filter')($scope.prevBids, {prod_id: $scope.prods[i]._id}).length){
                $('#myModal').modal('show');
                return;
            }
        }
/*
        if ($scope.prevBids.length < $scope.users.length * $scope.prods.length){
            $('#myModal').modal('show');
            return;
        }
*/
        $location.url('/result');
    };

    $scope.filter_by_query = function(prodItem){
        var query = $scope.query[prodItem._id];
        return $filter('filter')($scope.prevBids, function(obj){
            if (obj.prod_id != prodItem._id)
                return false;
            if (!query)
                return true;
            var user_name = ($filter('filter')($scope.users, {_id: obj.user_id})[0]).user_name;
            var amount = obj.amount + '';
            return user_name.indexOf(query)>-1 || amount.indexOf(query)>-1;
        })
    }

}]);

