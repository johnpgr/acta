/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "acta",
      removal: input?.stage === "production" ? "retain" : "remove",
      home: "aws",
    }
  },
  async run() {
    // Secrets (set via: npx sst secret set TursoUrl <url>)
    const tursoUrl = new sst.Secret("TursoUrl")
    const tursoToken = new sst.Secret("TursoToken")

    // Deploy Nitro API to Lambda
    const api = new sst.aws.Function("ActaApi", {
      handler: "apps/api",
      url: true,
      link: [tursoUrl, tursoToken],
      environment: {
        TURSO_URL: tursoUrl.value,
        TURSO_TOKEN: tursoToken.value,
      },
    })

    return {
      api: api.url,
    }
  },
})
