export declare namespace collection {
    function create(collection: string): string;
    function find(collection: string): any;
    function insert(collection: string, newData: any): Promise<string | null>;
}
