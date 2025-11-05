export type LaravelPaginationLink = {
    url: string | null;
    label: string;
    active: boolean;
};

// 1) Paginador clásico de Laravel (return ->json() directo de paginate())
export type LaravelPaginator<T> = {
    current_page: number;
    data: T[];
    first_page_url: string;
    from: number | null;
    last_page: number;
    last_page_url: string;
    links: LaravelPaginationLink[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number | null;
    total: number;
};

// 2) Paginador de API Resources (estructura con meta + links)
// export type LaravelResourcePaginator<T> = {
//     data: T[];
//     links: {
//         first: string | null;
//         last: string | null;
//         prev: string | null;
//         next: string | null;
//     };
//     meta: {
//         current_page: number;
//         from: number | null;
//         last_page: number;
//         links: LaravelPaginationLink[];
//         path: string;
//         per_page: number;
//         to: number | null;
//         total: number;
//     };
// };
