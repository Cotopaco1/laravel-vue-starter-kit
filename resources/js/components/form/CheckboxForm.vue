<script setup lang="ts">

import { Label } from '@/components/ui/label';
import InputError from '@/components/InputError.vue';

const model = defineModel<number|string|boolean>();
interface Props {
    label : string;
    id : string;
    required ?: boolean;
    placeholder ?: string;
    error : string | undefined;
}
defineProps<Props>();

</script>

<template>
    <div class="flex flex-col gap-2">
        <Label :for="id">{{ label }} <span v-if="required" class="text-red-500">*</span> </Label>
        <div class="px-2">
            <input
                :id="id"
                type="checkbox"
                class="w-max size-6"
                v-model="model"
                :required="required"
                :placeholder="placeholder ?? ''"
            />

        </div>
        <InputError class="mt-2" :message="error" />
    </div>
</template>

<style scoped>

</style>
