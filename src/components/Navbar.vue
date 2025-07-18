<script setup lang="ts">
import IconBars from './icons/IconBars.vue'
import { ref, onMounted, onUnmounted } from 'vue'

const previousScrollY = ref(0)
const showNav = ref(true)

const scrolled = ref(false)
const isOpen = ref(false)
const dropdownOpen = ref(false)

const handleScroll = (): void => {
  const currentScrollY = window.scrollY

  if (currentScrollY > previousScrollY.value && currentScrollY > 50) {
    showNav.value = false // Scroll ke bawah: sembunyikan navbar
  } else {
    showNav.value = true // Scroll ke atas: tampilkan navbar
  }

  scrolled.value = currentScrollY > 20
  previousScrollY.value = currentScrollY
}

const activeSection = ref('work')

const updateActiveSection = () => {
  const hash = window.location.hash
  if (hash) {
    activeSection.value = hash.replace('#', '')
  }
}


const toggleMenu = () => {
  isOpen.value = !isOpen.value
  if (!isOpen.value) dropdownOpen.value = false
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  window.addEventListener('hashchange', updateActiveSection)
  updateActiveSection() // inisialisasi awal
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('hashchange', updateActiveSection)
})

</script>

<template>
 <nav
  :class="[
    'fixed w-full left-0 z-50 transition-all duration-300 ease-in-out h-22 items-center navbar',
    scrolled ? 'backdrop-blur-md shadow-md' : 'bg-transparent',
    showNav ? 'top-0 opacity-100' : '-top-20 opacity-0',
  ]"
>

    <div class="container">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <a href="#home" class="flex items-center brand-link">
          <span :class="['brand-name font-bold', scrolled ? 'brand-name-scroll' : 'text-white']"
            ><img id="logo" src="/logo.png" alt="logo image" srcset="" class="w-[150px] h-auto"
          /></span>
        </a>

        <!-- Desktop Menu -->
        <div class="desktop-menu">
          <a
            v-for="item in ['Work', 'About', 'Services', 'Ideas','Careers', 'Contact']"
            :key="item"
            :href="`#${item.toLowerCase()}`"
            :class="[
              'nav-link',
              scrolled ? 'nav-link-scroll' : 'text-slate-50',
              activeSection === item.toLowerCase() ? 'font-bold underline underline-offset-8' : ''
            ]"

            >{{ item }}</a
          >
        </div>

        <!-- Mobile Menu Button -->
        <div class="menu-toggle">
          <button @click="toggleMenu" class="menu-button">
            <span class="sr-only">Open main menu</span>
            <IconBars :class="isOpen ? 'fas fa-times' : 'fas fa-bars'" class="text-xl bar-icon" />
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div :class="['mobile-menu', { open: isOpen }]">
      <div class="mobile-menu-links">
        <a
          v-for="item in ['Work', 'About', 'Services', 'Ideas','Careers', 'Contact']"
          :key="item"
          :href="`#${item.toLowerCase()}`"
          :class="[
            'mobile-link',
            activeSection === item.toLowerCase() ? 'text-blue-600 font-bold' : '' 
          ]"

          >{{ item }}</a
        >
      </div>
    </div>
  </nav>
</template>

<style scoped>
nav {
  transition: top 0.3s ease-in-out, opacity 0.3s ease-in-out;
  background: linear-gradient(90deg, rgba(240, 102, 43, 0.9) 0%, rgba(232, 93, 34, 0.9) 100%);
}

.navbar {
  padding: 10px 0;
}

.navbar-scroll {
  padding: 10px 100px;
}

@media (max-width: 1024px) {
  .navbar,
  .navbar-scroll {
    padding: 10px 50px;
  }
}

/* Struktur */
.container {
  margin: 0 auto;
}

/* Branding */
.brand-link {
  background-color: transparent;
}

.brand-name {
  font-size: 1.5rem;
  transition: color 0.3s ease;
}


/* Navbar Layout */

/* Desktop Menu */
.desktop-menu {
  display: none;
}

.nav-link {
  position: relative;
  margin: 0 15px;
  font-size: 18px;
  font-weight: 500;
  transition: color 0.3s ease;
}

.nav-link-scroll {
  color: #fff;
}

.nav-link::after {
  content: '';
  position: absolute;
  width: 0;
  height: 2px;
  bottom: -2px;
  left: 0;
  background-color: #fff;
  transition: width 0.3s ease;
}

.nav-link:hover::after {
  width: 100%;
}

.nav-link:hover {
  background-color: transparent;
}

/* Mobile Menu */
.menu-toggle {
  display: none;
}

.menu-button {
  padding: 0.5rem;
  border-radius: 0.375rem;
  color: #4b5563;
  background: none;
  border: none;
  cursor: pointer;
}

.mobile-menu {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.5s ease-out;
  background-color: #fff;
}

.mobile-menu.open {
  max-height: 500px;
}

.mobile-menu-links {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.mobile-link {
  padding: 0.75rem 1rem;
  border-radius: 0.375rem;
  font-size: 1rem;
  font-weight: 500;
  color: #374151;
  text-decoration: none;
}

.mobile-link:hover {
  background-color: #f9fafb;
  color: #3b82f6;
}

/* Responsive */
@media (min-width: 1025px) {
  .desktop-menu {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
}

@media (max-width: 1024px) {
  .menu-toggle {
    display: flex;
    align-items: center;
    margin-right: -0.5rem;
  }

  .bar-icon {
    width: 22px;
    height: 22px;
    color: #fff;
  }

  .brand-name {
    font-size: 1.2rem;
  }

  .navbar,
  .navbar-scroll {
    padding: 10px 50px;
  }

  .nav-link {
    margin: 0 10px;
    font-size: 16px;
  }
}

@media (max-width: 768px) {
  .brand-name {
    font-size: 1rem;
  }

  .nav-link {
    font-size: 14px;
  }
}
</style>
