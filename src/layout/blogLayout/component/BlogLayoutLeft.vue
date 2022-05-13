<template>
  <div class="left-main">
    <div class="left-main-top">
      <div class="avator">
        <el-avatar :size="125" src="https://avatars.githubusercontent.com/u/49423124?s…00&u=a89b1cd06a572f990a268e49a17d29848353635b&v=4"></el-avatar>
      </div>
      <div class="username">damoncai</div>
      <div class="games" @click="$router.push('/game')">Games</div>
    </div>
    <div class="left-main-middle"></div>
    <div class="left-main-bottom"></div>
  </div>
</template>

<script>
export default {
  name: "BlogLayoutLeft"
}
</script>

<style scoped>
  .left-main {
    display: flex;
    flex-direction: column;
  }
  .left-main-top {
    position: fixed;
    left: 150px;
    top: 100px;
    text-align: center;
    display: flex;
    flex-direction: column;
    height: 400px;
  }
  .avator {
    margin-top: 100px;
  }
  .username {
    font-size: 24px;
    color: #ffdace;
    margin-top: 20px;
  }
  .games {
    margin-top: 20px;
    font-size: 16px;
    cursor: pointer;
    color: #ffdace;
  }
  .games:hover {
    color: #409EFF;
  }
  .left-main-middle {
    height: 200px;
    text-align: center;
  }
  .left-main-bottom {
    height: 200px;
  }

</style>