
import express from 'express';
import * as dotenv from 'dotenv';
import analysisRoutes from './routes/analysis.routes';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/api', analysisRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
