<template>
  <div class="upload">
    <input id="fileInput" type="file" @change="handleFileUpload"/>
    <label for="fileInput">+</label>
    <span class="label">{{label}}</span>
    <!-- <p class="fileName">Hallo</p> -->
  </div>
  
</template>

<script>
export default {
  name: 'UploadButton',
  emits: ['click'],

  props: {
    label: { type: String },
  },
  methods: {
    click() {
        this.$emit('click')
    }
  }
}

// const fileName = document.querySelector(".fileName");

// const fileInput = document.querySelector("input[type=file]");
// fileInput.addEventListener("change", function() {
//     if (this.files && this.files[0]) {
//         fileName.innerHTML = this.files[0].name;
//     }
// });

</script>

<style scoped lang="scss">
@import '/css/components/form/UploadButton.scss'
</style>