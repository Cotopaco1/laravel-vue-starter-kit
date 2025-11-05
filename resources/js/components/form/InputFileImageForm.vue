<script setup lang="ts">
import InputFileImage from '@/components/custom-ui/InputFileImage.vue';
 import { Label } from '@/components/ui/label';
import InputError from '@/components/InputError.vue';

 const model = defineModel<string>();
 defineProps<{
     label : string;
     error : string | undefined;
     description ?: string;
     url ?: string;
 }>();

</script>

<template>
    <div class="grid gap-2">
        <div class="flex flex-col md:flex-row gap-2 md:items-center">
            <Label >
                {{ label }}
            </Label>
            <p v-if="description" class="text-sm text-gray-600">
                {{description}}
            </p>
        </div>
        <InputFileImage
            v-model:hash="model"
            :url="url"
        />
        <InputError :message="error"/>
    </div>
</template>

<style scoped>

</style>
