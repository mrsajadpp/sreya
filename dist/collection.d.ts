export declare namespace collection {
    function create(collection: string): string;
    function find(collection: string): any;
    function insert(collection: string, newData: any): Promise<string | null>;
    function remove(collection: string, identifier: string): Promise<string | null>;
    function destroy(collection: string): Promise<string>;
}
