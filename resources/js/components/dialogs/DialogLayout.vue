<script setup lang="ts">
    import { Dialog, DialogFooter, DialogTitle, DialogDescription } from '@/components/ui/dialog';
    import DialogScrollContent from '@/components/ui/dialog/DialogScrollContent.vue';

    const isOpen =  defineModel<boolean>('isOpen');

</script>

<template>
    <Dialog v-model:open="isOpen">
        <DialogScrollContent class="max-h-[90vh]">
            <DialogTitle><slot name="title"></slot></DialogTitle>
            <DialogDescription><slot name="description"></slot></DialogDescription>
            <slot name="body"></slot>
            <DialogFooter>
                <slot name="footer"></slot>
            </DialogFooter>
        </DialogScrollContent>
    </Dialog>
</template>

<style scoped>

</style>
