<script setup lang="ts" generic="T extends unknown">
import { FlexRender, type Table as TableType } from "@tanstack/vue-table";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { computed } from "vue";

export interface Props<T> {
    table: TableType<T>;
}
const { table } = defineProps<Props<T>>();

const columns = computed(() => {
    return table.getAllColumns();
});

const headerGroups = computed(() => {
    return table.getHeaderGroups();
});
const modelRows = computed(() => {
    return table.getRowModel().rows;
});
</script>
<template>
    <Table>
        <TableHeader>
            <TableRow
                v-for="headerGroup in headerGroups"
                :key="headerGroup.id"
            >
                <TableHead
                    v-for="header in headerGroup.headers"
                    :key="header.id"
                >
                    <FlexRender
                        v-if="!header.isPlaceholder"
                        :render="header.column.columnDef.header"
                        :props="header.getContext()"
                    />
                </TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            <template v-if="modelRows?.length">
                <template
                    v-for="row in modelRows"
                    :key="row.id"
                >
                    <TableRow :data-state="row.getIsSelected() && 'selected'">
                        <TableCell
                            v-for="cell in row.getVisibleCells()"
                            :key="cell.id"
                            :style="{ width: cell.column.getSize() + 'px' }"
                        >
                            <FlexRender
                                :render="cell.column.columnDef.cell"
                                :props="cell.getContext()"
                            />
                        </TableCell>
                    </TableRow>
                    <TableRow v-if="row.getIsExpanded()">
                        <TableCell :colspan="row.getAllCells().length">
                            {{ JSON.stringify(row.original) }}
                        </TableCell>
                    </TableRow>
                </template>
            </template>
            <TableRow v-else>
                <TableCell
                    :colspan="columns.length"
                    class="h-24 text-center"
                >
                    No hay resultados.
                </TableCell>
            </TableRow>
        </TableBody>
    </Table>
</template>

