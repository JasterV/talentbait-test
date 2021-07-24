export interface ListSentencesOptions {
    orderBy?: string,
    order?: 'asc' | 'desc',
    page?: number
}

export interface UpdateSentenceOptions {
    text?: string,
    category?: string
}