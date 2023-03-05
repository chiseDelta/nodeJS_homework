const fs = require('node:fs/promises');
const path = require('node:path');

const dataPath = path.join(process.cwd(), 'data', 'users.json');

module.exports = {
    reader: async () => {
        const buffer = await fs.readFile(dataPath);
        const data = buffer.toString();
        return data ? JSON.parse(data) : [];
    },
    writer: async (users) => {
        const buffer = await fs.writeFile(dataPath, JSON.stringify(users));
    }
};