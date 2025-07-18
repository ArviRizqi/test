<template>
  <div class="rounded-xl overflow-hidden shadow-md/20 hover:shadow-lg transition bg-white">
    <!-- ✅ Lazyload + responsive image -->
    <img
      :src="item.medium_image?.url"
      :alt="item.title"
      class="w-full h-48 object-cover"
      loading="lazy"
    />

    <div class="p-6">
      <!-- Date -->
      <p class="text-start text-md text-gray-500 mb-1">
        {{ formatDate(item.published_at) }}
      </p>

      <!-- ✅ Title max 3 lines + ellipsis -->
      <h2 class="text-start text-lg font-semibold text-black leading-snug line-clamp-3">
        {{ item.title }}
      </h2>

    </div>
  </div>
</template>

<script>
export default {
  props: ['item'],
  methods: {
    formatDate(date) {
      return new Date(date).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      })
    }
  }
}
</script>

<style scoped>

</style>
