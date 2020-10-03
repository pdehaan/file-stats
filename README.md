# file-stats

## USAGE

```sh
# The following command will ignore the `./META-INF/**` directory
# as well as any `./*.map` files in the root directory.
# NOTE: The `!` character seems to be special [at least on macOS],
# so we need to escape it a backslash.
GLOBS="\!META-INF,\!*.map" npx pdehaan/file-stats
```
