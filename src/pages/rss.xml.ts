import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export async function GET(context: any) {
    let posts = await getCollection("post");

    return rss({
        title: "Paperbark",
        description: "Paperbark's posts and updates",
        site: context.site,
        items: posts
            .filter((post) => !post.data.unlisted)
            .toSorted((a, b) => b.data.published.getTime() - a.data.published.getTime())
            .map((post) => ({
                title: post.data.title,
                author: "Paperbark",
                description: post.data.summary?.map((line) => `<p>${line}</p>`).join(""),
                link: new URL(post.data.url ?? `/post/${post.data.slug}`, context.site).toString(),
                pubDate: post.data.published,
            })),
    });
}
