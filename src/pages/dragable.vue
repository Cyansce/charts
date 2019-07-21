<template>
  <div class="dragable">
    <div class="left">
      <span @drop="test" @dragstart="dragS">拖动对象</span>
      <div id="dragDiv" draggable="true" class="drag-div" @dragstart="handlerDragstart" @drop="handleDragedDrop">
        33333
      </div>
    </div>
    <div class="right" ref="right" @drop="handleDrop" @dragenter="drapEnter">
      2
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import EventUtil from 'EventUtil'
export default {
  mounted () {
    EventUtil.addHandler(this.$refs.right, 'dragover', event => { EventUtil.preventDefault(event); })
    EventUtil.addHandler(this.$refs.right, 'dragenter', event => { EventUtil.preventDefault(event); })
  },
  methods: {
    dragS (event) {
      event.dataTransfer.setData('Text', event.target.data)
      event.dataTransfer.effectAllowed = 'move'
      event.dataTransfer.dropEffect = 'move'
      console.log(event)
    },
    test (e) {
      console.log(333, e)
    },
    handleDrop (event) {
      console.log(event)
      event.stopPropagation();
      event.preventDefault()
      // event.dataTransfer.dropEffect = 'copy'
      const text = event.dataTransfer.getData('Text')
      console.log(text)
      event.target.appendChild(document.getElementById(text))
    },
    drapEnter (e) {
      console.log(222)
      e.dataTransfer.dropEffect = 'copy'
    },

    handlerDragstart (e) {
      e.dataTransfer.effectAllowed = 'copy'
      e.dataTransfer.setData('Text', e.target.id)
      console.log('start drag div')
      console.log(e)
    },
    handleDragedDrop(e) {
      console.log(6666)
      
    }
  }
}
</script>

<style scoped>
.dragable {
  display: flex
}
.left, .right {
  width: 50%;
  height: 500px;
  border: 1px solid #000;
}
.drag-div {
  width: 100px;
  margin: 0 auto;
  height: 100px;
  border: 1px solid red;
  cursor: pointer;
}
</style>
