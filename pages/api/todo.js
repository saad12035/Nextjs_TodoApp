import clientPromise from "../../lib/mongodb";

export default async function handler(req, res){
    const method=req.method
    switch (method){
        case 'POST':
            try {
                const client = await clientPromise;
                const db = client.db("todos");
                const result = await db.collection("todo").insertOne(req.body);
                res.json({ status: 200, data: result });
            } catch (e) {
                console.error(e);
            }
            break;
        case 'DELETE':
            try {
                const client = await clientPromise;
                const db = client.db("todos");
                const result = await db.collection("todo").deleteOne(req.body);
                res.json({ status: 200, data: result });
            } catch (e) {
                console.error(e);
            }
            break;
        case 'GET':
            try {
                const client = await clientPromise;
                const db = client.db("todos");
                const result = await db.collection("todo").find({}).toArray();
                res.json({ status: 200, data: result });
            } catch (e) {
                console.error(e);
            }
    }
}