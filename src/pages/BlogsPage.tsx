import { useState } from 'react'
import { Plus, Pencil, Trash2, Video as VideoIcon, Loader2 } from 'lucide-react'
import { useBlogs } from '@/hooks/useBlogs'
import type { Blog, CreateBlog } from '@/types'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import FileUpload from '@/components/FileUpload'
import { formatDate } from '@/lib/utils'

export default function BlogsPage() {
    const { blogs, isLoading, createBlog, updateBlog, deleteBlog } = useBlogs()
    const [open, setOpen] = useState(false)
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const [blogToDelete, setBlogToDelete] = useState<string | null>(null)
    const [editingBlog, setEditingBlog] = useState<Blog | null>(null)
    const [formData, setFormData] = useState<CreateBlog>({
        videoUrl: '',
        titleUz: '',
        titleRu: '',
        titleEn: '',
    });

    const resetForm = () => {
        setFormData({ videoUrl: '', titleUz: '', titleRu: '', titleEn: '' })
        setEditingBlog(null)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (editingBlog) {
            await updateBlog.mutateAsync({ id: editingBlog.id, data: formData })
        } else {
            await createBlog.mutateAsync(formData)
        }
        setOpen(false)
        resetForm()
    }

    const handleEdit = (blog: Blog) => {
        setEditingBlog(blog)
        setFormData({
            videoUrl: blog.videoUrl,
            titleUz: blog.titleUz,
            titleRu: blog.titleRu,
            titleEn: blog.titleEn,
        })
        setOpen(true)
    }

    const handleDeleteClick = (id: string) => {
        setBlogToDelete(id)
        setDeleteDialogOpen(true)
    }

    const handleDeleteConfirm = async () => {
        if (blogToDelete) {
            await deleteBlog.mutateAsync(blogToDelete)
            setDeleteDialogOpen(false)
            setBlogToDelete(null)
        }
    }

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-96">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Blogs</h1>
                    <p className="text-muted-foreground mt-1">Manage your blog posts with videos</p>
                </div>
                <Dialog open={open} onOpenChange={(o) => { setOpen(o); if (!o) resetForm() }}>
                    <DialogTrigger asChild>
                        <Button className="shadow-md">
                            <Plus className="w-4 h-4 mr-2" />
                            Add Blog
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>{editingBlog ? 'Edit Blog' : 'Create New Blog'}</DialogTitle>
                            <DialogDescription>
                                {editingBlog ? 'Update your blog details' : 'Add a new blog post with video content'}
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
                            <FileUpload
                                type="video"
                                currentUrl={formData.videoUrl}
                                onUpload={(url) => {
                                    console.log(url, 'From file upload');
                                    setFormData({ ...formData, videoUrl: url });
                                }}
                            />

                            <Tabs defaultValue="en" className="w-full">
                                <TabsList className="grid w-full grid-cols-3">
                                    <TabsTrigger value="en">English</TabsTrigger>
                                    <TabsTrigger value="uz">O'zbek</TabsTrigger>
                                    <TabsTrigger value="ru">Русский</TabsTrigger>
                                </TabsList>
                                <TabsContent value="en" className="space-y-4 mt-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="titleEn">Title (English)</Label>
                                        <Input
                                            id="titleEn"
                                            placeholder="Enter blog title in English"
                                            value={formData.titleEn}
                                            onChange={(e) => setFormData({ ...formData, titleEn: e.target.value })}
                                            required
                                        />
                                    </div>
                                </TabsContent>
                                <TabsContent value="uz" className="space-y-4 mt-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="titleUz">Sarlavha (O'zbekcha)</Label>
                                        <Input
                                            id="titleUz"
                                            placeholder="O'zbek tilida sarlavha kiriting"
                                            value={formData.titleUz}
                                            onChange={(e) => setFormData({ ...formData, titleUz: e.target.value })}
                                            required
                                        />
                                    </div>
                                </TabsContent>
                                <TabsContent value="ru" className="space-y-4 mt-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="titleRu">Заголовок (Русский)</Label>
                                        <Input
                                            id="titleRu"
                                            placeholder="Введите заголовок на русском"
                                            value={formData.titleRu}
                                            onChange={(e) => setFormData({ ...formData, titleRu: e.target.value })}
                                            required
                                        />
                                    </div>
                                </TabsContent>
                            </Tabs>

                            <div className="flex justify-end gap-3 pt-4">
                                <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={createBlog.isPending || updateBlog.isPending}>
                                    {(createBlog.isPending || updateBlog.isPending) && (
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    )}
                                    {editingBlog ? 'Update Blog' : 'Create Blog'}
                                </Button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            {blogs.length === 0 ? (
                <Card className="p-12">
                    <div className="text-center space-y-3">
                        <VideoIcon className="w-12 h-12 mx-auto text-muted-foreground" />
                        <h3 className="text-lg font-semibold">No blogs yet</h3>
                        <p className="text-sm text-muted-foreground">Get started by creating your first blog post</p>
                    </div>
                </Card>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {blogs.map((blog) => (
                        <Card key={blog.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                            <CardHeader className="pb-3">
                                <div className="flex items-start justify-between">
                                    <Badge variant="secondary" className="mb-2">
                                        <VideoIcon className="w-3 h-3 mr-1" />
                                        Video
                                    </Badge>
                                    <span className="text-xs text-muted-foreground">
                                        {formatDate(blog.createdAt)}
                                    </span>
                                </div>
                                <CardTitle className="text-lg line-clamp-2">{blog.titleEn}</CardTitle>
                                <CardDescription className="line-clamp-1">
                                    {blog.titleRu}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="pb-3">
                                <video
                                    src={blog.videoUrl}
                                    className="w-full h-48 object-cover rounded-md"
                                    controls
                                />
                            </CardContent>
                            <CardFooter className="flex justify-end gap-2 pt-3 border-t">
                                <Button size="sm" variant="outline" onClick={() => handleEdit(blog)}>
                                    <Pencil className="w-3 h-3 mr-1" />
                                    Edit
                                </Button>
                                <Button
                                    size="sm"
                                    variant="destructive"
                                    onClick={() => handleDeleteClick(blog.id)}
                                >
                                    <Trash2 className="w-3 h-3 mr-1" />
                                    Delete
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            )}

            <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the blog post.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDeleteConfirm} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                            {deleteBlog.isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}