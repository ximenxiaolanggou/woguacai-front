<template>
  <div class="iot-card" v-bind:class="{ marginTop20: iot.seq > 4, marginRight26: iot.seq % 4 != 0}">
    <div class="iot-card-header">
      <img :src="iotUrl" alt="" class="iot-card-img">
      <span style="margin-left: 50px">SN：{{iot.sn}}</span>
    </div>
    {{LedValue}}
    <div class="iot-card-main">
      <div :class="{'iot-card-main-stat-offline': iot.online == 0 ,  'iot-card-main-stat-online':iot.online == 1}"></div>
      <div style="margin-left: 20px">{{iot.online == 0 ? '离线' : '在线'}}</div>
      <div>
        <el-switch
            v-model="LedValue"
            active-color="#13ce66"
            @change="openOrCloseHandle"
            inactive-color="#ff4949">
        </el-switch>
         <span >
        :开关灯
      </span>
      </div>
    </div>
    <div class="iot-card-operation">
      <div><el-button type="text" icon="el-icon-edit" @click="updateIot"></el-button></div>
      <div><el-button type="text" icon="el-icon-share"></el-button></div>
      <div><el-button type="text" icon="el-icon-delete"></el-button></div>
      <div><el-button type="text" icon="el-icon-more"></el-button></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "IotCard",
  data() {
    return {
      iotUrl: require('@/assets/iot/iot.svg'),
      LedValue: false
    }
  },
  props: {
    iot: {
      type: Object,
      default: {}
    }
  },
  methods: {
    updateIot() {
      this.$emit("updateIot",this.iot);
    },
    openOrCloseHandle() {
      this.$emit("openOrCloseHandle",{id:this.iot.id,ledValue: this.LedValue});
    }
  }
}
</script>

<style scoped>
.iot-card {
  width: 400px;
  height: 250px;
  background-color: white;
}
.iot-card-header {
  height: 100px;
}
.iot-card-img {
  height: 100px;
 vertical-align: middle
}
.iot-card-main {
  margin-top: 50px;
  height: 50px;
  position: relative;
}
.iot-card-main-stat-online {
  position: absolute;
  top: 6px;
  left: 10px;
  width: 6px;
  height: 6px;
  background-color: lawngreen;
  border-radius: 50%;
}

.iot-card-main-stat-offline {
  position: absolute;
  top: 6px;
  left: 10px;
  width: 6px;
  height: 6px;
  background-color: red;
  border-radius: 50%;
}
.iot-card-operation {
  height: 50px;
  width: 100%;
  background-color: #dddddd;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.iot-card-operation div {
  width: 60px;
  text-align: center;
}
.marginTop20 {
  margin-top: 20px;
}
.marginRight26 {
  margin-right: 26px;
}
</style>
