const express = require('express')

const router = express.Router()

router.get('/', (req, res) => res.send(`
  <h1>Página de Produtos</h1>
  <p>Veja os produtos disponíveis. Selecione a ação que deseja realizar com um dos produtos. Ou clique em Adicionar para criar um novo produto.</p>
  <a href="./adicionar"><button>Adicionar</button></a>
  <ul>
    <li>Produto #01 <a href="/produtos/01"><button>Visualizar</button></a> <a href="/produtos/modificar/01"><button>Modificar</button></a> <a href="/produtos/excluir/01"><button>Excluir</button></a></li>
    <li>Produto #02 <a href="/produtos/02"><button>Visualizar</button></a> <a href="/produtos/modificar/02"><button>Modificar</button></a> <a href="/produtos/excluir/02"><button>Excluir</button></a></li>
    <li>Produto #03 <a href="/produtos/03"><button>Visualizar</button></a> <a href="/produtos/modificar/03"><button>Modificar</button></a> <a href="/produtos/excluir/03"><button>Excluir</button></a></li>
    <li>Produto #04 <a href="/produtos/04"><button>Visualizar</button></a> <a href="/produtos/modificar/04"><button>Modificar</button></a> <a href="/produtos/excluir/04"><button>Excluir</button></a></li>
    <li>Produto #05 <a href="/produtos/05"><button>Visualizar</button></a> <a href="/produtos/modificar/05"><button>Modificar</button></a> <a href="/produtos/excluir/05"><button>Excluir</button></a></li>
  </ul>
`))

router.get('/adicionar', (req, res) => res.send(`
  <h1>Adicionar Produto novo</h1>
  <form><input type="text"></form>
  <a href="./criar"><button>Adicionar</button></a>
`))
router.get('/criar', (req, res) => res.send(`
  <h1>Produto criado com sucesso!</h1>
  <a href="./"><button>Ver Todos os Produtos</button></a>
`))

router.get('/modificar/:id', (req,res) => res.send(`
  <h1>Modificar Produto ${req.params.id}?</h1>
  <form><input type="text"></form>
  <a href="../alterar/${req.params.id}"><button>Confirmar</button></a>
  <a href="../"><button>Ver Todos os Produtos</button></a>
`))
router.get('/alterar/:id', (req,res) => res.send(`
  <h1>Produto ${req.params.id} atualizado com sucesso!</h1>
  <a href="../"><button>Ver Todos os Produtos</button></a>
`))

router.get('/excluir/:id', (req,res) => res.send(`
  <h1>Excluir Produto ${req.params.id}?</h1>
  <a href="../deletar/${req.params.id}"><button>Confirmar</button></a>
  <a href="../"><button>Ver Todos os Produtos</button></a>
`))
router.get('/deletar/:id', (req,res) => res.send(`
  <h1>Produto ${req.params.id} excluído com sucesso!</h1>
  <a href="../"><button>Ver Todos os Produtos</button></a>
`))

router.get('/:id', (req, res) => res.send(`
  <h1>Produto ${req.params.id}</h1>
  <p>O que deseja fazer com esse produto?</p>
  <p>
    <a href="./modificar/${req.params.id}"><button>Modificar o Produto</button></a>
    <a href="./excluir/${req.params.id}"><button>Excluir o Produto</button></a>
  </p>
  <a href="./"><button>Ver Todos os Produtos</button></a>
`))

module.exports = router