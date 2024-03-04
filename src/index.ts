import { SupabaseManager } from "@0xbigboss/supabase-manager";
import * as core from "@actions/core";
import { context } from "@actions/github";
import { callAsyncFunction } from "./async-function";

process.on("unhandledRejection", handleError);
main().catch(handleError);

async function main(): Promise<void> {
	const sbToken = core.getInput("supabase-access-token", { required: true });

	// users maybe set it up as ENV var
	core.setSecret(sbToken);

	if (!sbToken) {
		core.setFailed("Supabase access token is not defined");
		return;
	}

	const supabaseManager = new SupabaseManager({
		TOKEN: sbToken,
		BASE: "https://api.supabase.com",
	});

	const script = core.getInput("script", { required: true });

	// Using property/value shorthand on `require` (e.g. `{require}`) causes compilation errors.
	const result = await callAsyncFunction(
		{
			supabaseManager,
			context,
			core,
		},
		script,
	);

	let encoding = core.getInput("result-encoding");
	encoding = encoding ? encoding : "json";

	let output: string | Record<string, unknown>;

	switch (encoding) {
		case "json":
			output = JSON.stringify(result);
			break;
		case "string":
			output = String(result);
			break;
		default:
			throw new Error('"result-encoding" must be either "string" or "json"');
	}

	core.setOutput("result", output);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
// biome-ignore lint/suspicious/noExplicitAny: err can be any type
function handleError(err: any): void {
	console.error(err);
	core.setFailed(`Unhandled error: ${err}`);
}
