<script setup lang="ts">

import type {Test} from "@shared/test";

const test: Test = {
  test: "test",
};

</script>
<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtWelcome />
  </div>
</template>
