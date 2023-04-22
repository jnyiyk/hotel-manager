export default {
    namespaced: true,
    state: {
        colors: [
            {
                name: '黄色主题',
                color: '#ddc871'
            },
            {
                name: '红色主题',
                color: '#f34718'
            },
            {
                name: '绿色主题',
                color: '#207f4c'
            },

            {
                name: '蓝色主题',
                color: '#2486b9'
            }
        ],
        currentThemeColor: {
            name: '蓝色主题',
            color: '#2486b9'
        }
    },
    getters: {
        //返回主题颜色的名字数组
        getColorNames(state) {
            return state.colors.map(r => r.name)
        }
    },
    mutations: {
        updateCurrentThemeColor(state, val) {
            state.currentThemeColor = val
        }
    },
    actions: {
        updateCurrentThemeColor(state, val) {
            state.commit('updateCurrentThemeColor', val)
        }

    },
    modules: {}


}