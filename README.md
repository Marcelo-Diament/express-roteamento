# Express.js | Aula 02

> Caso não tenha realizado a prática da aula 01, acesse o repositório [express-intro](https://github.com/Marcelo-Diament/express-intro.git).

Nessa aula começaremos a entender o conceito de MVC e Rotas, para estruturarmos nosso projeto de modo que possa crescer e tenha fácil manutenção. Basicamente vamos organizar a arquitetura, a estrutura do nosso projeto. Mas antes, vamos fazer uma rápida revisão:

## Revisão

### 01 | Iniciando projeto node.js

Basta rodarmos `npm init` e configurarmos nosso arquivo package.json (pode dar 'Enter' para tudo ou, se preferir, definir cada propriedade solicitada).

### 02 | Instalando o Express.js

Simplesmente rodamos `npm install express --save` (onde `--save` irá indicar o Express como uma dependência do projeto).

### 03 | Instanciando o Express

_./app.js_:

``` js
const express = require('express')
let app = express()
const port = 3000 // Estamos salvando a porta numa variável dessa vez
app.listen(port, () => console.info(`Servidor em execução na porta ${port}...`))
```

### 04 | Defininfo script start

No package.json, vamos incluir o script para rodar o nodemon:

``` js
"scripts": {
    "start": "nodemon app.js",
    "test": "echo \"Error: no test specified\" && exit 1"
},
```

E então, basta rodar `npm start` no terminal para iniciar o servidor.

### 05 | Criando Rotas (sem parâmetros e com parâmetros opcionais)

``` js
app.get('/', (req, res) => {
    res.send('<h1>Você está na Página Inicial</h1>')
})

app.get('/produtos/:id?', (req, res) => {
    let {
        id
    } = req.params
    id
        ?
        res.send(`Você está na Página do Produto ${req.params.id}`) :
        res.send(`Você está na Página de Produtos`)
})
```

## O que é MVC?

MVC significa **Models**, **Views** e **Controllers**. É um padrão de estrutura/arquitetura (_Design Pattern_) em que 'quebramos' o projeto em partes organizadas por suas responsabilidades, onde **Models** representa a estrutura do nosso Banco de Dados (incluindo a lógica da aplicação e conexão com o BD para realização de consultas), **Views** seriam as telas (interface com o usuário) e **Controllers** - responsáveis por processar os dado, englobam a parte de inteligência, regras de negócios da nossa aplicação, fazendo a ponte entre Models e Views.

Fora o fato de deixarmos nosso projeto mais organizado, ao isolarmos as funcionalidades, conferimos maior segurança à nossa aplicação, uma vez que o usuário final só terá contato com a interface (_Views_), sem poder acessar a parte de dados ou de regras de negócio diretamente.

Além desses 3 pilares, temos as **Routes** (ou Rotas), que basicamente direcionarão os _requests_, ou acessos a URLs específicas, para o respectivo _controller_. Para que tudo isso fique mais claro, vamos implementar esse conceito na prática. Começaremos criando as nossas Rotas:

## Sistema de Rotas ou Roteamento

Bom, o primeiro passo é bem simples - basicamente vamos criar uma pasta chamada **routes** na raiz do nosso projeto (para fazer isso pelo terminal, basta executar o comando `mkdir routes` - ou pode criar diretamente pelo VS Code, como preferir).

### Rotas de Produtos

Vamos criar o arquivo `rotasProdutos.js` dentro da nossa pasta `routes` (pelo terminal, `cd routes && touch rotasProdutos.js` ).

**Passo 01 | Instanciando o Router**

Precisamos instanciar o express (como fizemos no app.js) e então 'ativarmos' o **router**:

``` js
const express = require('express')
const router = express.Router()
```

**Passo 02 | Definindo as rotas internas**

Após finalizarmos esse módulo, iremos basicamente importar, aninhar essas rotas dentro das rotas do app.js. É por isso que, dentro desse arquivo, não precisaremos passar o caminho inteiro da rota (ex.: _/produtos/:id_) - só precisamos passar o trecho da rota após _/produtos_.

Para criarmos nossas rotas com o `Router` , ao invés de declararmos `app.get()` , vamos usar nossa const - `router.get()` , por exemplo. Vamos ver dois exemplos:

``` js
router.get('/', (req, res) => res.send(`<h1>Página de Produtos</h1>`))
router.get('/adicionar', (req, res) => res.send(`<h1>Adicionar Produto novo</h1>`))
router.get('/excluir', (req, res) => res.send(`<h1>Excluir Produto existente</h1>`))
```

**Passo 03 | Exportando nosso módulo de rotas de produtos**

Assim como vimos na aula de node.js, precisaremos exportar nosso módulo. Para isso basta acrescentarmos o seguinte trecho: `module.exports = router` .

Nosso arquivo `rotasProtudos.js` ficou assim:

``` js
const express = require('express')
const router = express.Router()

router.get('/', (req, res) => res.send(`<h1>Página de Produtos</h1>`))
router.get('/adicionar', (req, res) => res.send(`<h1>Adicionar Produto novo</h1>`))
router.get('/excluir', (req, res) => res.send(`<h1>Excluir Produto existente</h1>`))

module.exports = router
```

**Passo 04 | Importando nosso módulo de rotas de produtos no app.js**

Agora simplesmente importaremos nosso módulo logo após o _require_ do express: `const rotasProdutos = require('./routes/rotasProdutos')` (não precisamos passar a extensão do arquivo, como vimos em React.js).

**Passo 05 | Atualizando rotas de produto no app.js**

Vamos remover nossa rota de produtos do app.js e declarar que, caso haja um acesso a `/produtos`, **usaremos** nosso módulo específico:

```js
app.use('/produtos', rotasProdutos)
```

Com isso, concluímos o processo de definição de rotas. Vamos criar mais algumas rotas para fixarmos esse conceito. O exercício é o seguinte:

Considerando **Produtos**, vamos criar as seguintes rotas - de modo que tenhamos um 'pseudo' CRUD em nossa aplicação (vamos apenas simular através da _response_):

* **/**: listagem de todos os registros daquele tipo

* **/adicionar**: rota para exibirmos um formulário de cadastro

* **/criar**: seria a tela de confirmação da adição (por debaixo dos panos iríamos criar de fato o registro após o envio do formulário da rota adicionar e então mostraríamos essa tela)

* **/:id**: rota para exibirmos os detalhes de um registro específico a partir de seu ID. Nessa rota mostraremos links para edição e exclusão do mesmo.

* **/modificar/:id**: rota para exibirmos um formulário de atualização de um registro

* **/alterar/:id**: seria a tela de confirmação da edição (por debaixo dos panos iríamos atualizar de fato o registro após o envio do formulário da rota modificar e então mostraríamos essa tela)

* **/excluir/:id**: rota para exibirmos um formulário de confirmação de exclusão de um registro

* **/deletar/:id**: seria a tela de confirmação da exclusão (por debaixo dos panos iríamos remover de fato o registro, após o envio do formulário da rota excluir e então mostraríamos essa tela)

**Observação:** nessa prática iremos inserir HTML dentro das rotas, através do método `send()` - mas lembrem-se de que não é a maneira mais adequada (temos as Views para isso, que veremos mais adiante). O mesmo se aplica a lógica aplicada dentro das rotas (usaremos os Controllers posteriormente).

**Dica:** lembre-se do que aprendemos na aula sobre o `react-router-dom` - devemos deixar as rotas mais específicas no topo e as mais genéricas por último, para que não haja conflito entre as rotas (exemplo: interpretar 'modificar' como um ':id').
