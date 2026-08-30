interface ImportMetaEnv {
  readonly NOVA_CHANNEL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module "virtual:nova-server" {
  export namespace Server {
    export const listen: typeof import("../../../nova/dist/types/src/node").Server.listen
    export type Listener = import("../../../nova/dist/types/src/node").Server.Listener
  }
  export namespace Config {
    export const get: typeof import("../../../nova/dist/types/src/node").Config.get
    export type Info = import("../../../nova/dist/types/src/node").Config.Info
  }
  export const bootstrap: typeof import("../../../nova/dist/types/src/node").bootstrap
}
