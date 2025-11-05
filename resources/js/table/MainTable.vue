<script setup lang="ts">
import type { Table } from '@tanstack/table-core'
import { computed } from 'vue'
import { Table as UiTable, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table'
import { FlexRender } from '@tanstack/vue-table'  // 👈 importa esto

const props = defineProps<{
    table: Table<any>            // instancia creada con useVueTable()
    showIndex?: boolean
    actionsHeader?: string
}>()

const headerGroups = computed(() => props.table.getHeaderGroups())
const rows         = computed(() => props.table.getRowModel().rows)
</script>

<template>
    <!-- Toolbar opcional -->
    <div class="mb-3">
        <slot name="toolbar" />
    </div>

    <UiTable class="w-full">
        <TableHeader>
            <TableRow v-for="hg in headerGroups" :key="hg.id">
                <TableHead v-if="showIndex" class="w-[60px]">#</TableHead>
                <TableHead v-for="h in hg.headers" :key="h.id">
<!--                    <div v-if="!h.isPlaceholder" class="flex items-center gap-1 cursor-pointer select-none"-->
<!--                         @click="h.column.getToggleSortingHandler()?.($event)">-->
<!--                        {{ h.column.columnDef.header as any }}-->
<!--                        <span v-if="h.column.getIsSorted() === 'asc'">↑</span>-->
<!--                        <span v-else-if="h.column.getIsSorted() === 'desc'">↓</span>-->
<!--                    </div>-->
                    <div v-if="!h.isPlaceholder" class="flex items-center gap-1 cursor-pointer select-none"
                         @click="h.column.getToggleSortingHandler()?.($event)">
                        <FlexRender :render="h.column.columnDef.header" :props="h.getContext()" />
                        <span v-if="h.column.getIsSorted() === 'asc'">↑</span>
                        <span v-else-if="h.column.getIsSorted() === 'desc'">↓</span>
                    </div>
                </TableHead>
                <TableHead v-if="$slots.actions">{{ actionsHeader ?? 'Acciones' }}</TableHead>
            </TableRow>
        </TableHeader>

        <TableBody>
            <template v-if="rows.length">
                <TableRow v-for="(row, rIdx) in rows" :key="row.id">
                    <TableCell v-if="showIndex">{{ rIdx + 1 }}</TableCell>

                    <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
<!--                        {{ cell.getValue() }}-->
                        <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
                    </TableCell>

                    <TableCell v-if="$slots.actions">
                        <slot name="actions" :row="row" />
                    </TableCell>
                </TableRow>
            </template>

            <template v-else>
                <TableRow>
                    <TableCell :colspan="(showIndex?1:0)+props.table.getAllLeafColumns().length+($slots.actions?1:0)" class="text-center py-6">
                        <slot name="empty">Sin resultados.</slot>
                    </TableCell>
                </TableRow>
            </template>
        </TableBody>
    </UiTable>
</template>
