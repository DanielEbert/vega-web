export const initialSpec: any = {
    $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
    data: {},
    mark: { type: 'circle', tooltip: { content: 'data' } },
    encoding: {
        x: { field: 'x', type: 'quantitative', title: 'X' },
        y: { field: 'y', type: 'quantitative', title: 'Y' },
        color: { field: 'category', type: 'nominal', title: 'Category' },
        size: { value: 100 }
    },
    width: 700,
    height: 700
};

export const initialData: any[] = [
    { x: 1, y: 10, category: 'A' },
    { x: 2, y: 15, category: 'A' },
    { x: 3, y: 13, category: 'A' },
    { x: 4, y: 17, category: 'A' },
    { x: 2, y: 8, category: 'B' },
    { x: 3, y: 11, category: 'B' },
    { x: 4, y: 16, category: 'B' },
    { x: 5, y: 19, category: 'B' }
];