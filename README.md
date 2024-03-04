# supabase-manager-script-gh-action

This action makes it easy to quickly write a script in your workflow that uses the Supabase Management API and the workflow run context.

To use this action, provide an input named script that contains the body of an asynchronous function call. The following arguments will be provided:

- `supabaseManager` A pre-authenticated
  [SupabaseManager](https://github.com/0xBigBoss/supabase-manager-js) client for the [Supabase Management API](https://supabase.com/docs/reference/api/introduction).
- `context` An object containing the [context of the workflow
  run](https://github.com/actions/toolkit/blob/main/packages/github/src/context.ts)
- `core` A reference to the [@actions/core](https://github.com/actions/toolkit/tree/main/packages/core) package

Since the `script` is just a function body, these values will already be
defined, so you don't have to import them (see examples below).

Find out more about Supabase Branching by reading the official docs [here](https://supabase.com/docs/guides/platform/branching).

This action is a wrapper around the [Supabase Management API](https://supabase.com/docs/guides/platform/branching#branching-api).

**Not officially endorsed by Supabase.**

## Usage

All outputs except api_url and graphql_url will be masked in the GitHub Actions logs.

Basic usage:

```yaml
- uses: 0xbigboss/supabase-manager-script-gh-action@v1
  id: supabase-script
  with:
    supabase-access-token: ${{ secrets.SUPABASE_ACCESS_TOKEN }}
- name: Get result
  run: echo "${{steps.supabase-script.outputs.result}}"
```

## Result encoding

By default, the JSON-encoded return value of the function is set as the "result" in the
output of a github-script step. For some workflows, string encoding is preferred. This option can be set using the
`result-encoding` input:

```yaml
- uses: 0xbigboss/supabase-manager-script-gh-action@0.0.0
  id: my-script
  with:
    result-encoding: string
    script: return "I will be string (not JSON) encoded!"
```

## Contributing

To install dependencies:

```bash
bun install
```

Make some changes and then run:

```bash
bun run build
```

Commit the changes and push!

## Debugging

You can _mock_ the action environment by running it like so:

```typescript
process.env[
 `INPUT_${"supabase-access-token".replace(/ /g, "_").toUpperCase()}`
] = process.env.SUPABASE_ACCESS_TOKEN;
process.env[`INPUT_${"supabase-project-id".replace(/ /g, "_").toUpperCase()}`] =
 process.env.SUPABASE_PROJECT_ID;
process.env[`INPUT_${"wait-for-migrations".replace(/ /g, "_").toUpperCase()}`] =
 "false";
process.env[`INPUT_${"timeout".replace(/ /g, "_").toUpperCase()}`] = "60";
await main();
```

This project was created using `bun init` in bun v1.0.29. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
