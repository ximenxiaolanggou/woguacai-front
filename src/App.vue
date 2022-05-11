<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
 #app {
   height: 100vh;
 }
 html,body {
   margin: 0px;
   padding: 0px;
   background-color: #eff1f4;
 }
 html {
   overflow: hidden;
 }
</style>
