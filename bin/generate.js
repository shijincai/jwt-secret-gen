#!/usr/bin/env node
'use strict';

const crypto = require('node:crypto');

const SIZES = { HS256: 32, HS384: 48, HS512: 64 };
const ENCODINGS = ['hex', 'base64url', 'base64'];

const argv = Object.fromEntries(
  process.argv.slice(2).map((arg) => {
    const [key, value = 'true'] = arg.replace(/^--/, '').split('=');
    return [key, value];
  })
);

const alg = (argv.alg || 'HS256').toUpperCase();
const encoding = argv.encoding || 'hex';
const count = Number(argv.count || 1);
const bytes = SIZES[alg];

if (!bytes || !ENCODINGS.includes(encoding) || !Number.isInteger(count) || count < 1 || count > 50) {
  console.error('Usage: jwt-secret-gen [--alg=HS256|HS384|HS512] [--encoding=hex|base64url|base64] [--count=1..50]');
  process.exit(1);
}

for (let i = 0; i < count; i += 1) {
  console.log(crypto.randomBytes(bytes).toString(encoding));
}
