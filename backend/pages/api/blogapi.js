import mongooseconnect from "@/lib/mongoose";
import { Blog } from "@/models/blog";

export default async function handle(req, res) {

    //if authenticated, connect to Mongodb
    await mongooseconnect();

    const { method } = req;

    // Send or Post Data
    if (method === "POST") {
        const { title, slug, description, blogcategory, tags, status } = req.body;

        const blogDoc = await Blog.create({
            title, slug, description, blogcategory, tags, status
        })

        res.json(blogDoc);
    }

    // Fetch or Get Data
    if (method === "GET") {
        if (req.query?.id) {
            res.json(await Blog.findById(req.query.id));
        } else {
            res.json((await Blog.find()).reverse()); //to show the most recent posts first if they were stored in chronological order
        }
    }

    // Updata Blog
    if (method === "PUT") {
        const { _id, title, slug, description, blogcategory, tags, status } = req.body;
        await Blog.updateOne({ _id }, { title, slug, description, blogcategory, tags, status });

        req.json(true);
    }

    // Delete Blog
    if (method === "DELETE") {
        if (req.query?.id) {
            await Blog.deleteOne({ _id: req.query?.id });
            res.json(true);
        }
    }
}