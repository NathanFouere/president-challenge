<script setup lang="ts">

import type {Test} from "@shared/types/test";

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
