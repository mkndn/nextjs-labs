"use client";

import { CldUploadButton } from "next-cloudinary";
import Image from "next/image";

type ImageUploadProps = {
  value: string;
  onChange: (src: string) => void;
  disabled: boolean;
};

import React, { useEffect, useState } from "react";

const ImageUpload = ({ value, onChange, disabled }: ImageUploadProps) => {
  const [isMounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <div className="space-y-4 w-full flex flex-col justify-center items-center">
      <CldUploadButton
        onUpload={(result: any) => onChange(result.info.secure_url)}
        options={{
          maxFiles: 1,
        }}
        uploadPreset="x2yrnfzq"
      >
        <div className="p-4 border-4 border-dashed border-primary/10 rounded-lg hover:opacity-75 transition flex flex-col space-y-2 items-center justify-center">
          <div className="relative h-40 w-40">
            <Image
              fill
              alt="Upload"
              src={value || "/placeholder.svg"}
              className="rounded-lg object-cover"
            />
          </div>
        </div>
      </CldUploadButton>
    </div>
  );
};

export default ImageUpload;
