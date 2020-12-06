export const getCookieValue = (cname) => {
    var b = document.cookie.match('(^|;)\\s*' + cname + '\\s*=\\s*([^;]+)');
    return b ? b.pop() : '';
}

export const $ = (s) => s[0] === '#' ? document.querySelector(s) : document.querySelectorAll(s);