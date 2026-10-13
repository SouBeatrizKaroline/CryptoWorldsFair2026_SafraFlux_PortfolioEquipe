# SheBuilds — Ideias que criam raízes

[Português (Brasil)](README.pt-br.md) · [English](README.en.md) · [Español](README.es.md)

Portfólio da equipe SheBuilds e do SafraFlux, disponível integralmente em português do Brasil, inglês e espanhol. A estrutura, os fatos e os perfis são equivalentes nas três versões; botões, descrições acessíveis, metadados e capturas acompanham o idioma.

## Estrutura

| Caminho | Descrição |
| --- | --- |
| src/index.template.pt-br.html | Página-base compartilhada. |
| src/locales/*.json | 263 textos por idioma; mesmas chaves e mesma ordem. |
| src/style.css, src/app.js | Estilos e interações compartilhados. |
| scripts/ | Geração e validação sem dependências externas. |
| dist/ | Site estático gerado, pronto para publicar. |

## Editar e validar

Edite a página-base e as três traduções juntas. Depois gere o site e execute a verificação. Não edite as páginas geradas diretamente. A página inicial padrão é português do Brasil; as outras são index.en.html e index.es.html. Os caminhos antigos para a página inicial continuam funcionando.

```sh
npm run build
npm run check
```

## Publicar

A configuração Vercel usa npm run build e publica dist. Após integrar a alteração na branch principal, a Vercel pode publicar automaticamente se o repositório estiver conectado. Não são necessárias chaves de API.

## Fontes e limites

A equipe trabalha remotamente no Brasil. Beatriz lidera produto e desenvolvimento; Sonia contribui com análise de produto e pitch; Olivia com estratégia e mercado. Perfis e trajetória anterior são os fornecidos pela equipe. Há um teste externo de demo relatado; não há clientes pagantes, receita ou pilotos comerciais confirmados.

Meteora é um laboratório local, Panta aguarda validação com credenciais e Solami é um diagnóstico separado. A prova Zcash é regtest, sem valor monetário. Participação em trilhas não representa prêmio ou elegibilidade confirmada. O projeto principal é privado; seu acesso exige autorização.

Os monogramas representam as criadoras sem fotos inventadas. Logos são compartilhados; a captura do produto tem uma versão por idioma. A atribuição das bibliotecas e da assistência técnica é preservada.

## Referências

- [SafraFlux](https://safraflux.soubeatrizkaroline.workers.dev/)
- [Colosseum](https://colosseum.com/arena/projects/shebuilds)
- [Repositório SafraFlux](https://github.com/SouBeatrizKaroline/CryptoWorldsFair2026_SafraFlux)
- [Revisão atual da documentação](https://github.com/SouBeatrizKaroline/CryptoWorldsFair2026_SafraFlux/pull/31)
- [Diagnóstico Solami](https://github.com/SouBeatrizKaroline/CryptoWorldsFair2026_SafraFlux_Solami)
- [Beatriz](https://soubeatrizkaroline.vercel.app/)
- [Sonia](https://jhay.goskip.app/)
- [Olivia](https://sites.google.com/view/oliviaboretti/olivia-boretti)
