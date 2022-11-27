<template>
  <input :value="label" :type="type" @click="click" class="more__btn"/>
</template>

<script>
export default {
  name: 'Button',
  emits: ['click'],

  props: {
    type: {type: String, defaut: 'button'},
    label: {type: String, default: 'More ⇣'},
  },
  methods: {
    click() {
        this.$emit('click')
    }
  }
}
</script>

<style scoped lang="scss">
@import '/css/components/form/MoreButton.scss'
</style>