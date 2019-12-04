import {getValueByPath} from 'element-ui/src/utils/util'
import store from '../store'

//table sort all
export function orderBy(array, sortKey, reverse) {
  if (!sortKey) {
    return array;
  }
  if (typeof reverse === 'string') {
    reverse = reverse === 'descending' ? -1 : 1;
  } else {
    reverse = reverse && reverse < 0 ? -1 : 1;
  }
  var getKey = function (value, index) {
    if (sortKey !== '$key') {
      if (isObject(value) && '$value' in value) value = value.$value;
    }
    return [isObject(value) ? getValueByPath(value, sortKey) : value];
  };
  var compare = function compare(a, b) {
    for (var i = 0, len = a.key.length; i < len; i++) {
      if (a.key[i] < b.key[i]) {
        return -1;
      }
      if (a.key[i] > b.key[i]) {
        return 1;
      }
    }
    return 0;
  };
  return array.map(function (value, index) {
    return {
      value: value,
      index: index,
      key: getKey ? getKey(value, index) : null
    };
  }).sort(function (a, b) {
    var order = compare(a, b);
    if (!order) {
      // make stable https://en.wikipedia.org/wiki/Sorting_algorithm#Stability
      order = a.index - b.index;
    }
    return order * reverse;
  }).map(function (item) {
    return item.value;
  });
}

export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}';
  let date;
  if (typeof time === 'object') {
    date = time
  } else {
    if (('' + time).length === 10) time = parseInt(time) * 1000;
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  };
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key];
    if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1];
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  });
  return time_str
}

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

var isObject = function isObject(obj) {
  return obj !== null && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object';
};

/**

 * @author Rui.Zhang

 * @description 生成uuid, 该函数已扩展至Mtils对象中

 * @param {int} [len]   可选,生成uuid的长度,默认36位,建议20位以上

 * @param {int} [radix]   可选,生成的进制基数，8是8进制,10是10进制等等

 * @returns {String}, 生成的UUID

 **/

export function getUUID(len, radix) {

  var uuid;

  var chars, i, r, uuid;

  chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');

  uuid = [];

  i = void 0;

  radix = radix || chars.length;

  if (len) {

    i = 0;

    while (i < len) {

      uuid[i] = chars[0 | Math.random() * radix];

      i++;

    }

  } else {

    r = void 0;

    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';

    uuid[14] = '4';

    i = 0;

    while (i < 36) {

      if (!uuid[i]) {

        r = 0 | Math.random() * 16;

        uuid[i] = chars[i === 19 ? r & 0x3 | 0x8 : r];

      }

      i++;

    }

  }

  return uuid.join('');

}

export function getUserInfo(userid) {
  let info = null;
  if (store.getters.userList && store.getters.userList.length > 0) {
    for (let user of store.getters.userList) {
      if (user._id === userid || user.userid === userid) {
        info = user;
        break
      }
    }
  }
  return info
}

export function getOrgInfo(orgid, data) {
  let list = store.getters.orgList;
  if (data) {
    list = data;
  }

  if (list && list.length > 0) {
    for (let org of list) {
      if (org._id === orgid) {
        return org
      } else if (org.orgs && org.orgs.length > 0) {
        var rst = getOrgInfo(orgid, org.orgs);

        if (rst) {
          return rst;
        }
      }
    }
  }
}

export function getOrgInfoByUserId(userid) {
  var orgs = {};
  let userinfo = getUserInfo(userid);
  orgs.centerNmae = "";
  orgs.centerId = "";
  orgs.groupNmae = "";
  orgs.groupId = "";
  orgs.teamNmae = "";
  orgs.teamId = "";
  if (userinfo) {
    orgs.centerNmae = userinfo.userinfo.centername;
    orgs.centerId = userinfo.userinfo.centerid;
    orgs.groupNmae = userinfo.userinfo.groupname;
    orgs.groupId = userinfo.userinfo.groupid;
    orgs.teamNmae = userinfo.userinfo.teamname;
    orgs.teamId = userinfo.userinfo.teamid;
  }
  return orgs;
}

export function getDictionaryInfo(code) {
  let info = null;

  if (store.getters.dictionaryList && store.getters.dictionaryList.length > 0) {
    for (let dictionary of store.getters.dictionaryList) {
      if (dictionary.code === code) {
        info = dictionary;
        break
      }
    }
  }
  return info
}

//获取数据状态
export function getStatus(status) {
  let info = null;

  if (status === '0') {
    info = '未开始'
  } else if (status === '2') {
    info = '进行中'
  } else if (status === '3') {
    info = '驳回'
  } else if (status === '4') {
    info = '正常结束'
  } else if (status === '5') {
    info = '进行中'
  } else if (status === '6') {
    info = '驳回'
  } else if (status === '7') {
    info = '正常结束'
  }
  return info
}

export function uploadUrl() {
  let url = process.env.UPLOAD_URL
  if(store.getters.fileToken){
    url = url.replace("{1}",store.getters.fileToken)
  }
  return url;
}

export function downLoadUrl(url) {
  let rst = process.env.DOWN_URL
  if(store.getters.fileToken){
    rst = rst.replace("{1}",store.getters.fileToken)
  }
  return rst + "&path=" + url;
}
