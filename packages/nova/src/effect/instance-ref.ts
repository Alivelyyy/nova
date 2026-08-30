import { Context } from "effect"
import type { InstanceContext } from "@/project/instance-context"
import type { WorkspaceV2 } from "@nova-ai/core/workspace"

export const InstanceRef = Context.Reference<InstanceContext | undefined>("~nova/InstanceRef", {
  defaultValue: () => undefined,
})

export const WorkspaceRef = Context.Reference<WorkspaceV2.ID | undefined>("~nova/WorkspaceRef", {
  defaultValue: () => undefined,
})
