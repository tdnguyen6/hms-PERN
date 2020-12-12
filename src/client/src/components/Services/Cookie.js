export const getCookieValue = (cname) => {
    let b = document.cookie.match('(^|;)\\s*' + cname + '\\s*=\\s*([^;]+)');
    return b ? b.pop() : '';
}

export function delCookie(name) {
    document.cookie = name + '=; expires = Thu, 01 Jan 1970 00:00:00 GMT;';
}

export const $ = (s) => s[0] === '#' ? document.querySelector(s) : document.querySelectorAll(s);