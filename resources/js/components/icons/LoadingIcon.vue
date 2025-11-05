<script setup lang="ts">
    import { Loader2Icon } from 'lucide-vue-next';
    defineProps<{
        isLoading ?: boolean;
    }>();
</script>

<template>
    <Loader2Icon :class="{'animate-spin' : isLoading}" />
</template>

<style scoped>

</style>
