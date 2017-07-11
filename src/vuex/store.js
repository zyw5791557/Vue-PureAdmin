import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

// 创建 store 实例
export default new Vuex.Store({
    state: {
        count: 0
    },
    mutations: {
        intrement(state, payload) {
            // 变更状态
            state.count += payload.num
        }
    },
    actions: {
        intrement ({commit}, payload) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    commit('intrement', payload)
                    resolve()
                }, payload.time)
            })
        }
    }
})