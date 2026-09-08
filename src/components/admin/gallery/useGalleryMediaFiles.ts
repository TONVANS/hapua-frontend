import { useState } from 'react';

export function useGalleryMediaFiles() {
  const [mediaFiles, setMediaFiles] = useState<File[]>([]);
  const [filePreviews, setFilePreviews] = useState<{ name: string; size: string; url: string; type: string }[]>([]);

  const handleMediaFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    const newPreviews = files.map((file) => ({
      name: file.name,
      size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
      url: URL.createObjectURL(file),
      type: file.type.startsWith('video/') ? 'VIDEO' : 'IMAGE',
    }));
    setMediaFiles((prev) => [...prev, ...files]);
    setFilePreviews((prev) => [...prev, ...newPreviews]);
  };

  const removeStagedFile = (index: number) => {
    URL.revokeObjectURL(filePreviews[index].url);
    setMediaFiles((prev) => prev.filter((_, i) => i !== index));
    setFilePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const clearStagedFiles = () => {
    filePreviews.forEach((p) => URL.revokeObjectURL(p.url));
    setMediaFiles([]);
    setFilePreviews([]);
  };

  return {
    mediaFiles,
    filePreviews,
    handleMediaFilesChange,
    removeStagedFile,
    clearStagedFiles,
  };
}
