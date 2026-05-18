import OpenAI, {toFile} from "openai";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function transformGarden() {

  // const before_img = "before_rgba.png";
  const before_img = "before.png";

  const result = await openai.images.edit({
    model: "gpt-image-1.5",

    image: await toFile(fs.readFileSync(before_img), 
    before_img, {
      type: "image/png",
    }),

    prompt: `
    Please add a cat walking in the garden.
`,
  });

  const imageBase64 = result.data[0].b64_json;
  fs.writeFileSync("after.png", Buffer.from(imageBase64, "base64"));
  console.log("Saved edited image to after.png");
}

transformGarden();