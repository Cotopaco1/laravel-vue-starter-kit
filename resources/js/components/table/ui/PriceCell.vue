<script setup lang="ts">
import Input from '@/components/ui/input/Input.vue';
import { formatMoney } from '@/composables/useFormatMoney';
import { nextTick, Ref, ref, watch } from 'vue';
import FieldEditable from '@/components/FieldEditable.vue';
defineProps<{
    currency: string;
}>();
const model = defineModel<number>({required : true});
const input = ref<HTMLInputElement>();
const inputModel = ref<number>();

const isFocus = ref(false);

const handleClick = () => {
    isFocus.value = true;
    nextTick(() => {
        input.value?.focus();
    });
};
const handleBlur = () => {
    isFocus.value = false;
};

const handleConfirm = (loading: Ref, value : number) => {
    console.log("modelValue: ", model.value, "InputValue", value);
    model.value = value;
};

watch(model, (newValue) => {
    inputModel.value = newValue
}, {immediate : true});

</script>

<template>
    <FieldEditable
        @confirm="
            handleConfirm
        "
        v-model="model"
    >
        <template #message>
            {{ model ? formatMoney(model, currency) : '' }}
        </template>
        <template #editable="{localValue}">
            <Input
                :model-value="localValue.value"
                ref="input"
                @blur="handleBlur"
                class="inline-block w-[150px] pr-16"
                @update:modelValue="payload => localValue.value = payload"
            />
        </template>
    </FieldEditable>
</template>

<style scoped></style>
