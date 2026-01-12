import { useState } from 'react'
import { Plus, Pencil, Trash2, Newspaper as NewspaperIcon, Loader2, User, Calendar } from 'lucide-react'
import { useNews } from '@/hooks/useNews'
import type { News, CreateNews } from '@/types'
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
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import FileUpload from '@/components/FileUpload'
import { formatDate } from '@/lib/utils'

export default function NewsPage() {
    const { news, isLoading, createNews, updateNews, deleteNews } = useNews()
    const [open, setOpen] = useState(false)
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const [newsToDelete, setNewsToDelete] = useState<string | null>(null)
    const [editingNews, setEditingNews] = useState<News | null>(null)
    const [formData, setFormData] = useState<CreateNews>({
        titleUz: '',
        titleRu: '',
        titleEn: '',
        descriptionUz: '',
        descriptionRu: '',
        descriptionEn: '',
        imageUrl: '',
        author: '',
        releasedAt: new Date().toISOString().slice(0, 16),
    })

    const resetForm = () => {
        setFormData({
            titleUz: '',
            titleRu: '',
            titleEn: '',
            descriptionUz: '',
            descriptionRu: '',
            descriptionEn: '',
            imageUrl: '',
            author: '',
            releasedAt: new Date().toISOString().slice(0, 16),
        })
        setEditingNews(null)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (editingNews) {
            await updateNews.mutateAsync({ id: editingNews.id, data: formData })
        } else {
            await createNews.mutateAsync(formData)
        }
        setOpen(false)
        resetForm()
    }

    const handleEdit = (newsItem: News) => {
        setEditingNews(newsItem)
        setFormData({
            titleUz: newsItem.titleUz,
            titleRu: newsItem.titleRu,
            titleEn: newsItem.titleEn,
            descriptionUz: newsItem.descriptionUz,
            descriptionRu: newsItem.descriptionRu,
            descriptionEn: newsItem.descriptionEn,
            imageUrl: newsItem.imageUrl,
            author: newsItem.author,
            releasedAt: new Date(newsItem.releasedAt).toISOString().slice(0, 16),
        })
        setOpen(true)
    }

    const handleDeleteClick = (id: string) => {
        setNewsToDelete(id)
        setDeleteDialogOpen(true)
    }

    const handleDeleteConfirm = async () => {
        if (newsToDelete) {
            await deleteNews.mutateAsync(newsToDelete)
            setDeleteDialogOpen(false)
            setNewsToDelete(null)
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
                    <h1 className="text-3xl font-bold tracking-tight">News</h1>
                    <p className="text-muted-foreground mt-1">Manage your news articles</p>
                </div>
                <Dialog open={open} onOpenChange={(o) => { setOpen(o); if (!o) resetForm() }}>
                    <DialogTrigger asChild>
                        <Button className="shadow-md">
                            <Plus className="w-4 h-4 mr-2" />
                            Add News
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>{editingNews ? 'Edit News' : 'Create New News'}</DialogTitle>
                            <DialogDescription>
                                {editingNews ? 'Update your news article' : 'Add a new news article'}
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
                            <FileUpload
                                type="image"
                                currentUrl={formData.imageUrl}
                                onUpload={(url) => setFormData({ ...formData, imageUrl: url })}
                            />

                            <div className="space-y-2">
                                <Label htmlFor="author">Author</Label>
                                <Input
                                    id="author"
                                    placeholder="Enter author name"
                                    value={formData.author}
                                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="releasedAt">
                                    <Calendar className="w-4 h-4 inline mr-2" />
                                    Issue Date & Time
                                </Label>
                                <Input
                                    id="releasedAt"
                                    type="datetime-local"
                                    value={formData.releasedAt}
                                    onChange={(e) => setFormData({ ...formData, releasedAt: e.target.value })}
                                    required
                                />
                            </div>

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
                                            placeholder="Enter title in English"
                                            value={formData.titleEn}
                                            onChange={(e) => setFormData({ ...formData, titleEn: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="descriptionEn">Description (English)</Label>
                                        <Textarea
                                            id="descriptionEn"
                                            placeholder="Enter description in English"
                                            value={formData.descriptionEn}
                                            onChange={(e) => setFormData({ ...formData, descriptionEn: e.target.value })}
                                            required
                                            rows={4}
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
                                    <div className="space-y-2">
                                        <Label htmlFor="descriptionUz">Tavsif (O'zbekcha)</Label>
                                        <Textarea
                                            id="descriptionUz"
                                            placeholder="O'zbek tilida tavsif kiriting"
                                            value={formData.descriptionUz}
                                            onChange={(e) => setFormData({ ...formData, descriptionUz: e.target.value })}
                                            required
                                            rows={4}
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
                                    <div className="space-y-2">
                                        <Label htmlFor="descriptionRu">Описание (Русский)</Label>
                                        <Textarea
                                            id="descriptionRu"
                                            placeholder="Введите описание на русском"
                                            value={formData.descriptionRu}
                                            onChange={(e) => setFormData({ ...formData, descriptionRu: e.target.value })}
                                            required
                                            rows={4}
                                        />
                                    </div>
                                </TabsContent>
                            </Tabs>

                            <div className="flex justify-end gap-3 pt-4">
                                <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={createNews.isPending || updateNews.isPending}>
                                    {(createNews.isPending || updateNews.isPending) && (
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    )}
                                    {editingNews ? 'Update News' : 'Create News'}
                                </Button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            {news.length === 0 ? (
                <Card className="p-12">
                    <div className="text-center space-y-3">
                        <NewspaperIcon className="w-12 h-12 mx-auto text-muted-foreground" />
                        <h3 className="text-lg font-semibold">No news articles yet</h3>
                        <p className="text-sm text-muted-foreground">Get started by creating your first news article</p>
                    </div>
                </Card>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {news.map((item) => (
                        <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                            <CardHeader className="pb-3">
                                <div className="flex items-start justify-between">
                                    <Badge variant="secondary" className="mb-2">
                                        <NewspaperIcon className="w-3 h-3 mr-1" />
                                        Article
                                    </Badge>
                                    <div className="text-right">
                                        <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                                            <Calendar className="w-3 h-3" />
                                            {formatDate(item.releasedAt)}
                                        </div>
                                        <span className="text-xs text-muted-foreground">
                                            Created: {formatDate(item.createdAt)}
                                        </span>
                                    </div>
                                </div>
                                <CardTitle className="text-lg line-clamp-2">{item.titleEn}</CardTitle>
                                <CardDescription className="flex items-center gap-1 mt-1">
                                    <User className="w-3 h-3" />
                                    {item.author}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="pb-3">
                                <img
                                    src={item.imageUrl}
                                    alt={item.titleEn}
                                    className="w-full h-48 object-cover rounded-md mb-3"
                                />
                                <p className="text-sm text-muted-foreground line-clamp-3">
                                    {item.descriptionEn}
                                </p>
                            </CardContent>
                            <CardFooter className="flex justify-end gap-2 pt-3 border-t">
                                <Button size="sm" variant="outline" onClick={() => handleEdit(item)}>
                                    <Pencil className="w-3 h-3 mr-1" />
                                    Edit
                                </Button>
                                <Button
                                    size="sm"
                                    variant="destructive"
                                    onClick={() => handleDeleteClick(item.id)}
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
                            This action cannot be undone. This will permanently delete the news article.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDeleteConfirm} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                            {deleteNews.isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}