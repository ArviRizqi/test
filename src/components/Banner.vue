<template>
  <section class="relative overflow-hidden h-screen">
    <div
      class="absolute top-0 left-0 w-full h-full bg-cover bg-center parallax-image opacity-65 "
      :style="{ backgroundImage: `url(${imageUrl})` }"
    ></div>
    <div class="relative z-10 h-full flex items-center justify-center text-white text-center">
      <div>
        <h1 class="text-6xl text-stone-100 font-bold">Ideas</h1>
        <p class="text-2xl text-stone-100 mt-4">Where all our great things begin</p>
      </div>
    </div>
    <svg
      class="absolute bottom-0 left-0 w-full"
      viewBox="0 0 100 10"
      preserveAspectRatio="none"
    >
      <polygon fill="white" points="0,10 100,0 100,10" />
    </svg>
  </section>
</template>

<script>
export default {
  props: {
    imageUrl: {
      type: String,
      required: true
    }
  },
  mounted() {
    window.addEventListener("scroll", this.handleParallax);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleParallax);
  },
  methods: {
    handleParallax() {
      const scrollTop = window.scrollY;
      const parallax = this.$el.querySelector(".parallax-image");
      if (parallax) {
        parallax.style.transform = `translateY(${scrollTop * 0.3}px)`;
      }
    }
  }
};
</script>

<style scoped>
.parallax-image {
  transition: transform 0.1s ease-out;
  will-change: transform;
}
</style>
