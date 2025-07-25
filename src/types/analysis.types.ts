
export interface AnalysisInput {
    review: string;
    product_category: string;
}

export interface AnalysisOutput {
    sentiment: {
        overall: 'positive' | 'negative' | 'neutral';
        confidence: number;
    };
    key_aspects: {
        aspect: 'delivery' | 'quality' | 'price' | 'customer_service' | 'packaging' | 'usability';
        sentiment: 'positive' | 'negative' | 'neutral';
        mention: string;
    }[];
    summary: string;
}
