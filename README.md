# NotifyMd Module

A light wrapper around HTML5 notification API and Angular Material's
`$mdToast` service. It shows notifications with the HTML5 notifications by
default, but falls back to use `$mdToast` if not available.

It also uses the HTML5 visibility API to only show notifications via `$mdToast`
if the window is visible, increasing the changes that the user will see the
message.


## Usage

Like `$mdToast` it returns a promise that resolves once the message
has been displayed.

```javascript

angular.module("myApp", ["ngMaterial", "notifyMd"]).controller("myCtrl", function("$notifyMd") {

    $notifyMd("Hello, world").then(function() {
        $notifyMd("The message was shown");
    });

});

```

## Contributions

Contributions are welcomed! Please follow the ESLint style and add tests
for all additions.
