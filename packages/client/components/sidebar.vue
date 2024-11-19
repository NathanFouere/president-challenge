<script setup lang="ts">
const links = [
  {
    label: 'Login',
    icon: 'i-heroicons-user',
    to: '/login'
  },
  {
    label: 'Home',
    icon: 'i-heroicons-home',
    to: '/'
  }
]
</script>

<template>
  <u-dashboard-layout>

      <u-dashboard-sidebar-links :links="links" />

  </u-dashboard-layout>
</template>

