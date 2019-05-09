"use strict";
function PropertyDecorator(userid, username) {
    return function (target) {
        target.userid = 987654;
        target.username = "aop Demo";
    };
}
//# sourceMappingURL=_aopuser.js.map