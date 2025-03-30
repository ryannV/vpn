const fs = require('fs');
const path = require('path');

const DB_FILE = path.join(__dirname, "..", "db.json");
const sadiPath = path.join(__dirname, "..", "downloads", "sadi");
const digifarmaPath = path.join(__dirname, "..", "downloads", "digifarma");


const getFilesData = (folder, type) => {
    try {
        const files = fs.readdirSync(folder);
        return files.map(filename => ({
            client_id: type === "DIGIFARMA" ? filename.replace(path.extname(filename), '') : "",
            cnpj: type === "SADI" ? filename.replace(path.extname(filename), '') : "",
            digifarma: type === "DIGIFARMA" ? "S" : "N",
            sadi: type === "SADI" ? "S" : "N",
            amazon: "N" // Sempre "N"
        }));
    } catch (err) {
        console.error(`Erro ao ler pasta ${folder}:`, err);
        return [];
    }
};

// Lendo os arquivos das pastas e criando os objetos formatados
const sadiData = getFilesData(sadiPath, "SADI");
const digifarmaData = getFilesData(digifarmaPath, "DIGIFARMA");

// Lendo o db.json atual
let dbContent = [];
if (fs.existsSync(DB_FILE)) {
    dbContent = JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
}

// Mesclar os novos dados ao banco existente sem duplicatas
const updatedData = [...dbContent, ...sadiData, ...digifarmaData];

// Escrever no db.json
fs.writeFileSync(DB_FILE, JSON.stringify(updatedData, null, 2), 'utf8');

console.log("📂 Dados atualizados no db.json com sucesso!");