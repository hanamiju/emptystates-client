import Strapi from 'strapi-sdk-javascript/build/main'
const apiUrl = process.env.API_URL || 'http://localhost:1337'
const strapi = new Strapi(apiUrl)

export const state = () => ({
    list: []
})
  
export const mutations = {
    add(state, app) {
      state.list.push(app)
    },
    emptyList(state) {
      state.list = []
    }
}
  
export const getters = {
    list: state => {
      return state.list
    }
}

export const actions = {
  async getCategories({ commit }) {
    const response = await strapi.request('post', '/graphql', {
      data: {
        query: `query {
            categories {
                id
                name
            }
          }`
      }
    })
    response.data.categories.forEach(category => {
      commit('add', {
        id: category.id,
        ...category
      })
    });
  }
}