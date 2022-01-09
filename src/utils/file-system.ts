/**
 * Recursively iterate over the provided directory finding and returning all file handles.
 */
export async function getFileHandles(
  directoryHandle: FileSystemDirectoryHandle
) {
  const fileHandles: FileSystemFileHandle[] = [];

  try {
    for await (const folderOrFileHandle of directoryHandle.values()) {
      if (folderOrFileHandle.kind === "directory") {
        const filesToAppend = await getFileHandles(folderOrFileHandle);
        if (filesToAppend.length > 0) {
          fileHandles.push(...filesToAppend);
        }
      } else if (folderOrFileHandle.kind === "file") {
        fileHandles.push(folderOrFileHandle);
      }
    }
  } catch {
    // A folder may be moved or has become inaccessible, this catch will ignore those exceptions.
  }

  return fileHandles;
}
