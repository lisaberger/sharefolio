<script>
export default {
    name: 'Button',

    props: {
        type: { type: String, defaut: 'button' },
        label: { type: String, default: 'Button' },
        theme: { type: String },
    },
    emits: ['click'],
    methods: {
        click() {
            this.$emit('click');
        },
    },
};
</script>

<template>
    <input :value="label" :type="type" :class="theme" @click="click" />
</template>

<style scoped lang="scss">
// @import '/css/components/form/Button.scss';
</style>
