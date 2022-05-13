<template>
 <ul @click="jumpToGame(path)">
   <li><img :src="url"/></li>
   <li>{{name}}</li>
 </ul>
</template>

<script>
export default {
  name: "GameCard",
  data() {
    return {
    }
  },
  mounted() {
  },
  methods: {
    jumpToGame(path) {
      this.$router.push({path})
    }
  },
  props: {
    url: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    path: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped>

ul,li {
  margin: 0;
  padding: 0;
  list-style-type: none;
}

ul {
  overflow: hidden;
  border-radius: 15px;
  background-color: white;
  height: 300px;
  margin-bottom: 15px;
}

ul:hover {
  box-shadow: 3px 3px 3px 5px rgba(0,0,0,.4);
  margin-top: -10px;
  transition: all 0.5s;
}

ul li:first-child {

}

ul li:last-child {
  overflow: hidden;
  margin-top: 10px;
  text-align: center;
  font: 24px/1.5 Tahoma,Helvetica,Arial,'宋体',sans-serif;
  color: deepskyblue;
}

</style>