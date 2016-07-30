exports.getHost = function() {
    return global.appHost ? global.appHost : window.location.host;
}