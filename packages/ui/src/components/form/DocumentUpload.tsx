'use client';

import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { twMerge } from 'tailwind-merge';
import { CustomIcon } from '../general/CustomIcon';
import { Typography } from '../general/Typography';

interface FilePreviewProps {
  file: File;
  previewUrl: string;
  onRemove: () => void;
}

const FilePreview = ({ file, previewUrl, onRemove }: FilePreviewProps) => {
  const isImage = file.type.startsWith("image/");
  const isPdf = file.type === "application/pdf";

  return (
    <div className="relative w-[217px] h-[130px] border border-neutral-gray-100 rounded-lg overflow-hidden flex items-center justify-center bg-gray-50">
      {isImage && (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${previewUrl})` }}
        />
      )}

      {isPdf && (
        <embed
          src={previewUrl}
          type="application/pdf"
          className="w-full h-full"
        />
      )}

      {!isImage && !isPdf && (
        <div className="flex flex-col items-center justify-center text-gray-500">
          <CustomIcon name="link" className="w-8 h-8" />
          <Typography className="text-xs mt-1 text-center px-2">
            {file.name}
          </Typography>
        </div>
      )}

      <button
        type="button"
        onClick={onRemove}
        className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-neutral-100 transition-colors"
        aria-label="Remove file"
      >
        <CustomIcon name="x" className="w-4 h-4" />
      </button>
    </div>
  );
};



interface DropzoneProps {
  onDrop: (files: File[]) => void;
}

const Dropzone = ({ onDrop }: DropzoneProps) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
    accept: { 'image/*': ['.jpeg', '.png', '.jpg'], 'application/pdf': ['.pdf'] },
  });

  return (
    <div
      {...getRootProps()}
      className={twMerge(
        'flex flex-col items-center justify-center w-[181px] h-[130px] border border-dashed rounded-lg cursor-pointer transition-colors',
        isDragActive ? 'border-primary bg-primary-50' : 'border-neutral-gray-100 bg-white'
      )}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center gap-2 text-center">
        <CustomIcon name="plus" className="w-7 h-7 text-primary" />
        <Typography className="text-sm font-normal text-text-header">
          Add Files
        </Typography>
      </div>
    </div>
  );
};


export interface DocumentUploadProps {
  files: File[];
  onFilesChange: (files: File[]) => void;
  className?: string;
}

export const DocumentUpload = ({ files, onFilesChange, className }: DocumentUploadProps) => {
  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      onFilesChange([...files, ...acceptedFiles]); // ✅ append instead of replace
    },
    [files, onFilesChange]
  );


  const handleRemove = (index: number) => {
    const updated = [...files];
    updated.splice(index, 1);
    onFilesChange(updated);
  };

  // For simplicity, we'll only preview the first file.
  const firstFile = files[0];
  const previewUrl = firstFile ? URL.createObjectURL(firstFile) : null;

  // Clean up the object URL after the component unmounts or the file changes
  React.useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  return (
    <div className={twMerge('flex items-center gap-3 flex-wrap', className)}>
      {files.map((file, index) => {
        const previewUrl = URL.createObjectURL(file);

        return (
          <FilePreview
            key={index}
            file={file}
            previewUrl={previewUrl}
            onRemove={() => handleRemove(index)}
          />
        );
      })}
      <Dropzone onDrop={handleDrop} />
    </div>
  );
}