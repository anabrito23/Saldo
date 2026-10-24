# Saldo

Aplicação front-end de demonstração para portefólio júnior, com interface em português de Portugal. Movimentos fictícios, câmbios de uma API pública e sem autenticação.

## Executar

Requisitos: Node.js 22.12+ (testado com Node 24), npm e navegador moderno com suporte a `dialog`, `crypto.randomUUID` e localStorage.

```sh
npm ci
npm run dev
```

Abrir o endereço apresentado no terminal. Para produção:

```sh
npm test
npm run build
npm run preview
```

O build gera `dist/`. `npm run preview` serve o resultado da compilação; não é servidor de produção.

## Funcionalidades

Dashboard mensal com saldo, receitas, despesas e taxa de poupança; gráfico dos últimos seis meses; distribuição de despesas; criação e eliminação de movimentos; pesquisa e filtro por categoria; exportação dos resultados visíveis em CSV compatível com Excel.

Os dados de exemplo usam datas relativas à primeira abertura. As alterações são persistidas em `localStorage` com a chave `saldo-v1`. Dados incompatíveis ou inválidos são substituídos pela demonstração. Se o navegador bloquear o armazenamento, é apresentado um aviso e a aplicação continua em memória. Para repor a demonstração, eliminar apenas essa chave nas ferramentas do navegador e recarregar a página. Não guardar dados sensíveis: os dados não são encriptados nem sincronizados.

## Decisões de UX/UI

Paleta verde e fundo suave para transmitir clareza e tranquilidade. Os indicadores respondem ao mês selecionado; pesquisa e categoria afetam a lista e a exportação, preservando a visão global do mês. Barras agrupadas permitem comparar receitas e despesas. O resumo textual acessível do gráfico comunica os mesmos valores. Montantes apresentados com formatação pt-PT e EUR. A taxa de poupança é (receitas − despesas) / receitas; sem receitas é 0%, podendo ser negativa quando há défice.

Layout responsivo, HTML semântico, link para saltar navegação, nomes acessíveis nos controlos, foco visível e mensagens de estado com `role="status"`. Os formulários usam labels e validação nativa; diálogos modais suportam Escape e devolvem o foco ao botão de abertura. A eliminação exige confirmação. Tipografia de sistema, sem dependência de fontes externas.

## Arquitetura e decisões técnicas

- React com componentes funcionais e estado derivado; sem Redux para evitar complexidade desnecessária.
- Vite para desenvolvimento e build estático, CSS próprio para controlo da identidade visual.
- `src/App.jsx`: interface, filtros e operações de utilizador.
- `src/model.js`: dados de demonstração, validação e regras puras.
- `src/useStorage.js`: persistência e recuperação segura de falhas de leitura/escrita.
- `src/model.test.js`: testes de regras de domínio com o runner nativo do Node.
- Ícones SVG locais, sem dependências adicionais; ícones decorativos acompanham rótulos legíveis.

Não há backend, múltiplos utilizadores, sincronização entre separadores nem mecanismo de migração de versões. A validação do cliente é adequada a uma demonstração local; um produto com servidor precisaria de validação e autorização no servidor.

## Publicar no GitHub

Criar um repositório vazio no GitHub e executar nesta pasta (substituir o URL pelo teu):

```sh
git init
git add .
git commit -m "feat: implementar Saldo com persistência local"
git branch -M main
git remote add origin https://github.com/TEU-UTILIZADOR/saldo.git
git push -u origin main
```

Não incluir `node_modules` nem `dist` no commit. O ficheiro `package-lock.json` garante instalações reproduzíveis. A configuração em `.github/workflows/ci.yml` executa os testes e a compilação em cada push e pull request.

## Deploy

### Vercel ou Netlify

1. Importar o repositório no painel da plataforma.
2. Framework/preset: Vite. Build command: `npm run build`. Output/publish directory: `dist`.
3. Instalação: `npm ci`. Versão de Node: 24. Não são necessárias variáveis de ambiente.
4. Publicar. Como não há rotas no servidor, não é necessário fallback de SPA.

Se publicares o conjunto num único repositório, definir Root/Base Directory como `saldo`. Em Netlify, `netlify.toml` já declara o build e a pasta de saída para repositório independente.

### GitHub Pages

Para um endereço `https://UTILIZADOR.github.io/REPOSITORIO/`, compilar com `npm run build -- --base=/REPOSITORIO/` e publicar o conteúdo de `dist` através de um workflow de Pages ou branch dedicada. Para domínio próprio ou página raiz, usar o build normal. O `base` precisa de corresponder ao caminho real.

## Verificação manual antes de apresentar

- Testar a 375 px, 768 px e 1440 px, com zoom a 200%.
- Percorrer todos os controlos com Tab, abrir/fechar o diálogo com teclado e confirmar o retorno de foco.
- Criar registo, alterar filtros, recarregar e confirmar persistência; eliminar com confirmação.
- Testar lista vazia e bloqueio de armazenamento no navegador.
- Conferir totais com movimentos conhecidos, mudar mês e abrir CSV exportado.

Os testes automáticos cobrem regras de domínio; não substituem uma auditoria de acessibilidade, testes de leitores de ecrã ou testes end-to-end.

## Apresentação no portefólio

Apresenta o problema, demonstra um fluxo completo, explica duas decisões de UX e identifica as limitações. Personaliza o projeto, documenta as tuas alterações em commits e descreve honestamente o apoio de ferramentas de IA. Não apresentar dados fictícios como resultados de utilizadores reais.

Sugestões de evolução: orçamentos por categoria, edição de movimentos, importação CSV e testes de integração.

## Licença

MIT. Ver `LICENSE`. Os dados fictícios são incluídos apenas para demonstração.

## Integração real de API

`Exchange.jsx` consulta `https://api.frankfurter.dev/v2/rate/eur/{moeda}`. Documentação: https://frankfurter.dev/. A conversão multiplica o montante pela taxa recebida; não altera os movimentos em EUR. Implementa carregamento, erro, tentativa manual, timeout de 10 segundos, cancelamento ao desmontar/mudar de moeda e validação da resposta. Só o par cambial é enviado; os movimentos não são enviados. Requer ligação à Internet; o resto do dashboard funciona sem a API. A data da taxa aparece no resultado e não se promete câmbio em tempo real.

## Verificação realizada nesta entrega

Compilação de produção concluída com Vite 8.0.8, React 19.2.5 e Node 24.20.0. Os três testes de domínio deste projeto passaram. Não foi possível abrir o servidor local no ambiente de entrega (bloqueio de portas), pelo que a verificação visual, a navegação por teclado e a chamada real da API no navegador ficam por executar com a lista manual acima. Não se afirma conformidade WCAG auditada.
