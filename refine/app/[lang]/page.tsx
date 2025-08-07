import LocalizedLink from "@/components/localized-link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button";
import { Dictionary, getDictionary, LangProps } from "@/lib/dictionaries";
import { Author, BlogMdxFrontmatter, getAllBlogs } from "@/lib/markdown";
import { formatDate2, stringToDate } from "@/lib/utils";
import { MoveUpRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Single unified page
export default async function HomeWithBlog({ params }: LangProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const blogs = (await getAllBlogs(lang)).sort(
    (a, b) => stringToDate(b.date).getTime() - stringToDate(a.date).getTime()
  );

  return (
    <div className="flex flex-col items-center justify-center px-2 py-12 sm:py-8 sm:min-h-[91vh] min-h-[88vh] text-center mt-60">
      {/* Hero Section */}
      <Link
        href="https://github.com/refineaidev"
        target="_blank"
        className="mb-5 sm:text-lg flex items-center gap-2 underline underline-offset-4 sm:-mt-12"
      >
        {dict.home.follow_github}
        <MoveUpRightIcon className="w-4 h-4 font-extrabold" />
      </Link>
      <h1 className="text-3xl font-bold mb-4 sm:text-6xl">
        {dict.home.main_header}
      </h1>
      <p className="mb-8 sm:text-lg max-w-[1200px] text-muted-foreground">
        {dict.home.sub_header}
      </p>
      <div className="flex flex-row items-center gap-5 mb-12">
        <LocalizedLink
          href="/about"
          className={buttonVariants({
            className: "px-6",
            size: "lg",
          })}
        >
          {dict.home.our_values}
        </LocalizedLink>
      </div>

      {/* Blog Section */}
      <div className="w-full max-w-7xl mx-auto flex flex-col gap-1 pt-2 mt-40">
        <div className="mb-7 flex flex-col gap-2 text-left w-full">
          <h2 className="text-3xl font-extrabold">{dict.blog.title}</h2>
          <p className="text-muted-foreground">{dict.blog.sub_title}</p>
        </div>

        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 sm:gap-8 gap-4 mb-5 w-full">
          {blogs.map((blog) => (
            <BlogCard {...blog} slug={blog.slug} key={blog.slug} dict={dict} />
          ))}
        </div>
      </div>
    </div>
  );
}

// Blog Card Component
function BlogCard({
  date,
  title,
  description,
  slug,
  cover,
  authors,
  dict,
}: BlogMdxFrontmatter & { slug: string; dict: Dictionary }) {
  return (
    <LocalizedLink
      href={`/blog/${slug}`}
      className="flex flex-col gap-2 items-start border rounded-md py-5 px-3 min-h-[400px]"
    >
      <h3 className="text-md font-semibold -mt-1 pr-7">{title}</h3>
      <div className="w-full">
        <Image
          src={cover}
          alt={title}
          width={400}
          height={150}
          quality={80}
          className="w-full rounded-md object-cover h-[180px] border"
        />
      </div>
      <p className="text-sm text-muted-foreground">{description}</p>
      <div className="flex items-center justify-between w-full mt-auto">
        <p className="text-[13px] text-muted-foreground">
          {dict.blog.published_on} {formatDate2(date)}
        </p>
        <AvatarGroup users={authors} />
      </div>
    </LocalizedLink>
  );
}

// Author Avatars
function AvatarGroup({ users, max = 4 }: { users: Author[]; max?: number }) {
  const displayUsers = users.slice(0, max);
  const remainingUsers = Math.max(users.length - max, 0);

  return (
    <div className="flex items-center">
      {displayUsers.map((user, index) => (
        <Avatar
          key={user.username}
          className={`inline-block border-2 w-9 h-9 border-background ${
            index !== 0 ? "-ml-3" : ""
          }`}
        >
          <AvatarImage src={user.avatar} alt={user.username} />
          <AvatarFallback>
            {user.username.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      ))}
      {remainingUsers > 0 && (
        <Avatar className="-ml-3 inline-block border-2 border-background hover:translate-y-1 transition-transform">
          <AvatarFallback>+{remainingUsers}</AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}
