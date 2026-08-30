import { Config, ConfigProvider, Context, Effect, Layer, Option } from "effect"
import { ConfigService } from "@/effect/config-service"

const bool = (name: string) => Config.boolean(name).pipe(Config.withDefault(false))
const positiveInteger = (name: string) =>
  Config.number(name).pipe(
    Config.map((value) => (Number.isInteger(value) && value > 0 ? value : undefined)),
    Config.orElse(() => Config.succeed(undefined)),
  )
const experimental = bool("NOVA_EXPERIMENTAL")
const enabledByExperimental = (name: string) =>
  Config.all({ experimental, enabled: Config.boolean(name).pipe(Config.option) }).pipe(
    Config.map((flags) => Option.getOrElse(flags.enabled, () => flags.experimental)),
  )

export class Service extends ConfigService.Service<Service>()("@nova/RuntimeFlags", {
  autoShare: bool("NOVA_AUTO_SHARE"),
  pure: bool("NOVA_PURE"),
  disableDefaultPlugins: bool("NOVA_DISABLE_DEFAULT_PLUGINS"),
  disableEmbeddedWebUi: bool("NOVA_DISABLE_EMBEDDED_WEB_UI"),
  disableExternalSkills: bool("NOVA_DISABLE_EXTERNAL_SKILLS"),
  disableLspDownload: bool("NOVA_DISABLE_LSP_DOWNLOAD"),
  disableClaudeCodePrompt: Config.all({
    broad: bool("NOVA_DISABLE_CLAUDE_CODE"),
    direct: bool("NOVA_DISABLE_CLAUDE_CODE_PROMPT"),
  }).pipe(Config.map((flags) => flags.broad || flags.direct)),
  disableClaudeCodeSkills: Config.all({
    broad: bool("NOVA_DISABLE_CLAUDE_CODE"),
    direct: bool("NOVA_DISABLE_CLAUDE_CODE_SKILLS"),
  }).pipe(Config.map((flags) => flags.broad || flags.direct)),
  enableExa: Config.all({
    experimental,
    enabled: bool("NOVA_ENABLE_EXA"),
    legacy: bool("NOVA_EXPERIMENTAL_EXA"),
  }).pipe(Config.map((flags) => flags.experimental || flags.enabled || flags.legacy)),
  enableParallel: Config.all({
    enabled: bool("NOVA_ENABLE_PARALLEL"),
    legacy: bool("NOVA_EXPERIMENTAL_PARALLEL"),
  }).pipe(Config.map((flags) => flags.enabled || flags.legacy)),
  enableExperimentalModels: bool("NOVA_ENABLE_EXPERIMENTAL_MODELS"),
  enableQuestionTool: bool("NOVA_ENABLE_QUESTION_TOOL"),
  experimentalReferences: enabledByExperimental("NOVA_EXPERIMENTAL_REFERENCES"),
  experimentalBackgroundSubagents: enabledByExperimental("NOVA_EXPERIMENTAL_BACKGROUND_SUBAGENTS"),
  experimentalLspTy: bool("NOVA_EXPERIMENTAL_LSP_TY"),
  experimentalLspTool: enabledByExperimental("NOVA_EXPERIMENTAL_LSP_TOOL"),
  experimentalOxfmt: enabledByExperimental("NOVA_EXPERIMENTAL_OXFMT"),
  experimentalPlanMode: enabledByExperimental("NOVA_EXPERIMENTAL_PLAN_MODE"),
  experimentalCodeMode: enabledByExperimental("NOVA_EXPERIMENTAL_CODE_MODE"),
  experimentalEventSystem: enabledByExperimental("NOVA_EXPERIMENTAL_EVENT_SYSTEM"),
  experimentalWorkspaces: enabledByExperimental("NOVA_EXPERIMENTAL_WORKSPACES"),
  experimentalIconDiscovery: enabledByExperimental("NOVA_EXPERIMENTAL_ICON_DISCOVERY"),
  outputTokenMax: positiveInteger("NOVA_EXPERIMENTAL_OUTPUT_TOKEN_MAX"),
  bashDefaultTimeoutMs: positiveInteger("NOVA_EXPERIMENTAL_BASH_DEFAULT_TIMEOUT_MS"),
  experimentalNativeLlm: bool("NOVA_EXPERIMENTAL_NATIVE_LLM"),
  experimentalWebSockets: bool("NOVA_EXPERIMENTAL_WEBSOCKETS"),
  client: Config.string("NOVA_CLIENT").pipe(Config.withDefault("cli")),
}) {}

export type Info = Context.Service.Shape<typeof Service>

const emptyConfigLayer = Service.layer.pipe(
  Layer.provide(ConfigProvider.layer(ConfigProvider.fromUnknown({}))),
  Layer.orDie,
)

export const layer = (overrides: Partial<Info> = {}) =>
  Layer.effect(
    Service,
    Effect.gen(function* () {
      const flags = yield* Service
      return Service.of({ ...flags, ...overrides })
    }),
  ).pipe(Layer.provide(emptyConfigLayer))

export const node = LayerNode.make({ service: Service, layer: Service.layer.pipe(Layer.orDie), deps: [] })

export * as RuntimeFlags from "./runtime-flags"
import { LayerNode } from "@nova-ai/core/effect/layer-node"
