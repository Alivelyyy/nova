/// <reference path="../markdown.d.ts" />

export * as SkillPlugin from "./skill"

import { define } from "./internal"
import { Effect } from "effect"
import { AbsolutePath } from "../schema"
import { SkillV2 } from "../skill"
import customizeOpencodeContent from "./skill/customize-nova.md" with { type: "text" }

export const CustomizeOpencodeContent = customizeOpencodeContent

export const Plugin = define({
  id: "skill",
  effect: Effect.fn(function* (ctx) {
    yield* ctx.skill.transform((draft) => {
      draft.source(
        SkillV2.EmbeddedSource.make({
          type: "embedded",
          skill: SkillV2.Info.make({
            name: "customize-nova",
            description:
              "Use ONLY when the user is editing or creating nova's own configuration: nova.json, nova.jsonc, files under .nova/, or files under ~/.config/nova/. Also use when creating or fixing nova agents, subagents, commands, skills, plugins, MCP servers, or permission rules. Do not use for the user's own application code, or for any project that is not configuring nova itself.",
            location: AbsolutePath.make("/builtin/customize-nova.md"),
            content: CustomizeOpencodeContent,
          }),
        }),
      )
    })
  }),
})
