<script setup lang="ts">
import type { ChartDataDTO } from '@shared/chart/ChartDataDTO';
import type { LawGroupDto } from '@shared/legislature/law-group-dto';

defineProps<{
  lawGroup: LawGroupDto[];
}>();

interface item {
  content: string;
  disabled: boolean;
  closeOthers;
}
</script>

<template>
</template>
