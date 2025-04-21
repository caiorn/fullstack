import dotenv from 'dotenv'

// carregar o arquivo .env correspondente ao NODE_ENV (ex: .env.development, .env.test, .env.production)
dotenv.config({
	path: `.env.${process.env.NODE_ENV || 'development'}` // Carrega o arquivo .env baseado em NODE_ENV
})

const REQUIRED_ENV_VARS = ['DATABASE_URL', 'PORT', 'SQLITE_DB_PATH']
const errors = []

// validação se todas variaveis de ambiente obrigatórias foram carregadas
for (const envVar of REQUIRED_ENV_VARS) {
	if (!process.env[envVar]) {
		errors.push(`${envVar} is required`)
	}
}

if (errors.length > 0) {
	console.info(`❌ Erro ao carregar variaveis em .env.${process.env.NODE_ENV}`)
	throw new Error(` Failed to load env file ${errors.join(', ')}`)
}

//ambiente para intellisense e valores default
export const env = {
	SQLITE_DB_PATH: process.env.SQLITE_DB_PATH,
	NODE_ENV: process.env.NODE_ENV || 'development',
	DATABASE_URL: process.env.DATABASE_URL || 'sqlite://db.sqlite',
	PORT: Number(process.env.PORT || 3333)
}

console.info(
	'🟢 Env file loaded',
	...(env.NODE_ENV !== 'production' ? [env] : [])
)
