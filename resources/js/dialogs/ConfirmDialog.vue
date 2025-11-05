<script setup lang="ts">
    import { Dialog, DialogContent, DialogFooter, DialogTitle, DialogDescription} from '@/components/ui/dialog';
    import Button from '../ui/button/Button.vue';

    const props = defineProps<{
        callback : () => any;

    }>();
    const isOpen =  defineModel<boolean>('isOpen');
    const handleConfirm = () => {
        props.callback();
        isOpen.value = false;
    }
</script>

<template>
    <Dialog v-model:open="isOpen">
        <DialogContent>
            <DialogTitle>¿Está seguro?</DialogTitle>
            <DialogDescription>No es reversible esta acción</DialogDescription>
            <DialogFooter>
                <Button @click="handleConfirm">Confirmar</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>

<style scoped>

</style>
