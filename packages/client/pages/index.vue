<script setup lang="ts">

import type {Test} from "@shared/types/dist/types/test";

const test: Test = {
  test: "test",
};

const message = ref('');

onMounted(async () => {
  try {
    const response: Test = await $fetch('http://127.0.0.1:3333', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    message.value = response.test;
    console.log(response);
  } catch (error) {
    console.error(error);
  }
})

</script>
<template>
  <div>  <UDivider label="OR" />
  </div>
</template>
