import { useState } from 'react'
import { Upload, Loader2, CheckCircle, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { uploadImage, uploadVideo } from '@/lib/uploadthing'

interface FileUploadProps {
    type: 'image' | 'video'
    onUpload: (url: string) => void
    currentUrl?: string
    label?: string
}

export default function FileUpload({ type, onUpload, currentUrl, label }: FileUploadProps) {
    const [uploading, setUploading] = useState(false)
    const [preview, setPreview] = useState<string>(currentUrl || '')
    const [uploaded, setUploaded] = useState(false)
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [progress, setProgress] = useState(0)

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        // Validate file type
        if (type === 'image' && !file.type.startsWith('image/')) {
            console.error(`Invalid file type`);
            return
        }

        if (type === 'video' && !file.type.startsWith('video/')) {
            console.error(`Invalid file type`);
        }

        // Validate file size
        const maxSize = type === 'image' ? 4 * 1024 * 1024 : 512 * 1024 * 1024
        if (file.size > maxSize) {
            console.error(`File too large!`);
            return
        }

        setSelectedFile(file)

        // Create preview URL
        const previewUrl = URL.createObjectURL(file)
        setPreview(previewUrl)
    }

    const handleUpload = async () => {
        if (!selectedFile) return

        setUploading(true)
        setUploaded(false)
        setProgress(0)

        try {
            // Simulate progress
            const progressInterval = setInterval(() => {
                setProgress(prev => {
                    if (prev >= 90) {
                        clearInterval(progressInterval)
                        return prev
                    }
                    return prev + 10
                })
            }, 200)

            let url: string
            if (type === 'image') {
                console.log(selectedFile, 'Selected File')
                url = await uploadImage(selectedFile)
                console.log(url);
            } else {
                url = await uploadVideo(selectedFile)
                console.log(url);
            }

            clearInterval(progressInterval)
            setProgress(100)

            // Update with actual URL
            setPreview(url)
            onUpload(url)
            setUploaded(true)
            console.log(`Successfully updated`)

            setTimeout(() => setUploaded(false), 2000)
        } catch (error: any) {
            console.error('Upload error:', error)
        } finally {
            setUploading(false)
            setProgress(0)
        }
    }

    const handleRemove = () => {
        setPreview('')
        setSelectedFile(null)
        setUploaded(false)
        setProgress(0)
        onUpload('')
    }

    return (
        <div className="space-y-3">
            <Label className="text-sm font-medium">
                {label || (type === 'image' ? 'Image' : 'Video')}
            </Label>

            <div className="space-y-3">
                <div className="flex items-center gap-3 flex-wrap">
                    <Button
                        type="button"
                        variant="outline"
                        disabled={uploading}
                        onClick={() => document.getElementById(`file-${type}`)?.click()}
                        className="relative"
                    >
                        <Upload className="w-4 h-4 mr-2" />
                        Select {type}
                    </Button>

                    <input
                        id={`file-${type}`}
                        type="file"
                        accept={type === 'image' ? 'image/*' : 'video/*'}
                        className="hidden"
                        onChange={handleFileChange}
                    />

                    {selectedFile && !uploading && !uploaded && (
                        <Button
                            type="button"
                            onClick={handleUpload}
                            disabled={uploading}
                        >
                            <Upload className="w-4 h-4 mr-2" />
                            Upload
                        </Button>
                    )}

                    {uploading && (
                        <div className="flex items-center gap-2">
                            <Loader2 className="w-4 h-4 animate-spin text-primary" />
                            <span className="text-sm text-muted-foreground">
                                Uploading... {progress}%
                            </span>
                        </div>
                    )}

                    {uploaded && (
                        <div className="flex items-center text-sm text-green-600">
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Uploaded successfully
                        </div>
                    )}

                    {selectedFile && (
                        <span className="text-xs text-muted-foreground truncate max-w-xs">
                            {selectedFile.name}
                        </span>
                    )}
                </div>

                {uploading && (
                    <div className="w-full bg-secondary rounded-full h-2">
                        <div
                            className="bg-primary h-2 rounded-full transition-all duration-300"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                )}

                {preview && (
                    <div className="relative mt-2 inline-block">
                        {type === 'image' ? (
                            <img
                                src={preview}
                                alt="Preview"
                                className="w-full max-w-sm aspect-video object-cover rounded-lg border shadow-sm"
                            />
                        ) : (
                            <video
                                src={preview}
                                className="w-full max-w-sm aspect-video object-cover rounded-lg border shadow-sm"
                                controls
                            />
                        )}
                        <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="absolute top-2 right-2 h-8 w-8"
                            onClick={handleRemove}
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
}