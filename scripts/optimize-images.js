const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

const imageDir = path.join(__dirname, '..', 'assets', 'img');
const outputDir = path.join(__dirname, 'dist', 'assets', 'img');

async function optimizeImages() {
    try {
        // Criar diretório de saída se não existir
        await fs.mkdir(outputDir, { recursive: true });
        
        // Ler todos os arquivos no diretório de imagens
        const files = await fs.readdir(imageDir);
        
        for (const file of files) {
            if (file.match(/\.(jpg|jpeg|png)$/i)) {
                const inputPath = path.join(imageDir, file);
                const filename = path.parse(file).name;
                
                // Processar para WebP
                await sharp(inputPath)
                    .webp({ quality: 80 })
                    .toFile(path.join(outputDir, `${filename}.webp`));
                
                // Otimizar JPG/PNG original
                await sharp(inputPath)
                    .jpeg({ quality: 80, progressive: true })
                    .toFile(path.join(outputDir, `${filename}.jpg`));
                
                console.log(`Otimizado: ${file}`);
            }
        }
        
        console.log('Otimização de imagens concluída!');
    } catch (error) {
        console.error('Erro ao otimizar imagens:', error);
    }
}

optimizeImages();