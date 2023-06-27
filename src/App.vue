<template>
  <div id="app">
    <NavBar />
    <router-view />
  </div>
</template>
<script>
import NavBar from "@/views/NavBar.vue"
  export default{
    components:{
      NavBar
    }
  }
</script>
<style>
body {
    font-family: tahoma;
    background: rgb(211,211,211);
    color: #282828;
    margin: 0px;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
}
.active{
  background-color: rgba(2, 2, 87, 0.801);
  color: white;
}
.page-item{
  box-shadow: 5px 0.5px 5px #888888;
}
a{outline:none;}
</style>
