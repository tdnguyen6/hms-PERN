exports.getCookieValue = (cname) => {
    var b = document.cookie.match('(^|;)\\s*' + cname + '\\s*=\\s*([^;]+)');
    return b ? b.pop() : '';
}