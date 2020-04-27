// use localStorage to store the authority info, which might be sent from server in actual project.
export function getAuthority() {
  return localStorage.getItem('antd-pro-authority') || 'admin';
}

export function setAuthority(authority) {
  return localStorage.setItem('antd-pro-authority', authority);
}
export function clearToken() {
  localStorage.removeItem('antd-username');
  return localStorage.removeItem('antd-pro-oauth2')
}
export function setUsername(usename) {
  localStorage.setItem('antd-username', usename);
}
export function getUsername() {
  return localStorage.getItem('antd-username');
}
export function setToken(token) {

  return localStorage.setItem('antd-pro-oauth2', token);
}
export function getToken() {

  return localStorage.getItem('antd-pro-oauth2');
}

export function isJSON(str) {
  if (typeof str === 'string') {
    try {
      JSON.parse(str);
      if(typeof JSON.parse(str) === 'number'){
        return false;
      }
      return true;
    } catch (e) {
      return false;
    }
  }
}

/**
 * 深拷贝函数
 * */
export  function deepCopy(obj, parent = null) {
  if(['boolean','string','number',].indexOf(typeof obj) > -1 || !obj){
    return obj;
  }
  let result;
  if (obj.constructor === Array) {
    result = [];
  } else {
    result = {};
  }
  let keys = Object.keys(obj),
    key = null,
    temp= null,
    _parent = parent;
  // 该字段有父级则需要追溯该字段的父级
  while (_parent) {
    // 如果该字段引用了它的父级则为循环引用
    if (_parent.originalParent === obj) {
      // 循环引用直接返回同级的新对象
      return _parent.currentParent;
    }
    _parent = _parent.parent;
  }
  for (let i = 0; i < keys.length; i++) {
    key = keys[i];
    temp= obj[key];
    // 如果字段的值也是一个对象
    if (temp && typeof temp=== 'object') {
      // 递归执行深拷贝 将同级的待拷贝对象与新对象传递给 parent 方便追溯循环引用
      result[key] = deepCopy(temp, {
        originalParent: obj,
        currentParent: result,
        parent: parent
      });

    } else {
      result[key] = temp;
    }
  }
  return result;
}
