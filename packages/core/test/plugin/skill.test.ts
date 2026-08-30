import { describe, expect } from "bun:test"
import { Effect } from "effect"
import { AppNodeBuilder } from "@nova-ai/core/effect/app-node-builder"
import { SkillPlugin } from "@nova-ai/core/plugin/skill"
import { SkillV2 } from "@nova-ai/core/skill"
import { testEffect } from "../lib/effect"
import { host } from "./host"

const it = testEffect(AppNodeBuilder.build(SkillV2.node))

describe("SkillPlugin.Plugin", () => {
  it.effect("registers the built-in customize-nova skill", () =>
    Effect.gen(function* () {
      const skill = yield* SkillV2.Service
      yield* SkillPlugin.Plugin.effect(host({ skill: { ...skill, reload: skill.reload } }))

      expect(yield* skill.list()).toContainEqual(
        expect.objectContaining({
          name: "customize-nova",
          description: expect.stringContaining("nova's own configuration"),
        }),
      )
    }),
  )
})
