import express from "express";
import { Tree } from "./models.js";

const app = express();
app.use(express.json());

app.get("/api", async (req, res) => res.json(await Tree.findAll()));

app.post("/api", async (req, res) => {
  const id = req.body.id || 0;
  const existingTree = await Tree.findByPk(id);
  if (existingTree) {
    await existingTree.update({
      size: req.body.size,
      type: req.body.type,
    });
  } else {
    await Tree.create({
      size: req.body.size,
      type: req.body.type,
    });
  }
  res.end();
});

const port = 3000;
app.listen(port, () => console.log(`Listening on :${port}`));

// for (let i = 1; i < 5; i++)
//   Tree.create({
//     type: "christmas tree",
//     size: i,
//   });
