<script setup lang="ts">
    import { ref } from 'vue';
    import Button from '../ui/button/Button.vue';
    import { UploadIcon } from 'lucide-vue-next';

    const model = defineModel();
    const props = defineProps({
        accept : {
            required : true,
            type  : String
        }
    });

    const fileInput = ref<HTMLInputElement>();

    const handleFileChange = (event: Event) => {
        const target = event.target as HTMLInputElement;
        model.value = target.files?.[0] || null;
    };
    const clearInputValue = () => {
        if (fileInput.value) {
            fileInput.value.value = '';
            model.value = null;
        }
    }

    defineExpose({
        clearInputValue
    });
</script>

<template>
    <div v-bind="{clearInputValue}">
        <input @change="handleFileChange" ref="fileInput" hidden type="file" :accept="accept" />
        <!-- Trigger -->
        <Button @click="fileInput?.click()" variant="outline" type="button">
            <UploadIcon class="size-4"/>
        </Button>
        <!-- ImgUploaded -->
    </div>
</template>

<style scoped>

</style>
