<template>
  <v-app>
    <router-view />
  </v-app>
</template>

<script>
export default {
  name: "App"
};
</script>

<style lang="scss">
.v-text-field__details {
  display: none !important;
}

.v-input__slot {
  margin-bottom: 0 !important;
}
</style>
