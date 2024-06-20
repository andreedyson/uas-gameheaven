<template>
  <q-page padding>Ini halaman user</q-page>
</template>

<script setup>
import { getProfile } from "src/helper/Profile";
import { onMounted } from "vue";

onMounted(() => getProfile());
</script>
