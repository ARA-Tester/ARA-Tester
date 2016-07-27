exports.getHost = function() {
    return appHost ? appHost : window.location.host;
}