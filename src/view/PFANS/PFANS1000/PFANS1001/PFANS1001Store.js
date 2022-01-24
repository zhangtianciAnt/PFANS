import {getBusiness,busdelete,getBusinessSearch} from '../PFANS1002/PFANS1002Api';
import {getJudgement,juddelete,getJudgementSearch} from '../PFANS1004/PFANS1004Api';
import {getpurchaseApply,purdelete,getpurchaseApplySearch} from '../PFANS1005/PFANS1005Api';
import {getLoanapplication,getLoanapplicationSearch} from '../PFANS1006/PFANS1006Api';
import {getCommunication,comdelete,getCommunicationSearch} from '../PFANS1010/PFANS1010Api';
import {getOffshore,getOffshoreSearch} from '../PFANS1011/PFANS1011Api';
import {change} from "../../PFANS1000/PFANS1001/PFANS1001Api";

const PFANS1001Store = {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {

    //获取列表
    getBusiness({commit}, data) {
      return new Promise((resolve, reject) => {
        getBusiness(data).then(response => {
          if (response.code === 0) {
            resolve(response.data);
          } else {
            reject(response.message)
          }
        }).catch(error => {
          reject(error);
        })
      })
    },

    //获取列表
    getJudgement({commit}, data) {
      return new Promise((resolve, reject) => {
        getJudgement(data).then(response => {
          if (response.code === 0) {
            resolve(response.data);
          } else {
            reject(response.message)
          }
        }).catch(error => {
          reject(error);
        })
      })
    },
    //获取列变
    getpurchaseApply() {
      return new Promise((resolve, reject) => {
        getpurchaseApply().then(response => {
          if (response.code === 0) {
            resolve(response.data);
          } else {
            reject(response.message)
          }
        }).catch(error => {
          reject(error);
        })
      })
    },

//获取列变
    getLoanapplication() {
      return new Promise((resolve, reject) => {
        getLoanapplication().then(response => {
          if (response.code === 0) {
            resolve(response.data);
          } else {
            reject(response.message)
          }
        }).catch(error => {
          reject(error);
        })
      })
    },

    //获取列变
    getCommunication() {
      return new Promise((resolve, reject) => {
        getCommunication().then(response => {
          if (response.code === 0) {
            resolve(response.data);
          } else {
            reject(response.message)
          }
        }).catch(error => {
          reject(error);
        })
      })
    },
    //获取列变
    getOffshore() {
      return new Promise((resolve, reject) => {
        getOffshore().then(response => {
          if (response.code === 0) {
            resolve(response.data);
          } else {
            reject(response.message)
          }
        }).catch(error => {
          reject(error);
        })
      })
    },
    change({commit}, data) {
      return new Promise((resolve, reject) => {
        change(data).then(response => {
          if (response.code === 0) {
            resolve(response.data);
          } else {
            reject(response.message);
          }
        }).catch(error => {
          reject(error);
        });
      });
    },

    //region scc add 千元以下费用决裁删除 from
    purdelete({commit}, data) {
      return new Promise((resolve, reject) => {
        purdelete(data).then(response => {
          if (response.code === 0) {
            resolve(response.data);
          } else {
            reject(response.message);
          }
        }).catch(error => {
          reject(error);
        });
      });
    },
    //endregion scc add 千元以下费用决裁删除 to

    //region scc add 交际费事前决裁删除 from
    comdelete({commit}, data) {
      return new Promise((resolve, reject) => {
        comdelete(data).then(response => {
          if (response.code === 0) {
            resolve(response.data);
          } else {
            reject(response.message);
          }
        }).catch(error => {
          reject(error);
        });
      });
    },
    //endregion scc add 交际费事前决裁删除 to

    //region scc add 交际费事前决裁删除 from
    busdelete({commit}, data) {
      return new Promise((resolve, reject) => {
        busdelete(data).then(response => {
          if (response.code === 0) {
            resolve(response.data);
          } else {
            reject(response.message);
          }
        }).catch(error => {
          reject(error);
        });
      });
    },
    //endregion scc add 交际费事前决裁删除 to

    //region scc add 其他业务决裁逻辑删除 from
    juddelete({commit}, data) {
      return new Promise((resolve, reject) => {
        juddelete(data).then(response => {
          if (response.code === 0) {
            resolve(response.data);
          } else {
            reject(response.message);
          }
        }).catch(error => {
          reject(error);
        });
      });
    },
    //endregion scc add 其他业务决裁逻辑删除 to

    //region   add  ml  220112  检索  from
    getJudgementSearch({commit}, data) {
      return new Promise((resolve, reject) => {
        getJudgementSearch(data).then(response => {
          if (response.code === 0) {
            resolve(response.data);
          } else {
            reject(response.message)
          }
        }).catch(error => {
          reject(error);
        })
      })
    },

    getpurchaseApplySearch({commit}, data) {
      return new Promise((resolve, reject) => {
        getpurchaseApplySearch(data).then(response => {
          if (response.code === 0) {
            resolve(response.data);
          } else {
            reject(response.message)
          }
        }).catch(error => {
          reject(error);
        })
      })
    },

    getLoanapplicationSearch({commit}, data) {
      return new Promise((resolve, reject) => {
        getLoanapplicationSearch(data).then(response => {
          if (response.code === 0) {
            resolve(response.data);
          } else {
            reject(response.message)
          }
        }).catch(error => {
          reject(error);
        })
      })
    },

    getBusinessSearch({commit}, data) {
      return new Promise((resolve, reject) => {
        getBusinessSearch(data).then(response => {
          if (response.code === 0) {
            resolve(response.data);
          } else {
            reject(response.message)
          }
        }).catch(error => {
          reject(error);
        })
      })
    },

    getCommunicationSearch({commit}, data) {
      return new Promise((resolve, reject) => {
        getCommunicationSearch(data).then(response => {
          if (response.code === 0) {
            resolve(response.data);
          } else {
            reject(response.message)
          }
        }).catch(error => {
          reject(error);
        })
      })
    },

    getOffshoreSearch({commit}, data) {
      return new Promise((resolve, reject) => {
        getOffshoreSearch(data).then(response => {
          if (response.code === 0) {
            resolve(response.data);
          } else {
            reject(response.message)
          }
        }).catch(error => {
          reject(error);
        })
      })
    },

    //endregion  add  ml  220112  检索  to
  }
}

export default PFANS1001Store;
