(function() {

    var lista = []
    var url = "https://api.cdnjs.com/libraries?search="
    var searchBox = document.getElementById("searchBox")
    searchBox.addEventListener("input", async function(e) {
        /*a variavel texto contem a string na searchBox */
        var texto = e.target.value
        if (texto !== '') {
            /*transforma em um json a resposta com as libs encontradas a partir da string digitada na searchBox*/
            var resultados = await fetch(`${url}${texto}`).then(function(resp) {
                return resp.json()
            })
            lista = resultados.results
                /*se a lista nao for vazia, ou seja, se houverem resultados para a pesquisa*/
            if (lista.length !== 0) {
                var bibs = document.getElementById('bibs')
                bibs.innerHTML = ''
                lista.forEach(element => {
                    /*chama a funcao createItem para adicionar li's ao ul no html*/
                    bibs.appendChild(createItem(element.name))
                });
                /*se a pesquisa nao retornar nenhum resultado exibe mensagem abaixo*/
            } else {
                var bibs = document.getElementById('bibs')
                bibs.innerHTML = ''
                bibs.appendChild(createItem('Não foram encontrados resultados para a sua pesquisa'))
            }
            /*se a string nao for vazia. este if-else garante que, quando o usuario apertar o backspace, a
              pesquisa acompanhe dinamicamente */
        } else {
            var bibs = document.getElementById('bibs')
            bibs.innerHTML = ''
                //exibe a div com a lista (no caso, vazia. para garantir o efeito de 'voltar atras')
            showWichContent('lista');
        }

    })

    /*esta funcao cria um li pra cada lib retornada pela url da API*/
    function createItem(nome) {
        var valor = document.createElement('span')
        var bib = document.createElement('li')
        valor.innerHTML = nome
        valor.classList.add('margin-left')
        bib.appendChild(valor)
            /*o icone de mais informacoes nao deve aparecer na mensagem de erro */
        if (nome !== 'Não foram encontrados resultados para a sua pesquisa') {
            var icone = document.createElement('img')
            icone.classList.add('margin-right')
            icone.src = 'images/result_icon.svg'
            bib.appendChild(icone)
                //evento de clique no icone de informacoes
            icone.onclick = async function() {
                var json = await getBiblioteca(nome)
                showLibDetails(json)
            }
        }
        bib.classList.add('bib')
        return bib
    }
    //esta funcao atribui ao html os valores correspondentes da lib selecionada com o clique do mouse
    function showLibDetails(json) {
        //atribui ao h3 o nome da lib
        var nome = document.getElementById('libName')
        nome.innerHTML = json.name
            //atribui ao h2 a descricao
        var desc = document.getElementById('libDescription')
        desc.innerHTML = json.description
            //atribui ao p da homepage a string 'homepage: ' concatenada com a url da homepage correspondente
        var homepage = document.getElementById('libHomepage')
        homepage.innerHTML = "homepage: ".bold().concat(json.homepage)
            //faz o mesmo que foi feito na homepage para o repositorio
        var repo = document.getElementById('libRepo')
        repo.innerHTML = "repository: ".bold().concat(json.repository.url)
            /*como versao e licenca devem ficar na mesma linha separadas por uma bolinha, o jeito mais
              pratico que encontrei de fazer isto foi de juntar os dois em um mesmo p no html, chamado
              libVersionLicense, e concatenando aqui a versao e a licenca da lib contidas no json */
        var versionLicense = document.getElementById('libVersionLicense')
        versionLicense.innerHTML = "version: ".bold().concat(json.version).concat(" • license: ".bold()).concat(json.license)
            //exibe a pagina de detalhes da lib
        showWichContent('singlepage')
    }

    //define qual div de conteudo sera exibida: se a lista de resultados (list) ou a pagina de detalhes (singlepage)
    //o parametro content se refere a classe de ambas as divs no html, que leva o nome de content. singlepage e list sao uma especie de 'filhos' de content
    function showWichContent(content) {
        var lista = document.getElementById('list')
        var singlepage = document.getElementById('singlepage')
        if (content === 'singlepage') {
            lista.style.display = 'none'
            singlepage.style.display = 'block'
        } else {
            lista.style.display = 'block'
            singlepage.style.display = 'none'
        }
    }

    /*esta funcao me retorna todas as informacoes da lib especificada ao clique do mouse*/
    async function getBiblioteca(nome) {
        var b = await fetch(`${'https://api.cdnjs.com/libraries/'}${nome}${'?fields=name,description,homepage,repository,license,version'}`).then(async function(resp) {
            return await resp.json()
        })
        return b
    }
})()