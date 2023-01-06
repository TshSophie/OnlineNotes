<template>
    <div id="clock">
      <div class="box" :style="{ color: textColor }">
        <span class="date">{{ date }}</span>
        <span class="time">{{ time }}</span>
      </div>
    </div>
  </template>
  <script>
  export default {
    name: "spClock",
    props: {
      textColor: {
        type: String,
        default: "#2cf3fb",
      },
    },
    data() {
      return {
        timer: null,
        date: "",
        time: "",
      };
    },
    created() {
      this.updateTime();
    },
    mounted() {
      this.timer = setInterval(() => {
        this.updateTime();
      }, 1000);
    },
    methods: {
      updateTime() {
        let date = new Date();
        let sDate = "-";
        let sTime = ":";
  
        let YYYY = formatHandle(date.getFullYear());
        let MM = formatHandle(date.getMonth() + 1);
        let DD = formatHandle(date.getDate());
  
        let hh = formatHandle(date.getHours());
        let mm = formatHandle(date.getMinutes());
        let ss = formatHandle(date.getSeconds());
  
        let w = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
        let week = w[date.getDay()];
  
        this.date = YYYY + sDate + MM + sDate + DD + ` ${week}`;
        this.time = hh + sTime + mm + sTime + ss;
  
        function formatHandle(value) {
          if (value >= 0 && value < 10) return "0" + value;
          else return value;
        }
      },
    },
    beforeDestroy() {
      clearInterval(this.timer);
    },
  };
  </script>
  <style scoped>
  #clock {
    font-family: "Share Tech Mono", monospace;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;    
  }
  .box {
    text-align: center;    
  }
  .date {
    font-size: 28px;
    letter-spacing: 2px;
    display: inline-block;
    padding-bottom: 10px;
  }
  .time {
    letter-spacing: 6px;
    font-size: 80px;
  }
  </style>
  