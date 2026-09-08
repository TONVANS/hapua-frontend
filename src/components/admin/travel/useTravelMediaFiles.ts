import { useState } from 'react';
import { Weekday } from '@/types';

export function useTravelMediaFiles() {
  const [coverImageFile, setCoverImageFile] = useState<File | null>(null);
  const [coverImagePreview, setCoverImagePreview] = useState<string | null>(null);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [deletedImageIds, setDeletedImageIds] = useState<string[]>([]);
  const [replaceImages, setReplaceImages] = useState(false);
  const [selectedOpenDays, setSelectedOpenDays] = useState<Weekday[]>([]);

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (coverImagePreview) URL.revokeObjectURL(coverImagePreview);
      setCoverImageFile(file);
      setCoverImagePreview(URL.createObjectURL(file));
    }
  };

  const removeCoverImage = () => {
    if (coverImagePreview) URL.revokeObjectURL(coverImagePreview);
    setCoverImageFile(null);
    setCoverImagePreview(null);
  };

  const handleGalleryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length) {
      const newPreviews = files.map((f) => URL.createObjectURL(f));
      setImageFiles((prev) => [...prev, ...files]);
      setImagePreviews((prev) => [...prev, ...newPreviews]);
    }
  };

  const removeStagedGalleryFile = (index: number) => {
    URL.revokeObjectURL(imagePreviews[index]);
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const clearGallery = () => {
    imagePreviews.forEach((url) => URL.revokeObjectURL(url));
    setImageFiles([]);
    setImagePreviews([]);
  };

  const toggleOpenDay = (day: Weekday) => {
    if (selectedOpenDays.includes(day)) {
      setSelectedOpenDays(selectedOpenDays.filter((d) => d !== day));
    } else {
      setSelectedOpenDays([...selectedOpenDays, day]);
    }
  };

  const resetAllMedia = () => {
    if (coverImagePreview) URL.revokeObjectURL(coverImagePreview);
    imagePreviews.forEach((url) => URL.revokeObjectURL(url));
    setCoverImageFile(null);
    setCoverImagePreview(null);
    setImageFiles([]);
    setImagePreviews([]);
    setDeletedImageIds([]);
    setReplaceImages(false);
    setSelectedOpenDays([]);
  };

  return {
    coverImageFile,
    coverImagePreview,
    imageFiles,
    imagePreviews,
    deletedImageIds,
    setDeletedImageIds,
    replaceImages,
    setReplaceImages,
    selectedOpenDays,
    setSelectedOpenDays,
    handleCoverChange,
    removeCoverImage,
    handleGalleryChange,
    removeStagedGalleryFile,
    clearGallery,
    toggleOpenDay,
    resetAllMedia,
  };
}
