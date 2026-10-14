# Um presente feito com amor

Um site romântico simples, responsivo e sem dependências de JavaScript. Os textos, a foto, a música e a data ficam fáceis de personalizar.

## Como abrir

1. Abra `index.html` no navegador, inclusive no celular, ou use uma extensão de servidor local no editor.
2. Clique em **“Clique aqui, meu amor”** para entrar no presente.
3. Edite os campos de `CONFIG` no começo de `script.js` antes de compartilhar.

## Como personalizar

- **Foto:** a foto enviada já está configurada em `assets/nossa-foto.jpg`. Para substituí-la, troque esse arquivo por outra foto JPEG com o mesmo nome ou atualize `CONFIG.photo` no começo de `script.js`.
- **Nossa história:** substitua os textos em `CONFIG.story`, no `script.js`. Cada item tem um título e um texto; você também pode acrescentar ou remover itens.
- **Contador:** `CONFIG.relationshipStart` já está preenchido com `"2024-08-22"`. Como você informou apenas a data, o contador começa à meia-noite local e avisa isso na página. Se souber o horário exato, pode acrescentá-lo, por exemplo `"2024-08-22T18:30:00"` (formato `AAAA-MM-DDTHH:MM:SS`). Se deixar vazio ou usar uma data inválida/futura, o site explica como configurar sem inventar um contador.
- **Surpresa:** personalize `CONFIG.surprise`.
- **Música:** o player usa o arquivo `videoplayback.mp4` como fonte, mas mostra somente controles de música — play, pausa e progresso — sem exibir a imagem do vídeo. Mantenha esse arquivo na pasta principal do site e envie-o junto com os demais ao publicar. Para usar outro arquivo, altere `CONFIG.music` no começo de `script.js`. A música não começa automaticamente; é preciso apertar play.

Os textos que começam com colchetes são exemplos editáveis — substitua-os antes de enviar o site.

## Publicar grátis

**GitHub Pages**

1. Crie uma conta gratuita no GitHub e um repositório público para o site.
2. Envie `index.html`, `styles.css`, `script.js`, `README.md`, `videoplayback.mp4` e a pasta `assets` com seus arquivos.
3. No repositório, abra **Settings → Pages**. Em **Build and deployment**, selecione **Deploy from a branch**, escolha `main` e `/ (root)` e salve.
4. Aguarde a publicação. O GitHub mostrará o endereço do site nessa página de configuração.

**Netlify Drop**

1. Personalize e teste os arquivos no seu computador, mantendo `videoplayback.mp4` na pasta do site.
2. Entre em [app.netlify.com/drop](https://app.netlify.com/drop) e solte a pasta do site na página.
3. O Netlify publicará o site e mostrará um link que você pode compartilhar. Para manter o link e gerenciar a publicação, crie uma conta gratuita.

Antes de publicar, confira especialmente se a foto, os textos pessoais e a data estão corretos. Evite publicar informações que vocês prefiram manter privadas.
