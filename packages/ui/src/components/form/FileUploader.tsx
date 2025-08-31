import React, { useState, useEffect, useCallback } from 'react';
import { useDropzone, FileRejection } from 'react-dropzone';
import { Typography } from '../general/Typography';
import { Button } from '../general/Button';
import { Icon } from '../general/Icon';

export interface FileUploaderProps {
  onFileChange: (file: File | null) => void;
  className?: string;
}

export const FileUploader = ({ onFileChange, className }: FileUploaderProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[], fileRejections: FileRejection[]) => {
    const firstError = fileRejections[0]?.errors[0];
    if (firstError) {
      console.warn(`File rejected: ${firstError.code} - ${firstError.message}`);
      return;
    }

    if (acceptedFiles.length > 0) {
      const selectedFile = acceptedFiles[0];
      if (selectedFile) {
        setFile(selectedFile);
        setPreview(URL.createObjectURL(selectedFile));
        onFileChange(selectedFile);
      }
    }
  }, [onFileChange]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpeg', '.png', '.jpg', '.gif'] },
    multiple: false,
  });

  const removeFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (file && preview) {
      setFile(null);
      URL.revokeObjectURL(preview);
      setPreview(null);
      onFileChange(null);
    }
  };

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  return (
    <div
      {...getRootProps()}
      // Style Change: Updated padding, border, and background to match Figma.
      className={`flex flex-col items-center justify-center w-full px-[54px] py-[21px] bg-white border border-dashed rounded-lg cursor-pointer transition-colors ${isDragActive ? 'border-primary bg-primary-50' : 'border-neutral-gray-100'
        } ${className}`}
    >
      <input {...getInputProps()} />
      {file && preview ? (
        // Preview State remains the same
        <div className="text-center">
          <img src={preview} alt={file.name} className="max-h-40 mx-auto mb-4 rounded-md" />
          <Typography>{file.name}</Typography>
          <Button variant="danger" size="sm" onClick={removeFile} className="mt-2">
            Remove
          </Button>
        </div>
      ) : (
        // Empty State content is updated to match Figma
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <Icon name="upload-cloud" className="w-[33px] h-[33px] text-primary" />
          <Typography variant="body2" className="text-text-header">
            Click to upload or drag and drop
          </Typography>
        </div>
      )}
    </div>
  );
};