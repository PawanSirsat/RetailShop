import { useCallback, useState } from 'react'
import { FileWithPath, useDropzone } from 'react-dropzone'
import imageCompression from 'browser-image-compression'

import { convertFileToUrl } from '@/lib/utils'

type FileUploaderProps = {
  fieldChange: (files: File[]) => void
  mediaUrl: string
}

const FileUploader = ({ fieldChange, mediaUrl }: FileUploaderProps) => {
  const [file, setFile] = useState<File[]>([])
  const [fileUrl, setFileUrl] = useState<string>(mediaUrl)

  const compressImageToTargetSize = async (file: File) => {
    let compressedFile = file
    let quality = 1.0
    const targetSizeKB = 40
    const tolerance = 5
    const options = {
      maxWidthOrHeight: 1920,
      useWebWorker: true,
      initialQuality: quality,
    }

    while (compressedFile.size > (targetSizeKB + tolerance) * 1024) {
      quality -= 0.1
      options.initialQuality = quality
      compressedFile = await imageCompression(file, options)
      if (quality <= 0.1) break // Avoid infinite loop, break if quality is too low
    }

    return compressedFile
  }

  const onDrop = useCallback(
    async (acceptedFiles: FileWithPath[]) => {
      const compressedFiles = await Promise.all(
        acceptedFiles.map(async (file) => {
          try {
            const compressedFile = await compressImageToTargetSize(file)
            return new File([compressedFile], file.name, {
              type: file.type,
              lastModified: Date.now(),
            })
          } catch (error) {
            console.error('Error compressing the file:', error)
            return file
          }
        })
      )

      setFile(compressedFiles)
      fieldChange(compressedFiles)
      setFileUrl(convertFileToUrl(compressedFiles[0]))
    },
    [fieldChange]
  )

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpeg', '.jpg'],
    },
  })

  return (
    <div
      {...getRootProps()}
      className='flex flex-center flex-col bg-dark-3 rounded-xl cursor-pointer'
    >
      <input {...getInputProps()} className='cursor-pointer' />

      {fileUrl ? (
        <>
          <div className='flex flex-1 justify-center w-full p-5 lg:p-10'>
            <img src={fileUrl} alt='image' className='file_uploader-img' />
          </div>
          <p className='file_uploader-label'>Click or drag photo to replace</p>
        </>
      ) : (
        <div className=' '>
          <h3 className=' text-light-2 mb-2 mt-4'>Drag photo here</h3>
          <p className='text-light-4 small-regular mb-6'>SVG, PNG, JPG</p>
        </div>
      )}
    </div>
  )
}

export default FileUploader
