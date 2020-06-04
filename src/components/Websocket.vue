<template>
  <div>
    <el-input v-model="who"
              placeholder="who"></el-input>
    <el-input v-model="content"
              placeholder="内容"></el-input>
    <el-button type="success"
               icon="el-icon-check"
               circle
               @click="click()"></el-button>
  </div>

</template>
<script>
import SockJS from 'sockjs-client'
import Stomp from 'stompjs'
export default {
  data() {
    return {
      socketUrl: 'http://127.0.0.1:8081/im-server?token=',
      who: '',
      content: ''
    }
  },
  mounted() {
    this.initWebSocket()
  },
  methods: {
    click() {
      console.log(this.who), console.log(this.content)
      this.stompClient.send('/app/chat', {}, this.content)
    },
    // 接收到消息并对消息做处理
    onMessageReceived1(payload) {
      //   var message = JSON.parse(payload.body)
      //   console.info('Message', message)
      console.log(payload)
    },
    // 连接成功
    successCallback() {
      console.info('onConnected')
      this.stompClient.subscribe('/user/private', this.onMessageReceived1)
      //   this.stompClient.send(
      //     '/app/msg',
      //     {},
      //     JSON.stringify({ sender: 'sender', type: 'JOIN' })
      //   )
    },
    initWebSocket() {
      let token = localStorage.getItem('TOKEN')
      this.socket = new SockJS(this.socketUrl + token)
      this.stompClient = Stomp.over(this.socket)
      this.stompClient.connect(
        { test: 'test' },
        frame => {
          this.successCallback()
        },
        () => {
          //   this.reconnect(this.socketUrl, this.successCallback)
          console.log('链接失败')
        }
      )
    },
    // 断开重连使用定时器定时连接服务器
    reconnect(socketUrl, successCallback) {
      console.info('in reconnect function')
      let connected = false
      const reconInv = setInterval(() => {
        console.info('in interval' + Math.random())
        this.socket = new SockJS(socketUrl)
        this.stompClient = Stomp.over(this.socket)
        this.stompClient.connect(
          {},
          frame => {
            console.info('reconnected success')
            // 连接成功，清除定时器
            clearInterval(reconInv)
            connected = true
            successCallback()
          },
          () => {
            console.info('reconnect failed')
            console.info('connected:' + connected)
            if (connected) {
              console.info('connect .... what?')
            }
          }
        )
      }, 2000)
    },
    // 前端websocket发送消息
    sendMessage() {
      var chatMessage = {
        sender: 'sender',
        content: 'Hello Server!',
        type: 'MSG'
      }
      this.stompClient.send('/app/msg', {}, JSON.stringify(chatMessage))
    }
  }
}
</script>