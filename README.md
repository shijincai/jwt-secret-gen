# jwt-secret-gen

Generate a JWT HMAC secret locally: 32 random bytes for HS256, 48 for HS384 and 64 for HS512, following RFC 7518 section 3.2. Zero dependencies, never touches the network.

Companion tool to [jwtsecretkeygenerator.org](https://jwtsecretkeygenerator.org/), a free browser-based JWT secret key generator that also runs locally and needs no account.

## Install

```bash
git clone https://github.com/shijincai/jwt-secret-gen.git
cd jwt-secret-gen
npm install -g .   # installs the jwt-secret-gen command
# or run it without installing:
node bin/generate.js --alg=HS256
```

## Usage

```bash
jwt-secret-gen                                  # HS256, hex (64 characters)
jwt-secret-gen --alg=HS384 --encoding=base64url # 48 bytes, 64 characters
jwt-secret-gen --alg=HS512 --encoding=hex --count=3
```

Options:

- `--alg` — HS256 (default), HS384 or HS512. Sets 32, 48 or 64 random bytes.
- `--encoding` — hex (default), base64url or base64.
- `--count` — number of keys to print, 1 to 50, default 1.

Output lengths per key: HS256 = 64 hex / 43 base64url characters; HS384 = 96 / 64; HS512 = 128 / 86.

## Why another generator?

Most snippets get the sizes wrong or leak the value into shell history. This tool only prints the random value; store it in an environment variable or a secret manager. It uses `crypto.randomBytes`, which is a CSPRNG, not `Math.random`. Never use a passphrase, a UUID or text produced by a language model as a JWT secret.

## Test

```bash
node bin/generate.js --alg=HS256 | wc -c          # 65 (64 characters + newline)
node bin/generate.js --alg=HS512 --encoding=base64url | wc -c  # 87
```

## License

MIT
