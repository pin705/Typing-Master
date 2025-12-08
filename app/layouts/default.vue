<template>
  <div class="min-h-screen bg-gray-50 text-gray-900 font-sans selection:bg-primary-100 selection:text-primary-700 flex flex-col">
    <Header />

    <main class="flex-grow container mx-auto px-4 py-8 max-w-6xl">
      <slot />
    </main>

    <Footer />
  </div>
</template>

<style>
/* Global styles */
body {
  @apply antialiased;
}
</style>
