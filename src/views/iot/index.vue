<template>
  <div>
    <div class="head common-search">
      <common-search-head
          @searchKeyChangeHandle="searchKeyChangeHandle"
          @searchHandle="searchHandle"
          @addHandle="addHandle"
      />
    </div>

    <!-- IOT -->
    <!-- background-color: white; padding:20px;height: 200px; -->
    <div class="main" style="">
      <iot-card
          v-for="(iot, index) in iots"
          :iot="iot"
          :key="index"
          @updateIot="updateIot"
      />
    </div>

    <!-- IOT添加模态框 -->
    <iot-add
        v-if="addVisible"
        :protocolTypes = "protocolTypes"
        :dialogFormVisible="addVisible"
        @submitSuccessHandle="addSubmitSuccessHandle"
        @cancelHandle="addCancelHandle"
    />

    <!-- IOT修改模态框 -->
    <iot-update
        v-if="updateVisible"
        :iot="selectedIot"
        :protocolTypes = "protocolTypes"
        :dialogFormVisible="updateVisible"
        @submitSuccessHandle="updateSubmitSuccessHandle"
        @cancelHandle="updateCancelHandle"
    />
  </div>
</template>

<script>
import {list as iotList} from "@/api/iot/iot";
import IotCard from "@/views/iot/comonent/IotCard";
import CommonSearchHead from "@/components/CommonSearchHead";
import IotAdd from "@/views/iot/comonent/IotAdd";
import IotUpdate from "@/views/iot/comonent/IotUpdate";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "iot",
  data() {
    return {
      iots: [],
      protocolTypes: [
        {label: 'MQTT Borker', value: 1},
        {label: 'TCP', value: 2},
        {label: 'UDP', value: 3},
        {label: 'HTTP', value: 4},
      ],
      searchKey: undefined,
      selectedIot: {},
      addVisible: false,
      updateVisible: false,
    }
  },
  mounted() {
    this.list();
  },
  components: {
    CommonSearchHead,
    IotAdd,
    IotCard,
    IotUpdate
  },
  methods: {
    // 列表
    list(){
      iotList(this.searchKey)
      .then(res => {
        this.iots = res.data.map((iot,index) => {
          iot.seq = (index + 1);
          return iot;
        })
      });
    },
    addCancelHandle() {
      this.addVisible = false;
    },
    addSubmitSuccessHandle() {
      this.addVisible = false;
      this.list();
    },
    searchKeyChangeHandle(searchKey) {
      this.searchKey = searchKey;
    },
    searchHandle() {
      //this.list();
    },
    addHandle() {
      this.addVisible = true;
    },
    updateCancelHandle() {
      this.updateVisible = false;
    },
    updateSubmitSuccessHandle() {
      this.updateVisible = false;
      this.list();
    },
    updateIot(iot) {
      this.selectedIot = iot;
      this.updateVisible = true;
    }
  }
}
</script>

<style scoped>
.main{
  display: flex;
  justify-content: start;
  flex-wrap: wrap;
}
</style>