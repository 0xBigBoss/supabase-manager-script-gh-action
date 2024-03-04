import type { SupabaseManager } from "@0xbigboss/supabase-manager";
import * as core from "@actions/core";
import type { Context } from "@actions/github/lib/context";

const AsyncFunction = Object.getPrototypeOf(async () => null).constructor;

export declare type AsyncFunctionArguments = {
	core: typeof core;
	supabaseManager: InstanceType<typeof SupabaseManager>;
	context: Context;
	require: NodeRequire;
	__original_require__: NodeRequire;
};

export function callAsyncFunction<T>(
	args: AsyncFunctionArguments,
	source: string,
): Promise<T> {
	const fn = new AsyncFunction(...Object.keys(args), source);
	return fn(...Object.values(args));
}
