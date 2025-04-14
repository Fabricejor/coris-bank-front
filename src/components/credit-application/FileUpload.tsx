'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
// import { FiDownload } from "react-icons/fi";
import { FiUpload } from "react-icons/fi";
import { FiFile } from "react-icons/fi";
import { FiX } from "react-icons/fi";
interface FileUploadProps {
  onFileChange: (file: File | null) => void;
}

export function FileUpload({ onFileChange }: FileUploadProps) {
  const [file, setFile] = useState<File | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
      onFileChange(acceptedFiles[0]);
    }
  }, [onFileChange]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'text/plain': ['.txt'],
    },
    maxFiles: 1,
  });

  const removeFile = () => {
    setFile(null);
    onFileChange(null);
  };

  return (
    <div className="w-full">
      {!file ? (
        <div 
          {...getRootProps()} 
          className={`border-2 border-dashed p-8 rounded-lg text-center cursor-pointer transition-colors
            ${isDragActive 
              ? 'border-main bg-main bg-opacity-5' 
              : 'border-gray-300 hover:border-main'}`
          }
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center justify-center gap-2">
            <FiUpload className="h-10 w-10 text-main" />
            <p className="text-lg font-medium">
              {isDragActive ? 'Déposez le fichier ici' : 'Glissez-déposez votre fichier ou cliquez pour sélectionner'}
            </p>
            <p className="text-sm text-gray-500">
              Formats acceptés: PDF, DOC, DOCX, TXT
            </p>
          </div>
        </div>
      ) : (
        <div className="border-2 border-main rounded-lg p-4 bg-main bg-opacity-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FiFile className="h-8 w-8 text-main" />
              <div>
                <p className="font-medium">{file.name}</p>
                <p className="text-sm text-gray-500">{(file.size / 1024).toFixed(0)} KB</p>
              </div>
            </div>
            <button 
              onClick={removeFile}
              className="p-1 rounded-full bg-white border hover:bg-gray-100"
              aria-label="Remove file"
            >
              <FiX className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 