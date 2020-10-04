<template>
  <v-main class="fourth">
    <v-container fluid>
        <v-breadcrumbs :items="items"></v-breadcrumbs>
    </v-container>
  </v-main>
</template>

<script>
export default {
  data: () => ({
    items: [
      {
        text: 'Dashboard',
        disabled: true,
      },
    ],
  }),
};
</script>

<style scoped>
</style>
