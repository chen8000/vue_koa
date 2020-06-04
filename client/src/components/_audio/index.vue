<template>
  <!-- 自定义样式 -->
  <div class="diy-audio-box">
    <audio ref="audio" v-show="true" :src="src"
    @loadedmetadata="getTimeTotal" 
    @timeupdate="audioTimeUpDate"
    @error="loadError"
    @ended="handleEnd"></audio>
    <div class="audio-container">
      <!--  播放暂停按钮 -->
      <div class="btn-group"  @mouseover="playOver" @mouseleave="playLeave">
        <transition enter-active-class="animated bounceIn" leave-active-class="animated zoomOut">
          <i v-if="!playStatus" @click="handlePlay" :class="['iconfont icon-bofang', {'animated tada': hoverClass}]"></i>
        </transition>
        <!-- jackInTheBox  rollOut-->
        <transition enter-active-class="animated bounceIn" leave-active-class="animated zoomOut">
          <i v-if="playStatus" :class="['iconfont icon-zantingtingzhi', {'animated tada': hoverClass}]" @click="handlePause"></i>
        </transition>
      </div>
      <!-- 播放时间 -->
      <p class="currentTime">{{currentTimes}}/{{total}}</p>
      <el-slider ref="slider" class="ele-progress" :format-tooltip="formatTooltip" v-model="progress" @input="progressChange"></el-slider>
    </div>
    <div class="sound" @mouseover="soundOver" @mouseleave="soundLeave" >
      <!-- 音量 -->
      <transition enter-active-class="animated bounceIn" leave-active-class="animated zoomOut">
        <div class="sound-box" v-show="soundClass">
          <el-slider vertical v-model="sound" :show-tooltip="false" @input="soundChange"></el-slider>
        </div>
      </transition>

      <!-- 音量icon -->
      <transition enter-active-class="animated bounceIn" leave-active-class="animated zoomOut">
        <i v-if="resSound > 0.0" :class="['iconfont icon-yinliang', {'animated tada': soundClass}]"></i>
      </transition>
      <transition enter-active-class="animated bounceIn" leave-active-class="animated zoomOut">
        <i v-if="resSound === '0.0'" :class="['iconfont icon-yinliangjingyinx soundno', {'animated tada': soundClass}]"></i>
      </transition>
    </div>
  </div>
</template>

<script>
  import { transTime } from '@/tools'
  export default {
    props: {
      src: String,
      download: Boolean
    },
    data () {
      return {
        progress: 0, // 进度条当前的位置
        progressType: false,  // 防止重复触发
        currentTimes: '00:00', // 当前播放的进度
        sound: 40, // 音量
        aObj: null, // audio 对象
        total: 0, // 总时长
        playStatus: false,  // true 正在播放，  false 暂停
        hoverClass: false, // 样式
        soundClass: false
      }
    },
    computed: {
      resSound () {
        return (this.sound / 100).toFixed(1)
      }
    },
    mounted () {
      this.aObj = this.$refs.audio
      this.getTimeTotal()
      this.addEvent()
    },
    methods: {
      addEvent () {
        this.$refs.slider.$el.addEventListener('mousedown', () => {
          this.progressType = true
        })
        this.$refs.slider.$el.addEventListener('mouseup', () => {
          setTimeout(() => { this.progressType = false }, 500)
        })
      },
      // 播放
      handlePlay () {
        this.aObj.play()
        this.playStatus = true
      },
      // 暂停
      handlePause () {
        this.aObj.pause()
        this.playStatus = false
      },
      // 获取总时长
      getTimeTotal () {
        this.total = (() => {
          let total_time = transTime(this.aObj.duration)
          if ( total_time === 'NaN:NaN') {
            return '00:00'
          }
          return total_time
        })()
      },
      // 视频播放进度改变时
      audioTimeUpDate () {
        this.progress = Math.round((Math.floor(this.aObj.currentTime) / Math.floor(this.aObj.duration)) * 100, 0)
        this.currentTimes = transTime(this.aObj.currentTime)
      },
      // 拖动
      // 点下走   抬起不走
      progressChange () {
        if (this.aObj.duration && this.progressType) {
          this.aObj.currentTime = this.progress / 100 * this.aObj.duration
        }
      },
      // 拖动进度条：--音量
      soundChange () {
        this.aObj.volume = (this.sound / 100).toFixed(1)
      },
      // hover提示时间
      formatTooltip(val) {
        let tooltip = this.progress > 0 ? transTime(val / 100 * this.aObj.duration) : '00:00'
        return tooltip === 'NaN:NaN' ? '00:00' : tooltip
      },
      // 音频加载失败
      loadError () {
        this.total = '00:00'
      },
      // 播放完成事件
      handleEnd () {
        this.aObj.currentTime = 0
        this.playStatus = false
      },
      // 播放按钮鼠标移入移出
      playOver () {
        this.hoverClass = true
      },
      playLeave () {
        this.hoverClass = false
      },
      // 喇叭
      soundOver () {
        this.soundClass = true
      },
      soundLeave () {
        this.soundClass = false
      }
    }
  }
</script>

<style lang="scss">
  @import '@/assets/style';
  @import './index.scss';
</style>