<template>
  <div class="contents">
    <ul class="container">
      <li v-for="app in apps" :key="app.id" class="app-container">
        <router-link :to="{ name: 'apps-id', params: { id: app.id }}" tag="a">
          <div class="container">
            <img :src="baseUrl + app.platforms[0].iconImage.url" class="app-icon"/>
            <div class="app-summary">
              <p class="app-summary-title">{{ app.name }}</p>
              <p class="app-summary-description">{{ app.description }}</p>
            </div>
          </div>
          <div class="app-summary-thumbnail">
            <img :src="baseUrl + app.platforms[0].versions[0].emptystates[0].image.url" class="dispray-thumbnail"/>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

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
    apps() {
      return this.$store.getters['apps/list']
    }
  },
  async fetch({ store }) {
    store.commit('apps/emptyList')
    store.commit('apps/resetCategory')
    const response = await strapi.request('post', '/graphql', {
      data: {
        query: `query {
            apps {
              id
              name
              description
              platforms {
                id
                iconImage {
                  url
                }
                versions {
                  emptystates {
                    id
                    image {
                      url
                    }
                    name
                  }
                  name
                }
                storeUrl
              }
              category {
                id
                name
              }
            }
          }`
      }
    })
    response.data.apps.forEach(app => {
      store.commit('apps/add', {
        id: app.id,
        ...app
      })
    })
  }
}

</script>