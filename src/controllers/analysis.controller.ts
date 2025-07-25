
import { Request, Response } from 'express';
import { analyzeReview } from '../services/gemini.service';
import { AnalysisInput } from '../types/analysis.types';

export const analyzeReviewController = async (req: Request, res: Response) => {
    try {
        const { review, product_category } = req.body as AnalysisInput;

        if (!review) {
            return res.status(400).json({ error: 'Review text is required' });
        }

        const analysisResult = await analyzeReview({ review, product_category });

        res.status(200).json(analysisResult);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
