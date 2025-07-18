<template>
  <div class="space-y-6">
    <!-- Filter Controls -->
    <div class="flex text-black flex-wrap items-center justify-between gap-4">
      <p class="text-black justify-start max-w-2xs text-start">Showing 1-10 of 100</p>
      <div class="flex text-black flex-wrap justify-end gap-4">
        <select v-model="sort" class="border p-2 rounded-3xl">
        <option value="-published_at">Sort by Newest</option>
        <option value="published_at">Sort by Oldest</option>
      </select>

      <select v-model.number="size" class="border p-2 rounded-3xl">
        <option v-for="n in [10, 20, 50]" :key="n" :value="n">Show {{ n }}</option>
      </select>
      </div>
    </div>

    <!-- Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6 px-2">
      <BlogCard
        v-for="item in paginatedPosts"
        :key="item.id"
        :item="item"
      />
    </div>

    <!-- Pagination -->
    <div class="flex justify-center items-center gap-2 mt-10 ">
      <!-- First Page -->
      <button
        @click="page = 1"
        :disabled="page === 1"
        class="px-3 py-1 text-gray-900 hover:text-black disabled:text-gray-300"
      >
        «
      </button>

      <!-- Prev -->
      <button
        @click="page--"
        :disabled="page === 1"
        class="px-3 py-1 text-gray-900 hover:text-black disabled:text-gray-300"
      >
        ‹
      </button>

      <!-- Page Numbers -->
      <button
        v-for="n in totalPages"
        :key="n"
        @click="page = n"
        class="w-8 h-8 rounded-lg text-md font-medium"
        :class="page === n ? 'bg-[#ea6125] text-white' : 'hover:bg-gray-200 text-gray-700'"
      >
        {{ n }}
      </button>

      <!-- Next -->
      <button
        @click="page++"
        :disabled="page === totalPages"
        class="px-3 py-1 text-gray-900 hover:text-black disabled:text-gray-300"
      >
        ›
      </button>

      <!-- Last Page -->
      <button
        @click="page = totalPages"
        :disabled="page === totalPages"
        class="px-3 py-1 text-gray-900 hover:text-black disabled:text-gray-300"
      >
        »
      </button>
    </div>

      <!-- No Posts Message -->
      <div v-if="!paginatedPosts.length" class="text-center text-gray-500 mt-6">
        No posts found.
      </div>

  </div>
</template>

<script>
import mockPosts from "../data/mockPost.json"
import BlogCard from './BlogCard.vue'

export default {
  components: { BlogCard },
  data() {
    return {
      posts: [],
      page: 1,
      size: 8,
      sort: '-published_at'
    }
  },
  created() {
    this.posts = mockPosts
    console.log('Loaded posts:', this.posts)
  },
  computed: {
    sortedPosts() {
      return [...this.posts].sort((a, b) => {
        const aDate = new Date(a.published_at)
        const bDate = new Date(b.published_at)
        return this.sort === 'published_at' ? aDate - bDate : bDate - aDate
      })
    },
    paginatedPosts() {
      const start = (this.page - 1) * this.size
      return this.sortedPosts.slice(start, start + this.size)
    },
    totalPages() {
      return Math.ceil(this.posts.length / this.size)
    }
  }
}
</script>

