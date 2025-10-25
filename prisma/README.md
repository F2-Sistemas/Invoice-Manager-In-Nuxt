# Prisma Directory Structure

## O que versionar ✅

### `schema.prisma`
- **Tipo:** Arquivo de configuração crítico
- **O quê:** Define toda a estrutura do banco de dados (modelos, tipos, relacionamentos)
- **Por quê:** Essencial para que outros desenvolvedores e ambientes funcionem corretamente
- **Status:** ✅ **SEMPRE versione**

### `seed.ts`
- **Tipo:** Script de inicialização do banco
- **O quê:** Código para popular o banco com dados iniciais (usuário admin, dados de teste)
- **Por quê:** Garante que todos os ambientes têm os mesmos dados iniciais de desenvolvimento
- **Status:** ✅ **SEMPRE versione**

### `migrations/` (diretório inteiro)
- **Tipo:** Histórico de mudanças do banco de dados
- **O quê:** Pasta contendo todos os arquivos `.sql` que rastreiam as mudanças no schema
- **Por quê:** Histórico versionado permite que outros devs sincronizem o banco exatamente como está
- **Status:** ✅ **SEMPRE versione**

## O que NÃO versionar ❌

### `migrations/migration_lock.toml`
- **Tipo:** Arquivo auto-gerado
- **O quê:** Arquivo de controle do Prisma que rastreia qual migration lock está sendo usado
- **Por quê:** É gerado automaticamente quando você roda migrations
- **Status:** ❌ **JÁ ESTÁ IGNORADO** (ver `.gitignore` na raiz)

### `.prisma/` (se existir no diretório)
- **Tipo:** Cache/Gerado automaticamente
- **O quê:** Pasta com arquivos compilados do Prisma Client
- **Por quê:** É regenerado com `npm install` ou `prisma generate`
- **Status:** ❌ **NÃO versione** (salvo na raiz `.gitignore`)

## Resumo

| Arquivo/Pasta | Versionar? | Por quê |
|---|---|---|
| `schema.prisma` | ✅ Sim | Define a estrutura do banco |
| `seed.ts` | ✅ Sim | Script de inicialização |
| `migrations/` | ✅ Sim | Histórico de changes |
| `migrations/migration_lock.toml` | ❌ Não | Auto-gerado, ignorado globalmente |
| `.prisma/` | ❌ Não | Cache auto-gerado |

## Boas práticas

1. **Sempre commit migrations**: Quando você rodar `prisma migrate dev`, commit o arquivo gerado
2. **Comunique mudanças no schema**: Se alterar `schema.prisma`, avise o time
3. **Teste seu seed**: Execute `npm run prisma:seed` antes de commitar mudanças
4. **Não modifique migrations manualmente**: Use `prisma migrate` para criar mudanças

## Comandos úteis

```bash
# Sincronizar schema com o banco (desenvolvimento)
npx prisma migrate dev

# Visualizar o schema em interface visual
npx prisma studio

# Executar seed script
npx prisma db seed

# Resetar banco (dev only - cuidado!)
npx prisma migrate reset
```
