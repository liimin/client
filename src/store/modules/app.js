/*
 * @Author: limin
 * @Date: 2018-06-25 10:29:04
 * @Last Modified by: limin
 * @Last Modified time: 2018-09-09 16:22:54
 */
const app = {
  state: {
    hotSearch:[{id:1,title:'hot1'},{id:2,title:'hot2'},{id:3,title:'hot3'}],
    history:[{id:1,title:'history1'},{id:2,title:'history2'},{id:3,title:'history3'}]
  },
  mutations: {
    ADD_HISTORY: (state, history) => {
      let storeHistory=state.history
      const has=storeHistory.some(item=>item.title===history.title)
      if(has){return}
      storeHistory.push(history)
    }
  },
  actions: {
    AddHistory: ({ commit }, history) => {
      commit('ADD_HISTORY', history)
    }
  },
  getters: {
    history: state => state.history,
    hotSearch:state=>state.hotSearch
  }
}
export default app
