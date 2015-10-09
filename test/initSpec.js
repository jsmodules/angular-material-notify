/* global inject */
/* eslint strict: [2, "global"] */
/* eslint-env node,karma,jasmine */
"use strict";

describe("unit test", function() {

    var $notifyMd;

    beforeEach(module("notifyMd"));
    beforeEach(inject(function(_$notifyMd_) {
        $notifyMd = _$notifyMd_;
    }));

    it("should be a function", function() {
        expect(typeof $notifyMd).toBe("function");
    });

});
