import { run as runTui, type TuiInput } from "@nova-ai/tui"
import { Global } from "@nova-ai/core/global"
import { AppNodeBuilder } from "@nova-ai/core/effect/app-node-builder"
import { Effect } from "effect"

export function run(input: TuiInput) {
  return runTui(input).pipe(Effect.provide(AppNodeBuilder.build(Global.node)))
}
