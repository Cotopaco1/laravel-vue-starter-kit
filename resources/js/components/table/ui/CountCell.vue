<script setup lang="ts">
    import Input from '@/components/ui/input/Input.vue';
    const model = defineModel<number>();
</script>

<template>
    <div class="inline-block">
        <Input v-model="model" type="number" class="max-w-[150px]! w-[70px] inline-block" min="0"  />
    </div>
</template>

<style scoped>

</style>
