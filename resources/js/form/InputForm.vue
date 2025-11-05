<script setup lang="ts">

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import InputError from '@/components/InputError.vue';

const model = defineModel<number|string|boolean>();
interface Props {
    label : string;
    id : string;
    type : string;
    required ?: boolean;
    placeholder ?: string;
    error : string | undefined;
    step ?: string;
}

defineProps<Props>();

</script>

<template>
    <div class="grid gap-2">
        <Label :for="id">{{ label }} <span v-if="required" class="text-red-500">*</span> </Label>
        <Input
            :id="id"
            :type="type ?? 'text'"
            class="mt-1 block w-full"
            v-model="model"
            :required="required"
            :placeholder="placeholder ?? ''"
            :step="step"
        />
        <InputError class="mt-2" :message="error" />
    </div>
</template>

<style scoped>

</style>
