export type EmbeddingAction = {
    prop: 'embedding'
    action: 'reset';
    entity: 'supplier' | 'market';
    payload?: any
}