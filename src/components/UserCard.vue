<script setup lang="ts">
interface Props {
  media: string;
  email: string;
  fullName: string;
}
const props = defineProps<Props>()


</script>

<template>
  <li class=" list-none flex gap-2">
    <img class="rounded" :src="props.media" alt="picture">
    <div class="flex flex-col gap-2">
      <span>{{ props.fullName }}</span>
      <a class="font-semibold" :href="`mailto:${props.email}`">{{ props.email }}</a>
    </div>
  </li>
</template>