<script setup lang="ts">
import { Button } from '@/components/ui/button';
import LoadingIcon from '@/components/icons/LoadingIcon.vue';

defineProps<{
    isLoading : boolean
}>();

</script>

<template>
    <Button :disabled="isLoading">
        <LoadingIcon :is-loading="isLoading" v-show="isLoading"/>
        <slot></slot>
    </Button>
</template>

<style scoped>

</style>
