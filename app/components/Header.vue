<script setup lang="ts">
const navItems = [
  { label: 'Typing Test', href: '/', active: true },
  { label: 'English Typing', href: '#' },
  { label: 'Key Practice', href: '/practice' },
  { label: 'Chinese Typing', href: '#' },
  { label: 'Speed Test', href: '#' },
]
</script>

<template>
  <header class="bg-[#409eff] text-white shadow-md">
    <div class="container mx-auto px-4 h-16 flex items-center justify-between max-w-6xl">
      <div class="flex items-center gap-8">
        <div class="text-2xl font-bold flex items-center gap-2">
          <span class="i-heroicons-keyboard"></span>
          <span>Typing Master</span>
        </div>
        
        <nav class="hidden md:flex items-center gap-1">
          <NuxtLink 
            v-for="item in navItems" 
            :key="item.label"
            :to="item.href"
            class="px-4 py-2 rounded transition-colors text-sm font-medium hover:bg-white/10"
            active-class="bg-white/20"
          >
            {{ item.label }}
          </NuxtLink>
        </nav>
      </div>

      <div class="flex items-center gap-4 text-sm">
        <button class="hover:text-white/80 transition-colors">Login</button>
        <span class="opacity-50">|</span>
        <button class="hover:text-white/80 transition-colors">Register</button>
      </div>
    </div>
  </header>
</template>
