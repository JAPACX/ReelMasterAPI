export interface FileInterface {
  local_save(file: File, filename: string): Promise<string>;

  local_check(filePath: string): Promise<boolean>;

  server_save(localPath: string, serverPath: string): Promise<boolean>;

  server_delete(serverPath: string): Promise<boolean>;
}
