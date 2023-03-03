const fs = require('node:fs/promises');
const path = require('node:path');

const createDirectory = async () => {
    try {
        const folders = ['Folder-1', 'Folder-2', 'Folder-3', 'Folder-4', 'Folder-5'];
        const filesTxt = ['File-1.txt', 'File-2.txt', 'File-3.txt', 'File-4.txt', 'File-5.txt',];

        const promises = folders.map(async (folder, index) => {
            const mainPath = path.join(__dirname, folder);

            await fs.mkdir(mainPath, {recursive: true});
            await fs.writeFile(path.join(mainPath, filesTxt[index]), 'It Was Me, DIO! >:D');
        })

        await Promise.all(promises);

        const files = await fs.readdir(path.join(process.cwd()));

        for (const file of files) {
            const whatIsThis = await fs.stat(path.join(process.cwd(), file));
            const isFile = whatIsThis.isFile();

            if (isFile) {
                console.log(path.join(process.cwd(), file), '- is file');
            } else {
                console.log(path.join(process.cwd(), file), '- is directory')
            }
        }

    } catch (e) {
        console.error(e.message);
    }
}

createDirectory().then()