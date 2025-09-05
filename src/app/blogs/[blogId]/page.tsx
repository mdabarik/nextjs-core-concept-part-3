import BlogDetailsCard from "@/components/ui/BlogDetailsCard";
import { Blog } from "@/types";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ blogId: string }>;
}) {
  const { blogId } = await params;
  const res = await fetch(`http://localhost:3001/blogs/${blogId}`);
  const blog = await res.json();
  return {
    title: blog.title,
    description: blog.description,
  };
}

export const generateStaticParams = async () => {
  const res = await fetch("http://localhost:3001/blogs");
  const blogs = await res.json();
  return blogs.slice(0, 3).map((blog: Blog) => ({
    blogId: blog.id,
  }));
};

const BlogDetailPage = async ({
  params,
}: {
  params: Promise<{ blogId: string }>;
}) => {
  const { blogId } = await params;
  console.log(blogId);

  const res = await fetch(`http://localhost:3001/blogs/${blogId}`);
  const blog = await res.json();

  return (
    <div className="my-10">
      <BlogDetailsCard blog={blog} />
    </div>
  );
};

export default BlogDetailPage;
