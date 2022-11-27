<template>
  <input 
    :value="label" 
    :type="type" 
    @click="click" 
    :class="theme"/>
</template>

<script>
export default {
  name: 'Button',
  emits: ['click'],

  props: {
    type: {type: String, defaut: 'button'},
    label: {type: String, default: 'Button'},
    theme: {type: String }
  },
  methods: {
    click() {
        this.$emit('click')
    }
  }
}
</script>

<style scoped lang="scss">
@import '/css/components/form/Button.scss'
</style>