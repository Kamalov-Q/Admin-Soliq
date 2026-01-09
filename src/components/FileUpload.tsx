import { useState } from 'react'
import { Upload, Loader2, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { uploadImage, uploadVideo } from '@/lib/api'

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

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        setUploading(true)
        setUploaded(false)
        try {
            const url = type === 'image' ? await uploadImage(file) : await uploadVideo(file)
            setPreview(url)
            onUpload(url)
            setUploaded(true)
            setTimeout(() => setUploaded(false), 2000)
        } catch (error) {
            console.error('Upload failed:', error)
        } finally {
            setUploading(false)
        }
    }

    return (
        <div className="space-y-3">
            <Label className="text-sm font-medium">
                {label || (type === 'image' ? 'Image' : 'Video')}
            </Label>
            <div className="flex items-center gap-3">
                <Button
                    type="button"
                    variant="outline"
                    disabled={uploading}
                    onClick={() => document.getElementById(`file-${type}`)?.click()}
                    className="relative"
                >
                    {uploading ? (
                        <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Uploading...
                        </>
                    ) : uploaded ? (
                        <>
                            <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                            Uploaded
                        </>
                    ) : (
                        <>
                            <Upload className="w-4 h-4 mr-2" />
                            Upload {type}
                        </>
                    )}
                </Button>
                <input
                    id={`file-${type}`}
                    type="file"
                    accept={type === 'image' ? 'image/*' : 'video/*'}
                    className="hidden aspect-video"
                    onChange={handleFileChange}
                />
                {preview && (
                    <span className="text-xs text-muted-foreground truncate max-w-xs">
                        File selected
                    </span>
                )}
            </div>
            {preview && type === 'image' && (
                <div className="mt-2">
                    <img
                        src={preview}
                        alt="Preview"
                        className="w-full max-w-sm rounded-lg border shadow-sm"
                    />
                </div>
            )}
            {preview && type === 'video' && (
                <div className="mt-2">
                    <video
                        src={preview}
                        className="w-full max-w-sm rounded-lg border shadow-sm"
                        controls
                    />
                </div>
            )}
        </div>
    )
}