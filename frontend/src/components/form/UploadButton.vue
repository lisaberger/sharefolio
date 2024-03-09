<template>
    <div class="upload">
        <input id="fileInput" type="file" @change="handleFileUpload" />
        <label for="fileInput">+</label>
        <span class="label">{{ label }}</span>
    </div>
</template>

<script>
export default {
    name: 'UploadButton',
    props: {
        label: { type: String },
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
@import '/css/components/form/UploadButton.scss';
</style>
