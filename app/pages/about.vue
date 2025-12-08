<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <div class="container mx-auto px-4 py-12 max-w-4xl">
    <h1 class="text-3xl font-bold text-gray-900 mb-6">
      {{ t('footer.about_us') }}
    </h1>
    <div class="prose prose-lg text-gray-600">
      <p>
        Welcome to Typing Master, the ultimate platform for improving your typing speed and accuracy.
        Whether you are a beginner looking to learn touch typing or a professional wanting to increase your productivity,
        we have the tools and resources you need.
      </p>
      <p>
        Our mission is to help people communicate more effectively in the digital world.
        We believe that typing is a fundamental skill that can unlock new opportunities and save valuable time.
      </p>
      <h3>Why Choose Us?</h3>
      <ul>
        <li>Free and easy to use</li>
        <li>Multiple languages support</li>
        <li>Detailed statistics and progress tracking</li>
        <li>Fun and engaging practice modes</li>
      </ul>
    </div>
  </div>
</template>
