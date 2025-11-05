<script setup lang="ts">
    import { ref, watch } from 'vue';
    import InputFile from './InputFile.vue';
    import { FileCheck2Icon, XIcon } from 'lucide-vue-next';
    import http from '@/lib/http';
    import type { AxiosError, AxiosResponse } from 'axios';
    import { useAxiosErrors } from '@/composables/useAxiosErrors';
    import { Loader2Icon } from 'lucide-vue-next';
    import { upload  } from '@/routes/temporaryfiles';

    const props = defineProps<{
        url ?: string;
    }>();

    const model = defineModel<File>();
    const hash = defineModel<string>('hash'); // If we have a hash, the image is upload successfully
    const inputFile = ref<InstanceType<typeof InputFile>>();
    const imageFile = ref<HTMLImageElement>();
    const { handleAxiosError } = useAxiosErrors();
    const isLoading = ref(false);

    watch(model, (newValue) => {
        console.log(newValue);
        if(newValue) {
            isLoading.value = true;
            createImageBlobInDom(newValue);
            /* Request to temporary-files/logo */
            uploadTemporaryImage(newValue);
        }

    });
    const uploadTemporaryImage = (file : File) => {
        hash.value = '';
        const formData = new FormData();
        formData.append('file', file);
        const url = props.url ?? upload().url;
        http.post(url, formData,
        // {
        // headers: {
        //     'Content-Type': 'multipart/form-data'
        // }
        // }
        ).then((response : AxiosResponse)=>{
            // Extracts the unique hash identifier from the uploaded temporary file response.
            const imageHash = response.data?.temporaryFile?.hash;
            if(imageHash) hash.value = imageHash;
            else console.log(response.data);
        }).catch((error : AxiosError)=>{
            handleAxiosError(error);
            clearFile();
        })
        .finally(()=>isLoading.value = false);
    }
    const createImageBlobInDom = (file: File) => {
        console.log(imageFile.value);
        if (imageFile.value) {
            const url = URL.createObjectURL(file);
            console.log(url);
            imageFile.value.src = url;

            // Cleanup when component unmounts
            imageFile.value.onload = () => URL.revokeObjectURL(url);
        }
    }
    const clearFile = () => {
        inputFile.value?.clearInputValue();
    }
</script>

<template>
    <div class="flex flex-col gap-4 ">
        <div class="flex gap-2 items-center md:h-max">
            <InputFile
                accept="image/*"
                v-model="model"
                ref="inputFile"
            />
            <template v-if="model">
                <div class="flex gap-2 items-center">
                    <span>{{ model.name }}</span>
                    <XIcon v-if="!isLoading" class="size-4 cursor-pointer" @click="clearFile"/>
                    <Loader2Icon v-else class="size-4 animate-spin" />
                </div>
            </template>
        </div>
        <div class="max-w-[300px]">
            <span v-if="hash && model" class="flex items-center gap-2 text-xs mb-2">
                <FileCheck2Icon  class="size-4 text-green-500"/>
                {{ 'Cargado' }}
            </span>
            <img
                :class="{
                    'border-3 max-h-full' : true,
                    'shadow border-gray-400' : isLoading,
                    'border-green-400' : !isLoading
                }"
                :hidden="!model"
                ref="imageFile"
                src=""
                alt="logo-imagen"
            >
        </div>
    </div>
</template>

<style scoped>

</style>
