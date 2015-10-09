angular.module("notifyMd", ["ngMaterial"]).service("$notifyMd", ["$q", "$window", "$mdToast", function($q, $window, $mdToast) {

    "use strict";

    var hidden;
    var visibilityChange;

    if (typeof $window.document.hidden !== "undefined") {
        hidden = "hidden";
        visibilityChange = "visibilitychange";
    } else if (typeof $window.document.mozHidden !== "undefined") {
        hidden = "mozHidden";
        visibilityChange = "mozvisibilitychange";
    } else if (typeof $window.document.msHidden !== "undefined") {
        hidden = "msHidden";
        visibilityChange = "msvisibilitychange";
    } else if (typeof $window.document.webkitHidden !== "undefined") {
        hidden = "webkitHidden";
        visibilityChange = "webkitvisibilitychange";
    }

    if ($window.Notification.permission !== "denied") {
        Notification.requestPermission();
    }

    return function(msg, options) {

        options = options || {};

        var deferred = $q.defer();
        var alternate = function(ev) {

            if (ev) {
                $window.document.removeEventListener(visibilityChange, this);
            }

            var toast = $mdToast.simple().content(msg);

            if (options.hideDelay) {
                toast.hideDelay(options.hideDelay);
            }

            if (options.action) {
                toast.action(options.action);
            }

            if (options.position) {
                toast.position(options.position);
            }

            $mdToast.show(toast).then(deferred.resolve);

        };

        // Use notifications if we can.
        if ("Notification" in $window) {
            if ($window.Notification.permission === "granted") {
                deferred.resolve(new $window.Notification(msg));
                return deferred.promise;
            }
        }

        // No notification? Check visibility if available. That will show
        // the message only when the page is visible.
        if (hidden && visibilityChange && $window.document[hidden]) {
            $window.document.addEventListener(visibilityChange, alternate);
        } else {
            alternate(null);
        }

        return deferred.promise;

    };

}]);
