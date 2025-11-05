<script setup lang="ts">
    const model = defineModel<number|string>();
    interface Props {
        id : string;
        optionLabel : string;
        optionValue : string;
        options : object[];
        disabled ?: boolean;
    }
    defineProps<Props>();
</script>

<template>
    <div class="relative">
        <select :disabled="disabled" :id="id" class="block w-full appearance-none rounded-lg border border-gray-300 bg-white px-3 py-2 pr-10 text-sm selection:text-primary-foreground shadow-sm outline-none transition-colors
               focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30
               disabled:cursor-not-allowed disabled:opacity-50
               dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700 dark:focus:border-indigo-400 dark:focus:ring-indigo-400/30
               aria-[invalid=true]:border-rose-500 aria-[invalid=true]:ring-rose-500/20" v-model="model">
            <option selected disabled> -- Seleccione una opción-- </option>
            <option v-for="option in options" :value="option[optionValue]" :key="option[optionValue]">{{ option[optionLabel ]}}</option>
        </select>
        <svg class="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 opacity-60"
             xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 011.08 1.04l-4.25 4.25a.75.75 0 01-1.06 0L5.21 8.27a.75.75 0 01.02-1.06z" clip-rule="evenodd"/>
        </svg>
    </div>
</template>

<style scoped>

</style>
