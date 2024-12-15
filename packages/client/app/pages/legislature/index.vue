<script setup lang="ts">
import ParliamentComponent from '../../components/legislation/parliament-component.vue';
import SenateComponent from '../../components/legislation/senate-component.vue';
</script>

<template>
  <div class="flex flex-1 items-center ">
    <senate-component class="w-1/2 p-1" />
    <parliament-component class="w-1/2 p-1" />
  </div>
</template>
