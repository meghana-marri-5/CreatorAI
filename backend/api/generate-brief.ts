export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { prompt } = req.body || {};
  const apiKey = process.env.GEMINI_API_KEY || process.env.AI_API_KEY;

  let isLive = false;
  let briefResult = null;

  if (apiKey) {
    try {
      const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
      const aiRes = await fetch(geminiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `Generate a structured creative brief in strict JSON format for this brand request: "${prompt}".
JSON structure:
{
  "title": "Title",
  "overview": "Overview",
  "businessObjective": "Objective",
  "contentType": "Content Type",
  "targetAudience": "Audience",
  "creativeDirection": "Creative Direction",
  "suggestedDeliverables": ["Deliverable 1"],
  "formatDimensions": "Dimensions",
  "requiredSkills": ["Skill 1"],
  "suggestedAiTools": ["Tool 1"],
  "distributionPlatform": "Platform",
  "estimatedTimelineDays": 14,
  "budgetEstimate": "$1,500 - $2,500",
  "commercialClarifications": ["Question 1"]
}`
            }]
          }],
          generationConfig: {
            responseMimeType: "application/json"
          }
        })
      });

      if (aiRes.ok) {
        const data = await aiRes.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) {
          briefResult = JSON.parse(text);
          isLive = true;
        }
      }
    } catch (e) {
      console.warn('Vercel serverless Gemini call failed, falling back:', e);
    }
  }

  if (!briefResult) {
    briefResult = {
      title: "Commercial High-Motion AI Video Ad & Social Campaign",
      overview: "A visually striking 15-second generative video ad engineered for high retention and viral potential on TikTok, Reels, and digital channels.",
      businessObjective: "Establish bold brand salience and drive immediate viewer engagement with cinematic generative video storytelling.",
      contentType: "AI Video",
      targetAudience: "Digital-native consumers aged 18-35 who appreciate modern dynamic aesthetics.",
      creativeDirection: "Dynamic handheld kinetic camera motion, anamorphic 35mm lens blur, high-contrast neon/ambient lighting, hyperrealistic physics and fluid particles.",
      suggestedDeliverables: [
        "1x 15s Hero Master Commercial (4K ProRes 422 HQ)",
        "3x 9:16 Vertical Cutdowns for TikTok & Reels",
        "3x High-Resolution Keyframe Stills for Social Banners",
        "Complete Generation Seed Manifest & Workflow Documentation"
      ],
      formatDimensions: "9:16 Vertical (1080x1920) + 16:9 Master (3840x2160 4K)",
      requiredSkills: ["Runway Gen-3 / Kling Diffusion", "Camera Trajectory Control", "Topaz 4K Upscaling", "DaVinci Color Calibration"],
      suggestedAiTools: ["Runway Gen-3 Alpha", "Kling AI", "Midjourney v6.1", "Topaz Video AI", "DaVinci Resolve"],
      distributionPlatform: "TikTok, Instagram Reels, YouTube Shorts, Paid Meta Ads",
      estimatedTimelineDays: 10,
      budgetEstimate: "$1,800 - $2,600",
      commercialClarifications: [
        "Are brand logos and packshots to be inserted via post-composite or embedded via ControlNet?",
        "Do you require exclusive perpetual buyout or digital advertising buyout for 12 months?"
      ]
    };
  }

  return res.status(200).json({
    success: true,
    isLiveAi: isLive,
    mode: isLive ? 'Live Gemini 1.5 Flash API' : 'Deterministic Demo Mode (Zero API Key Needed)',
    brief: briefResult
  });
}
