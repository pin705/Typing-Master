<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <div class="container mx-auto px-4 py-12 max-w-4xl">
    <h1 class="text-3xl font-bold text-gray-900 mb-6">
      {{ t('footer.privacy') }}
    </h1>
    <div class="prose prose-lg text-gray-600">
      <p>Last updated: December 8, 2025</p>
      <p>This Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your information when You use the Service.</p>
      <h3>Collecting and Using Your Personal Data</h3>
      <p>While using Our Service, We may ask You to provide Us with certain personally identifiable information that can be used to contact or identify You.</p>
      <h3>Usage Data</h3>
      <p>Usage Data is collected automatically when using the Service.</p>
      <h3>Tracking Technologies and Cookies</h3>
      <p>We use Cookies and similar tracking technologies to track the activity on Our Service and store certain information.</p>
    </div>
  </div>
</template>
