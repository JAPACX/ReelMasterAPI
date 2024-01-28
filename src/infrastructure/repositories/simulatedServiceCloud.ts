import { FileInterface } from "../../domain/interfaces/files";
import * as fs from "fs";
import * as path from "path";

export class FileRepository implements FileInterface {
  async local_save(file: File, filename: string): Promise<string> {
    const uploadFolder = path.join(__dirname, "../../uploads");

    if (!fs.existsSync(uploadFolder)) {
      fs.mkdirSync(uploadFolder, { recursive: true });
    }

    const filePath = path.join(uploadFolder, filename);
    const writeStream = fs.createWriteStream(filePath);
    const readStream = fs.createReadStream(file["path"]);

    await new Promise((resolve, reject) => {
      readStream.pipe(writeStream);
      readStream.on("end", resolve);
      readStream.on("error", reject);
    });

    return filePath;
  }

  async local_check(filePath: string): Promise<boolean> {
    return fs.existsSync(filePath);
  }

  async server_save(_localPath: string, _serverPath: string): Promise<boolean> {
    // Upload the file to the server logic

    return true;
  }

  async server_delete(_serverPath: string): Promise<boolean> {
    // Delete the file from the server logic
    return true;
  }
}
