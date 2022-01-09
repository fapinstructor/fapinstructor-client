import * as React from "react";
import { get, set } from "idb-keyval";
import MIMEType from "whatwg-mimetype";

import { getFileHandles } from "@/utils/file-system";
import { MediaLink, MediaType } from "@/types/Media";
import { useIsMounted } from "@/hooks/useIsMounted";

export const localMedia = {
  setDirectories(directoryHandles: FileSystemDirectoryHandle[]) {
    return set("local-media", directoryHandles);
  },
  async getDirectories() {
    return (await get<FileSystemDirectoryHandle[]>("local-media")) || [];
  },
};

export function useLocalMedia() {
  const [directoryHandles, setDirectoryHandles] = React.useState<
    FileSystemDirectoryHandle[]
  >([]);
  const isMounted = useIsMounted();
  const databaseSynced = React.useRef(false);

  // Use the database values as the initial directory handle state.
  React.useEffect(() => {
    (async () => {
      const directoryHandles = await localMedia.getDirectories();
      if (isMounted()) {
        databaseSynced.current = true;
        setDirectoryHandles(directoryHandles);
      }
    })();
  }, [isMounted]);

  // Start updating the database when the local state has been initialized.
  React.useEffect(() => {
    if (databaseSynced.current) {
      localMedia.setDirectories(directoryHandles);
    }
  }, [directoryHandles]);

  async function removeDirectoryHandle(
    directoryHandle: FileSystemDirectoryHandle
  ) {
    // Filter out the specified handle from the list.
    const filteredDirectoryHandles: FileSystemDirectoryHandle[] = [];
    for (let i = 0; i < directoryHandles.length; i++) {
      const same = await directoryHandles[i].isSameEntry(directoryHandle);

      // filter out any matches
      if (same) {
        continue;
      }

      filteredDirectoryHandles.push(directoryHandles[i]);
    }

    setDirectoryHandles(filteredDirectoryHandles);
  }

  async function appendDirectoryHandle(
    directoryHandle: FileSystemDirectoryHandle
  ) {
    // Check to see if the handle is already present, if so throw.
    for (let i = 0; i < directoryHandles.length; i++) {
      const same = await directoryHandles[i].isSameEntry(directoryHandle);

      if (same) {
        throw new Error(
          `Directory "${directoryHandle.name}" has already been selected.`
        );
      }
    }

    setDirectoryHandles([...directoryHandles, directoryHandle]);
  }

  return [
    directoryHandles,
    {
      setDirectoryHandles,
      appendDirectoryHandle,
      removeDirectoryHandle,
    },
  ] as const;
}

async function requestPermission(handle: FileSystemHandle) {
  return (
    (await handle.queryPermission()) === "granted" ||
    (await handle.requestPermission()) === "granted"
  );
}

export async function getLocalMediaLinks() {
  const directories = await localMedia.getDirectories();

  const permittedDirectories: FileSystemDirectoryHandle[] = [];

  // Check if we still have permission, if not request for it.
  for (let i = 0; i < directories.length; i++) {
    const handle = directories[i];

    if (await requestPermission(handle)) {
      permittedDirectories.push(handle);
    }
  }

  // Iterate over directories and build a list of files handles.
  const fileHandles = (
    await Promise.all(permittedDirectories.map(getFileHandles))
  ).flat();

  // Convert file handles to file data.
  const files = await Promise.all(
    fileHandles.map(async (fileHandle) => fileHandle.getFile())
  );

  // Convert the file data to a format that the media player understands.
  const mediaLinks = convertFilesToMediaLink(files);

  return mediaLinks;
}

export function convertFilesToMediaLink(files: File[]) {
  const mediaLinks = files
    .map(convertFileToMediaLink)
    // Remove undefined elements.
    .filter((link): link is MediaLink => Boolean(link));

  return mediaLinks;
}

function convertFileToMediaLink(file: File) {
  if (!file.type) {
    return;
  }

  const url = URL.createObjectURL(file);
  const contentType = new MIMEType(file.type);
  let mediaType: MediaType;

  if (contentType.type === "image") {
    if (contentType.subtype === "gif") {
      mediaType = MediaType.Gif;
    } else {
      mediaType = MediaType.Picture;
    }
  } else if (contentType.type === "video") {
    mediaType = MediaType.Video;
  } else {
    // Unsupported context-type.
    return;
  }

  const mediaLink: MediaLink = {
    sourceLink: url,
    directLink: url,
    mediaType,
  };

  return mediaLink;
}
