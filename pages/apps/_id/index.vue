<template>
    <div class="contents">
        <div class="container">
            <div class="emptystate-column-main">
                <div class="iphone-frame-img">
                    <img src="~/assets/phone_frame_back.png" alt="" class="image-frame">
                    <img :src="baseUrl + selectedScreenshot.image.url" class="screenshot-selected"/>
                    <img src="~/assets/phone_frame_front.png" alt="" class="image-frame">
                </div>
                <p class="emptystate-title-center">{{ selectedScreenshot.name }}</p>
            </div>
            <div class="emptystate-column-inspector">
                <div class="container app-summary-container">
                    <img :src="baseUrl + app.platforms[0].iconImage.url" class="app-icon"/>
                    <div class="app-summary">
                        <h1 class="app-summary-title">{{ app.name }}</h1>
                        <p class="app-summary-description">{{ app.description }}</p>
                    </div>
                </div>
                <ul class="app-info">
                    <li class="container">
                        <p class="subject">App Version: </p>
                        <p class="content">v{{ emptystate.name }}</p>
                    </li>
                    <li class="container">
                        <p class="subject">Category: </p>
                        <router-link :to="{ name: 'categories-id', params: { id: app.category.id }}" tag="a" class="content">
                            {{ app.category.name }}
                        </router-link>
                    </li>
                </ul>
                <hr>
                <div class="more-patterns-container">
                    <h2>More Patterns</h2>
                    <ul class="container">
                        <li v-for="screenshot in screenshots" :key="screenshot.id" @click="select(screenshot)">
                            <div class="emptystates-thumbnail-small">
                                <p class="emptystate-title">{{ screenshot.name }}</p>
                                <img :src="baseUrl + screenshot.image.url"/>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.emptystates-thumbnail-small {
    width: 130px;
    margin: 20px 5px 10px 5px;
    cursor: pointer;
    cursor: hand;
}
.emptystate-column-inspector {
    margin: 30px auto 30px 0;
    padding: 0 30px;
}

.iphone-frame-img {
    width: 320px;
    height: 640px;
    position: relative;
}
.image-frame {
    position: absolute;
    margin: 0;
}
.screenshot-selected {
    width: 262px;
    height: 568px;
    position: absolute;
    margin: 37px 29px;
}
.emptystate-column-main {
    padding: 0 30px;
    margin: 0px auto;
    position: sticky;
    top: 60px;
    height: 680px;
}
.app-info li {
    margin-bottom: 20px;
}
.emptystate-column-inspector .subject {
    font-size: 16px;
    font-weight: 500;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: normal;
    color: #979797;
    margin-right: 20px;
}
.emptystate-column-inspector .content {
    font-size: 16px;
    font-weight: 500;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: normal;
    color: #000000;
}
.emptystate-column-main .container {
    align-items: center;
}
.more-patterns-container {
    margin: 20px 0;
    width: 280px;
}
.emptystate-title-center {
  text-align: center;
  margin-top: 10px;
  font-size: 18px;
  font-weight: 600;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #979797;
}
.emptystate-title {
  margin: 10px 0;
  font-size: 14px;
  font-weight: 600;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #979797;
}
.more-patterns-container h2 {
    font-size: 22px;
    font-weight: bold;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: normal;
    color: #000000;
}

@media screen and (max-width: 1079px) { 
    .emptystate-column-main {
        padding: 0 30px;
        margin: 0px auto;
        position: relative;
        top: auto;
        height: 680px;
    }
    .emptystate-column-inspector {
        margin: 80px auto;
        padding: 0 30px;
    }
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
  computed: {
    id() {
        return this.$route.params.id
    },
    emptystate() {
        return this.$store.getters['emptystates/emptystate']
    },
    screenshots() {
        return this.$store.getters['emptystates/screenshots']
    },
    selectedScreenshot() {
        return this.$store.getters['emptystates/selectedScreenshot']
    },
    app() {
        return this.$store.getters['emptystates/app']
    }
  },
  methods: {
        select: function(screenshot) {
            this.$store.commit('emptystates/selectScreenshot', {
                id: screenshot.id,
                ...screenshot
            })
        }
  },
  async fetch({ store, params }) {
    store.commit('emptystates/emptyList')
    const response = await strapi.request('post', '/graphql', {
      data: {
        query: `query {
            app(id: "${params.id}") {
              id
              name
              description
              category {
                id
                name
              }
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
                  isCurrent
                }
              }
            }
          }
          `
      }
    })
    store.commit('emptystates/setApp', response.data.app)
    response.data.app.platforms[0].versions.forEach(version => {
                console.log('hello!!!')
        if (version.isCurrent) {
            store.commit('emptystates/setEmptyState', {
                id: version.id,
                ...version
            })
            if (version.emptystates[0] != null) {
                store.commit('emptystates/selectScreenshot', {
                    id: version.emptystates[0].id,
                    ...version.emptystates[0]
                })
            }
            version.emptystates.forEach(emptystate => {
                store.commit('emptystates/addScreenshot', {
                    id: emptystate.id,
                    ...emptystate
                })
            })
        }
    })
  }
}
</script>