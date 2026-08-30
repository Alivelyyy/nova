// @ts-nocheck

import { Nova } from "@nova-ai/core"
import { ReadTool } from "@nova-ai/core/tools"

const nova = Nova.make({})

nova.tool.add(ReadTool)

nova.tool.add({
  name: "bash",
  schema: {
    type: "object",
    properties: {
      command: {
        type: "string",
        description: "The command to run.",
      },
    },
    required: ["command"],
  },
  execute(input, ctx) {},
})

nova.auth.add({
  provider: "openai",
  type: "api",
  value: process.env.OPENAI_API_KEY,
})

nova.agent.add({
  name: "build",
  permissions: [],
  model: {
    id: "gpt-5-5",
    provider: "openai",
    variant: "xhigh",
  },
})

const sessionID = await nova.session.create({
  agent: "build",
})

nova.subscribe((event) => {
  console.log(event)
})

await nova.session.prompt({
  sessionID,
  text: "hey what is up",
})

await nova.session.prompt({
  sessionID,
  text: "what is up with this",
  files: [
    {
      mime: "image/png",
      uri: "data:image/png;base64,xxxx",
    },
  ],
})

await nova.session.wait()

console.log(await nova.session.messages(sessionID))
