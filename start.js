import { spawn } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const bin = fileURLToPath(new URL('./node_modules/n8n/bin/n8n', import.meta.url))
const env = {
  ...process.env,
  N8N_PORT: process.env.N8N_PORT || process.env.PORT || '5678',
  N8N_LISTEN_ADDRESS: process.env.N8N_LISTEN_ADDRESS || '127.0.0.1',
  N8N_PROXY_HOPS: process.env.N8N_PROXY_HOPS || '1',
  N8N_PROTOCOL: process.env.N8N_PROTOCOL || 'https',
  N8N_RUNNERS_ENABLED: process.env.N8N_RUNNERS_ENABLED || 'true',
  N8N_DIAGNOSTICS_ENABLED: process.env.N8N_DIAGNOSTICS_ENABLED || 'false',
}

const child = spawn(process.execPath, [bin, 'start'], { env, stdio: 'inherit' })
for (const signal of ['SIGINT', 'SIGTERM']) process.on(signal, () => child.kill(signal))
child.on('exit', (code, signal) => process.exit(signal ? 1 : code ?? 0))
