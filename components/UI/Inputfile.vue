<template>
  <div class="file-input">
    <div class="file-input__inner">
      <div class="file-input__name">{{ filename.substr(0, 30) || name }}</div>
      <div class="file-input__btn" @click.prevent="onPickFile">UPLOAD</div>
      <input
        type="file"
        style="display: none;"
        ref="fileInput"
        accept="image/*"
        @change="onFilePicked"
      >
    </div>
    <div class="file-input__preview" v-if="!disablePreview">
      <img v-if="loading || img || fileurl" :src="loading || img || fileurl" alt="">
    </div>
  </div>
</template>

<script>
export default {
  props: ['name', 'path', 'img', 'index', 'disablePreview'],
  data() {
    return {
      filename: '',
      fileurl: '',
      loading: '',
      file: null
    }
  },
  methods: {
    onPickFile() {
      this.$refs.fileInput.click()
    },
    async onFilePicked(event) {
      const files = event.target.files
      const fileReader = new FileReader()
      this.file = files[0]
      this.filename = files[0].name
      if (this.filename.indexOf(".") <= 0) {
        return alert("Please add a valid file");
      }
      fileReader.onload = (e) => {
        this.fileurl = e.target.result
      }
      fileReader.readAsDataURL(files[0])
      try {
        this.loading = 'https://i.gifer.com/origin/d0/d0fc7bdc9a240be0950efb47f3c90f81.gif'
        const snapshot = await this.$fire.storage
          .ref()
          .child(this.path)
          .put(this.file)
        if(this.index !== undefined) {
          this.$emit('uploadFile', await snapshot.ref.getDownloadURL(), this.index)
        } else {
          this.$emit('uploadFile', await snapshot.ref.getDownloadURL())
        }
        this.loading = ''
        this.$toast.success('File uploaded')
      } catch (e) {
        this.$toast.error(e)
      }
    },
  }
}
</script>

<style lang="scss" scoped>
  .file-input {
    &__inner {
      display: flex;
      justify-content: space-between;
    }
    &__name {
      border: 2px solid #20252B;
      border-radius: 4px;
      padding: 12px;
      max-width: 340px;
      width: 100%;
      margin-right: 16px;
    }
    &__btn {
      max-width: 160px;
      width: 100%;
      text-align: center;
      background-color: #1A222D;
      color: #F5F5F5;
      font-size: 14px;
      font-weight: 700;
      padding: 16px 0;
      cursor: pointer;
    }
    &__preview {
      margin-top: 5px;
      max-width: 108px;
      img {
          width: 150px;
          height: 100px;
      }
    }
  }
</style>