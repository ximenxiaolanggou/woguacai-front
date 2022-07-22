<template>
  <div>
    <!-- 温度 -->
    <temp
      :tempData="tempData"
    />
  </div>
</template>

<script>
import Temp from "@/views/home/component/Temp";
import {mapGetters} from "vuex";
export default {
  name: 'App',
  components: {Temp},
  data() {
    return {
      tempData:[],
      wsUrl: process.env.VUE_APP_WS_BASE_API + '/' + 1, // ws地址
      websock: null, // ws实例
    }
  },
  computed: {
    ...mapGetters(['isCollapse','user'])
  },
  mounted() {
    this.initWebSocket();
  },
  methods:{
    // 初始化weosocket
    initWebSocket() {
      if (typeof WebSocket === 'undefined')
        return console.log('您的浏览器不支持websocket')
      this.websock = new WebSocket(this.wsUrl)
      this.websock.onmessage = this.websocketonmessage
      this.websock.onopen = this.websocketonopen
      this.websock.onerror = this.websocketonerror
      this.websock.onclose = this.websocketclose
    },
    websocketonopen() {
      // 连接建立之后执行send方法发送数据
      let actions = { type: 1, sn: 'stm32' }
      this.websocketsend(JSON.stringify(actions))
    },
    websocketonerror() {
      // 连接建立失败重连
      this.initWebSocket()
    },
    websocketonmessage(e) {
      // 数据接收
      const redata = JSON.parse(e.data)
      if(redata.first) {
        this.tempData = redata.data
      }else{
        if(this.tempData.length >= 30) {
          this.tempData.shift();
        }
        this.tempData.push(redata.data)
      }
      console.log('接收的数据', redata)
    },
    websocketsend(Data) {
      // 数据发送
      this.websock.send(Data)
    },
    websocketclose(e) {
      // 关闭
      console.log('断开连接', e)
    },
  }
}
</script>
