<template>
  <div class="main-container">
    <Sidebar/>
    <nuxt/>
  </div>
</template>

<script>
import Sidebar from '~/components/Sidebar.vue'

export default {
  components: {
    Sidebar
  }
}
</script>
<style>
body {
  background-image: linear-gradient(
	-45deg,
	#E9EAEE 25%,
	#ffffff 25%,
	#ffffff 50%,
	#E9EAEE 50%,
	#E9EAEE 75%,
	#ffffff 75%,
  #ffffff);
  background-size: 3px 3px;
  background-attachment: fixed;
  
  font-family: 'Open Sans', 'Sawarabi+Gothic', sans-serif;
  height: 100%;
  min-height: 100vh;
}
.contents {
  margin: 60px 30px;
  width: calc(100% - 360px) ;
}
.app-icon {
  width: 70px;
  height: 70px;
  border-radius: 16px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  object-fit: cover;
  padding: 0;
  background-color: white;
}
.app-container {
  width: 280px;
  margin: 0 30px 60px 30px;
  /* opacity: 0;
  transition: 0.4s all cubic-bezier(0.39, 0.575, 0.565, 1); */
}

.main-container {
  margin: 0;
  display: flex;
  flex-wrap: wrap;
}

.container {
  margin: 0;
  display: flex;
  flex-wrap: wrap;
}

.app-summary-container {
  width: 280px;
  margin: 0 0 30px 0;
}

.app-summary {
  margin: 0 0 0 16px;
  width: 194px;
}
.dispray-thumbnail {
  width: 280px;
  padding: 0;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.2);
}
.app-summary-thumbnail {
  margin-top: 30px;
}
.app-summary-title {
  font-size: 20px;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #000000;
  margin: 0 4px 4px 0;
  letter-spacing: 0.03em;
}
.app-summary-description {
  font-size: 14px;
  font-weight: medium;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #606060;
  margin: 4px 0;
  letter-spacing: 0.03em;
  line-height: 1.2em;
}
hr {
    border-top: 1px dashed #cbcbcb;
    border-bottom: 1px dashed rgba(255, 255, 255, 0);
    margin: 4px 0;
}
</style>
