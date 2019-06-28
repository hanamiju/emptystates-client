export const state = () => ({
    list: [],
    category: null
})
  
export const mutations = {
    add(state, app) {
      state.list.push(app)
    },
    emptyList(state) {
      state.list = []
    },
    resetCategory(state) {
      state.category = null
    },
    setCategory(state, category) {
      state.category = category
    }
}
  
export const getters = {
    list: state => {
      return state.list
    },
    category: state => {
      return state.category
    }
}

