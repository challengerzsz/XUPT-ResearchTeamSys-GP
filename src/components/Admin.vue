<template>
  <div class="left">
    <AdminHeader></AdminHeader>
  </div>

</template>

<script>
import AdminHeader from './AdminHeader'

export default {
  name: 'admin',
  components: {
    AdminHeader
  }
}
</script>

<style scoped>
div {
  height: 100%;
  width: 100%;
}
</style>