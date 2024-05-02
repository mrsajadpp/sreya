export declare namespace collection {
    function create(collection: string): string;
    function find(collection: string): any;
    function insert(collection: string, newData: any): Promise<string | null>;
    function remove(collection: string, { key, value }: {
        key: string;
        value: any;
    }): Promise<string | null>;
    function destroy(collection: string): Promise<string>;
    function update(collection: string, { key, value }: {
        key: string;
        value: any;
    }, newData: any): Promise<string | null>;
}
