<template>
  <div class="w-full bg-white">
    <div class="container mx-auto px-4 py-12">
      <h1 class="text-4xl font-bold mb-8">Ideas & Blog</h1>
      <BlogGrid />
    </div>
  </div>
</template>

<script>
import BlogGrid from '../components/BlogGrid.vue'

export default {
  components: { BlogGrid }
}
</script>
