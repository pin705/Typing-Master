<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <div class="container mx-auto px-4 py-12 max-w-4xl">
    <h1 class="text-3xl font-bold text-gray-900 mb-6">
      {{ t('footer.terms') }}
    </h1>
    <div class="prose prose-lg text-gray-600">
      <p>Last updated: December 8, 2025</p>
      <p>Please read these terms and conditions carefully before using Our Service.</p>
      <h3>Interpretation and Definitions</h3>
      <p>The words of which the initial letter is capitalized have meanings defined under the following conditions.</p>
      <h3>Acknowledgment</h3>
      <p>These are the Terms and Conditions governing the use of this Service and the agreement that operates between You and the Company.</p>
      <h3>Termination</h3>
      <p>We may terminate or suspend Your access immediately, without prior notice or liability, for any reason whatsoever, including without limitation if You breach these Terms and Conditions.</p>
    </div>
  </div>
</template>
