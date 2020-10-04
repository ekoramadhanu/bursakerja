<template>
    <div class="mt-12 pt-1">
        <article-home/>
        <footer-home/>
    </div>
</template>

<script>
import article from '@/components/Article.vue';
import footer from '@/components/Footer.vue';

export default {
  components: {
    'article-home': article,
    'footer-home': footer,
  },
};
</script>

<style scoped>

</style>
