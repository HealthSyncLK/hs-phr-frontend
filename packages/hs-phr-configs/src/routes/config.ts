import { Router } from 'express';
import { promises as fs } from 'fs';
import path from 'path';

const router = Router();

router.get('/', async (req, res) => {
    try {
        const configDir = path.join(process.cwd(), 'src/config');
        const files = await fs.readdir(configDir);

        let combinedConfig: { [key: string]: any } = {};
        console.log(files)
        for (const file of files) {
            if (path.extname(file) === '.json') {
                const filePath = path.join(configDir, file);
                const fileContent = await fs.readFile(filePath, 'utf-8');
                const jsonContent = JSON.parse(fileContent);
                const configKey = path.basename(file, '.json');
                combinedConfig[configKey] = jsonContent;
            }
        }

        res.status(200).json(combinedConfig);
    } catch (error) {
        console.error("Failed to load configuration:", error);
        res.status(500).json({ message: "Could not load server configuration." });
    }
});

export default router;
