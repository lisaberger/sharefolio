<template>
    <input :value="label" :type="type" class="more__btn" @click="click" />
</template>

<script>
export default {
    name: 'Button',
    props: {
        type: { type: String, defaut: 'button' },
        label: { type: String, default: 'More ⇣' },
    },
    emits: ['click'],
    methods: {
        click() {
            this.$emit('click');
        },
    },
};
</script>

<style scoped lang="scss">
// @import '/css/components/form/MoreButton.scss';
</style>
