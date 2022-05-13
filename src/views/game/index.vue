<template>
  <div>
    <div class="header"></div>
    <div class="main">
      <game-card v-for="(game, index) in games" :key="index" :url="game.url" :name="game.name" :path="game.path"/>
    </div>
  </div>
</template>

<script>
import GameCard from "@/views/game/component/GameCard";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Games",
  data() {
    return {
      games:[
        {url: require('@/assets/games/2048.png'), name: '2048', path: '/game/2048'},
        {url: require('@/assets/games/mofang.png'), name: '魔方',path: '/game/2048'},
        {url: require('@/assets/games/mofang.png'), name: '魔方',path: '/game/2048'},
        {url: require('@/assets/games/mofang.png'), name: '魔方',path: '/game/2048'},
        {url: require('@/assets/games/qieshuiguo.png'), name: '切水果',path: '/game/2048'},
        {url: require('@/assets/games/qieshuiguo.png'), name: '切水果',path: '/game/2048'},
        {url: require('@/assets/games/qieshuiguo.png'), name: '切水果',path: '/game/2048'},
        {url: require('@/assets/games/qieshuiguo.png'), name: '切水果',path: '/game/2048'}
      ]
    }
  },
  components: {
    GameCard
  }
}
</script>

<style scoped>
  .main {
    width: 1320px;
    display: flex;
    justify-content: space-between;
    margin: 100px auto;
    flex-wrap: wrap;
  }

</style>