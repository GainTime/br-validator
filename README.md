## Como começar

### ESM

```
npm install br-validator
```

```js
import Br from 'br-validator'

// options é opcional, se vc não passar nada, será:
const options = {
    css: true // Utilizar nosso stylesheet,
    messages: true // Utilizar nossas mensagens de erro
}

const br = new Br(options)
const BR = br.init()
```

### text/javascript

```
npm install br-validator@4.1.0-script
```

Será criada uma variável global chamada `br`

```html
<script type="text/javascript" src="br-validator/dist/index.js"></script>
<script>
  br.init() // Configuração padrão

  // ou
  new br.Br(options).init() // Assim você pode personalizar
</script>
```

## Como utilizar

Adicione o atributo data-validate aos inputs que deseja validar, tal que o valor do atributo pode ser cpf, cnpj, date, brPhone, cep, text ou num.

```html
<input type="text" data-validate="cpf" />
```

Para validar ceps, utilizamos um formato diferente:

```html
<script>
  const BR = br.init()

  BR.fields.cep.forEach((e) => {
    e.addEventListener('blur', function (f) {
      console.log(f)
      br.cep(f.target, (response) => {
        console.log(response)
      })
    })
  })
</script>
```
