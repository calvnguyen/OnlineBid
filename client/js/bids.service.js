'use strict';

myApp.factory('Bids', ['$resource',
    function ($resource) {
        return $resource('/api/bids/:Id',
            {Id: '@_id'},
            {
                update: {
                    method: 'PUT'
                }
            });
    }
]);
