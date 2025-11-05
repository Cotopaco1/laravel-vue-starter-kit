<script setup lang="ts">
import { LaravelPaginator } from '@/types/paginator';
import { Link } from '@inertiajs/vue3';
import { computed } from 'vue';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationFirst,
    PaginationItem,
    PaginationLast,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';
import { Button } from '@/components/ui/button';

const props = defineProps<{
    paginator: LaravelPaginator<any>
    showBoundaryControls?: boolean
}>();

// Process Laravel pagination links to show page numbers with ellipsis
const processedLinks = computed(() => {
    // Filter out "Previous" and "Next" labels, keep only numbered pages
    const pageLinks = props.paginator.links.filter(link => {
        const label = link.label.trim();
        return !label.includes('Previous') && !label.includes('Next') && !label.includes('&laquo;') && !label.includes('&raquo;');
    });

    const result: Array<{ type: 'page' | 'ellipsis', link?: typeof pageLinks[0] }> = [];
    const total = props.paginator.last_page;
    const current = props.paginator.current_page;

    // Show all pages if 7 or less
    if (total <= 7) {
        return pageLinks.map(link => ({ type: 'page' as const, link }));
    }

    // Complex pagination with ellipsis
    const firstPage = pageLinks[0];
    const lastPage = pageLinks[pageLinks.length - 1];

    // Always show first page
    result.push({ type: 'page', link: firstPage });

    // Calculate range around current page
    const showLeft = current > 3;
    const showRight = current < total - 2;

    if (showLeft) {
        result.push({ type: 'ellipsis' });
    }

    // Show pages around current
    const start = Math.max(2, current - 1);
    const end = Math.min(total - 1, current + 1);

    for (let i = start; i <= end; i++) {
        const link = pageLinks.find(l => parseInt(l.label) === i);
        if (link) {
            result.push({ type: 'page', link });
        }
    }

    if (showRight) {
        result.push({ type: 'ellipsis' });
    }

    // Always show last page if different from first
    if (total > 1) {
        result.push({ type: 'page', link: lastPage });
    }

    return result;
});
</script>

<template>
    <div class="flex flex-col sm:flex-row items-center justify-between gap-4 py-4">
        <!-- Info de registros -->
        <div class="text-sm text-muted-foreground">
            Mostrando
            <span class="font-medium">{{ paginator.from ?? 0 }}</span>
            a
            <span class="font-medium">{{ paginator.to ?? 0 }}</span>
            de
            <span class="font-medium">{{ paginator.total }}</span>
            resultados
        </div>

        <!-- Paginación -->
        <Pagination
            v-slot="{ page }"
            :total="paginator.total"
            :items-per-page="paginator.per_page"
            :sibling-count="1"
            :default-page="paginator.current_page"
            show-edges
        >
            <PaginationContent>
                <!-- First page button -->
                <PaginationFirst
                    v-if="showBoundaryControls"
                    as-child
                    :disabled="!paginator.prev_page_url"
                >
                    <Link
                        :href="paginator.first_page_url"
                        :class="!paginator.prev_page_url ? 'pointer-events-none' : ''"
                    />
                </PaginationFirst>

                <!-- Previous button -->
                <PaginationPrevious
                    as-child
                    :disabled="!paginator.prev_page_url"
                >
                    <Link
                        :href="paginator.prev_page_url ?? '#'"
                        :class="!paginator.prev_page_url ? 'pointer-events-none' : ''"
                    />
                </PaginationPrevious>

                <!-- Page numbers -->
                <template v-for="(item, index) in processedLinks" :key="index">
                    <PaginationEllipsis v-if="item.type === 'ellipsis'" />
                    <PaginationItem v-else-if="item.link">
                        <Button
                            as-child
                            :variant="item.link.active ? 'default' : 'outline'"
                            size="icon"
                        >
                            <Link :href="item.link.url ?? '#'">
                                {{ item.link.label }}
                            </Link>
                        </Button>
                    </PaginationItem>
                </template>

                <!-- Next button -->
                <PaginationNext
                    as-child
                    :disabled="!paginator.next_page_url"
                >
                    <Link
                        :href="paginator.next_page_url ?? '#'"
                        :class="!paginator.next_page_url ? 'pointer-events-none' : ''"
                    />
                </PaginationNext>

                <!-- Last page button -->
                <PaginationLast
                    v-if="showBoundaryControls"
                    as-child
                    :disabled="!paginator.next_page_url"
                >
                    <Link
                        :href="paginator.last_page_url"
                        :class="!paginator.next_page_url ? 'pointer-events-none' : ''"
                    />
                </PaginationLast>
            </PaginationContent>
        </Pagination>
    </div>
</template>
