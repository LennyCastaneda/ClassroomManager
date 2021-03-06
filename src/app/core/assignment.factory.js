(function() {
    'use strict';

    angular
        .module('app')
        .factory('assignmentFactory', assignmentFactory);

    assignmentFactory.$inject = ['$http', '$q', 'assignmentUrl'];

    /* @ngInject */
    function assignmentFactory($http, $q, assignmentUrl) {
        var service = {
            addAssignment: addAssignment,
            getAssignmentCount: getAssignmentCount
        };

        return service;

        function addAssignment(student, project) {
            var assignment = {
                studentId: student.studentId,
                projectId: project.projectId
            }

            var defer = $q.defer();

            $http({
                method: 'POST',
                url: assignmentUrl,
                headers: {
                  'Accept': 'application/json'
                },
                data: angular.toJson(assignment)
            }).then(
                function(res) {
                    // returns added assignment
                    var assignment = angular.fromJson(res.data);
                    defer.resolve(assignment);
                }, function(res) {
                    defer.reject(res);
                }
            );
            return defer.promise;
        }

        function getAssignmentCount() {
            return $http({
                method: 'GET',
                url: assignmentUrl + '/count',
                headers: {
                  'Accept': 'application/json'
                }
            }).then(
                function(res) {
                    return res.data;
                }, function(res) {
                    return res.statusText;
                }
            );
        }
    }
})();
