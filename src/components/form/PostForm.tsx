import * as z from 'zod'
import { Models } from 'appwrite'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import { ProductValidation } from '@/lib/validation'
import { useToast } from '@/components/ui/use-toast'
import { useCreatePost, useUpdatePost } from '@/lib/react-query/queries'
import { Button } from '../ui/button'
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from '../ui/form'
import { Input } from '../ui/input'
import FileUploader from '../shared/FileUploader'
import { Loader } from 'lucide-react'

type PostFormProps = {
  post?: Models.Document
  action: 'Create' | 'Update'
}

const PostForm = ({ post, action }: PostFormProps) => {
  const navigate = useNavigate()
  const { toast } = useToast()
  const form = useForm<z.infer<typeof ProductValidation>>({
    resolver: zodResolver(ProductValidation),
    defaultValues: {
      productName: post ? post?.productName : '',
      file: [],
      productPrice: post ? post.productPrice : '',
    },
  })

  // Query
  const { mutateAsync: createPost, isLoading: isLoadingCreate } =
    useCreatePost()
  const { mutateAsync: updatePost, isLoading: isLoadingUpdate } =
    useUpdatePost()

  // Handler
  const onSubmit = async (value: z.infer<typeof ProductValidation>) => {
    // ACTION = UPDATE
    if (post && action === 'Update') {
      const updatedPost = await updatePost({
        ...value,
        postId: post.$id,
        imageId: post.imageId,
        imageUrl: post.imageUrl,
      })

      if (!updatedPost) {
        toast({
          title: `${action} post failed. Please try again.`,
        })
      }
      return navigate(`/`)
    }

    // ACTION = CREATE
    const newPost = await createPost({
      ...value,
    })

    if (!newPost) {
      toast({
        title: `${action} product failed. Please try again.`,
      })
    }
    navigate('/')
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex flex-col gap-9 w-full  max-w-5xl'
      >
        <FormField
          control={form.control}
          name='productName'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type='text'
                  className='shad-input'
                  {...field}
                  placeholder='Product Name'
                />
              </FormControl>
              <FormMessage className='shad-form_message' />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='productPrice'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type='text'
                  className='shad-input'
                  {...field}
                  placeholder='Product Price'
                />
              </FormControl>
              <FormMessage className='shad-form_message' />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='file'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='shad-form_label'>Add Photos</FormLabel>
              <FormControl>
                <FileUploader
                  fieldChange={field.onChange}
                  mediaUrl={post?.imageUrl}
                />
              </FormControl>
              <FormMessage className='shad-form_message' />
            </FormItem>
          )}
        />

        <div className='flex gap-4 items-center justify-end'>
          <Button
            type='button'
            className='shad-button_dark_4'
            onClick={() => navigate(-1)}
          >
            Cancel
          </Button>
          <Button
            type='submit'
            className='shad-button_primary whitespace-nowrap'
            disabled={isLoadingCreate || isLoadingUpdate}
          >
            {(isLoadingCreate || isLoadingUpdate) && <Loader />}
            {action}
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default PostForm
