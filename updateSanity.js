const fs = require('fs');
const { createClient } = require('@sanity/client');

const envFile = fs.readFileSync('.env.local', 'utf8');
const env = envFile.split('\n').reduce((acc, line) => {
  const [key, ...values] = line.split('=');
  if (key) acc[key.trim()] = values.join('=').trim();
  return acc;
}, {});

const client = createClient({
  projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2021-10-21',
  useCdn: false,
  token: env.SANITY_API_WRITE_TOKEN
});

const newBackgroundInformation = "<p>I am a Senior Full-Stack Web3 Engineer with 6+ years of experience architecting and shipping secure, high-impact decentralized systems. From protocol design and Solidity smart contract optimization to highly scalable Node/Go backends and polished React/Next.js interfaces, I own the entire technology stack.</p> </br> <p>My expertise spans DeFi products, enterprise-grade stablecoins, and complex multi-chain architectures across Ethereum, Arbitrum, and Polygon. I specialize in solving hard engineering problems—whether it is leading protocol upgrades, mitigating critical security audit findings, or engineering zero-to-one products that scale to millions in TVL.</p> </br> <p>If you are looking for an experienced technical leader who can take complex requirements and transform them into deeply engineered, user-centric, and audit-ready products, let's connect. I focus on building resilient systems that are designed to scale and built to last.</p>";

const newRole = "Senior Full-Stack Web3 Engineer";

async function main() {
  console.log("Fetching pageInfo...");
  const pageInfo = await client.fetch('*[_type == "pageInfo"][0]');
  if (pageInfo) {
    console.log("Updating pageInfo...");
    await client
      .patch(pageInfo._id)
      .set({
        backgroundInformation: newBackgroundInformation,
        role: newRole
      })
      .commit();
    console.log("pageInfo successfully updated.");
  }

  console.log("Fetching projects...");
  const projects = await client.fetch('*[_type == "project"]{_id, title, summary, linkToBuild, linkToGithub, "hasImage": defined(image.asset)}');

  for (const project of projects) {
    if (!project.hasImage) {
      const targetUrl = project.linkToBuild || project.linkToGithub;
      if (!targetUrl) {
        console.log("Skipping " + project.title + " - no URL found");
        continue;
      }
      console.log("Fetching screenshot for " + project.title + " (" + targetUrl + ")...");
      try {
        const thumUrl = "https://image.thum.io/get/width/1200/crop/800/" + targetUrl;
        const res = await fetch(thumUrl);
        if (!res.ok) throw new Error("Failed to fetch image: " + res.statusText);
        const arrayBuffer = await res.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        console.log("Uploading image for " + project.title + "...");
        const filename = project.title.replace(/\\s+/g, '-').toLowerCase() + "-screenshot.jpg";
        const imageAsset = await client.assets.upload('image', buffer, {
          filename: filename
        });

        console.log("Patching project " + project.title + " with new image asset...");
        await client
          .patch(project._id)
          .set({
            image: {
              _type: 'image',
              asset: {
                _type: 'reference',
                _ref: imageAsset._id
              }
            }
          })
          .commit();

        console.log("Successfully updated image for " + project.title);
      } catch (err) {
        console.error("Error processing " + project.title + ": ", err.message);
      }
    } else {
      console.log("Project " + project.title + " already has an image, skipping.");
    }
  }

  console.log("Done!");
}

main().catch(console.error);
