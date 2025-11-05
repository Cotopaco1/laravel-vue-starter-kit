<script setup lang="ts">
import { Check, Search } from "lucide-vue-next"
import { cn } from "@/lib/utils"
import { Combobox, ComboboxAnchor, ComboboxEmpty, ComboboxGroup, ComboboxInput, ComboboxItem, ComboboxItemIndicator, ComboboxList } from "@/components/ui/combobox";
import { watch } from 'vue';
import Label from "../ui/label/Label.vue";

    defineProps<{
        options : any[];
        optionLabel : string;
        optionValue : string;
        label ?: string;
    }>();
    const emit = defineEmits(['optionSelected']);

    const model = defineModel<any>();
    watch(model, (newValue) => {
        if(!newValue) return;

        emit('optionSelected', newValue);
    });

</script>

<template>

    <Combobox :by="optionLabel" v-model="model">
        <ComboboxAnchor>
                <Label v-show="label">{{label}}</Label>
            <div class="relative w-full items-center">
                <ComboboxInput class="pl-9" :display-value="(val) => val?.[optionLabel] ?? ''" placeholder="Escribe ..." />
                <span class="absolute start-0 inset-y-0 flex items-center justify-center px-3">
                  <Search class="size-4 text-muted-foreground" />
                </span>
            </div>
        </ComboboxAnchor>

        <ComboboxList>
            <ComboboxEmpty>
                Sin coincidencias
            </ComboboxEmpty>

            <ComboboxGroup>
                <ComboboxItem
                    v-for="item in options"
                    :key="item[optionValue]"
                    :value="item"
                >
                    {{ item[optionLabel] }}

                    <ComboboxItemIndicator>
                        <Check :class="cn('ml-auto h-4 w-4')" />
                    </ComboboxItemIndicator>
                </ComboboxItem>
            </ComboboxGroup>
        </ComboboxList>
    </Combobox>
</template>
<style scoped>

</style>
