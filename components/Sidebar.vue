<template>
  <aside>
      <div class="sidebar">
      <div class="logo">
          <router-link tag="a" to="/" exact>Empty States</router-link>
      </div>
    
    <ul class="sidebar-menu">
      <li>
        <p class="sidebar-subject">Categories</p>
        <ul>
            <li v-for="category in categories" :key="category.id" class="sideber-item">
                <div v-if="isSelected(category)" class="selected">
                    <router-link :to="{ name: 'categories-id', params: { id: category.id }}" tag="a">
                        {{ category.name }}
                    </router-link>
                </div>
                <div v-else>
                    <router-link :to="{ name: 'categories-id', params: { id: category.id }}" tag="a">
                        {{ category.name }}
                    </router-link>
                </div>
            </li>
        </ul>
      </li>
    </ul>
    </div>
  </aside>
</template>

<style>
aside {
    background-color: white;
    min-height: 100vh;
    width: 300px;
}
.sidebar {
    position: fixed;
    overflow: scroll;
    top: 0;
    bottom: 0;
    width: 300px;
    padding-left: 30px;
}
.logo {
    font-family: "Ubuntu", 'Noto Sans JP', "Helvetica Neue", Arial, sans-serif; /* 1 */
    font-size: 30px;
    font-weight: bold;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: normal;
    margin: 30px 0;
}
.logo a {
    color: #363636;
}
.sidebar-subject {
    font-family: Ubuntu;
    font-size: 20px;
    font-weight: bold;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: normal;
    color: #5c5c5c;
}
.sideber-item {
    font-family: Ubuntu;
    font-size: 18px;
    font-weight: 500;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: normal;
}
.sidebar-menu {
    margin: 50px 0;
}
.sidebar-menu ul {
    padding: 20px 0;
}
.sidebar-menu ul li {
    padding: 0.5em 0.75em;
    margin-left: 0.75em;
}
.sideber-item a {
    color: #888888;
    font-weight: 400;
}
.sideber-item .selected a {
    color: #000000;
    font-weight: 600;
}
</style>


<script>
import Strapi from 'strapi-sdk-javascript/build/main'
const apiUrl = process.env.API_URL || 'http://localhost:1337'
const strapi = new Strapi(apiUrl)
export default {
  computed: {
    categories() {
        return this.$store.getters['categories/list']
    }
  },
  methods: {
        isSelected: function(category) {
            if (this.$store.getters['apps/category'] == null) {
                return false
            }
            let id = this.$store.getters['apps/category'].id
            return (id == category.id)
        }
  },
  mounted() {
    this.$store.dispatch('categories/getCategories')  
  }
}

</script>