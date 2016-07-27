exports = function() {
    return appHost ? appHost : window.location.host;
}