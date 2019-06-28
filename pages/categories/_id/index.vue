<template>
  <div class="contents">
    <h1 v-if="isSelectedCategory">{{ category.name }}カテゴリの一覧</h1>
    <ul class="container">
      <li v-for="app in apps" :key="app.id" class="app-container">
        <router-link :to="{ name: 'apps-id', params: { id: app.id }}" tag="a">
          <div class="container">
            <img :src="baseUrl + app.iconImage.url" class="app-icon"/>
            <div class="app-summary">
              <p class="app-summary-title">{{ app.name }}</p>
              <p class="app-summary-description">{{ app.description }}</p>
            </div>
          </div>
          <div class="app-summary-thumbnail">
            <img :src="baseUrl + app.emptystates[0].screenshots[0].image.url" class="dispray-thumbnail"/>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<style>
h1 {
  margin: 0 0 60px 30px;
  font-family: Ubuntu, 'Kosugi Maru', sans-serif;
  font-size: 24px;
  font-weight: bold;
}
</style>


<script>
import Strapi from 'strapi-sdk-javascript/build/main'
const apiUrl = process.env.API_URL || 'http://localhost:1337'
const strapi = new Strapi(apiUrl)
export default {
  data() {
    return {
      query: '',
      baseUrl: apiUrl
    }
  },
  methods: {
    handleScroll: function(evt, el) {
      if (window.scrollY > 0) {
        el.setAttribute(
          "style",
          "opacity: 1; transform: translate3d(0, -10px, 0)"
        );
      }
      return window.scrollY > 100;
    }
  },
  computed: {
    isSelectedCategory() {
      return (this.$store.getters['apps/category'] != null)
    },
    apps() {
      return this.$store.getters['apps/list']
    },
    category() {
      return this.$store.getters['apps/category']
    }
  },
  async fetch ({ store, params }) {
    store.commit('apps/resetCategory')
    store.commit('apps/emptyList')
    const response = await strapi.request('post', '/graphql', {
      data: {
        query: `query {
            category(id: "${params.id}") {
                name
                id
                apps {
                id
                name
                description
                iconImage {
                    url
                }
                emptystates {
                    id
                    version
                    isCurrent
                    screenshots {
                        id
                        name
                        image {
                            url
                            name
                            }
                        }
                    }
                }
            }
          }`
      }
    })
    let category = response.data.category
    store.commit('apps/setCategory', {
        id: category.id,
        ...category
      })
    category.apps.forEach(app => {
      store.commit('apps/add', {
        id: app.id,
        ...app
      })
    })
  }
}

</script>