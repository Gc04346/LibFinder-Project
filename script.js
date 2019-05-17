(function() {
    console.log("Loaded JS")

    var lista = []
    var url = "https://api.cdnjs.com/libraries?search="
    var searchBox = document.getElementById("searchBox")
    searchBox.addEventListener("input", async function(e) {
        var texto = e.target.value
        if (texto !== '') {
            var resultados = await fetch(`${url}${texto}`).then(function(resp) {
                return resp.json()
            })
            lista = resultados.results
            console.log(lista)
            if (lista.length !== 0) {
                var bibs = document.getElementById('bibs')
                bibs.innerHTML = ''
                lista.forEach(element => {
                    bibs.appendChild(createItem(element.name))
                });
            } else {
                var bibs = document.getElementById('bibs')
                bibs.innerHTML = ''
                bibs.appendChild(createItem('Não foram encontrados resultados para a sua pesquisa'))
            }

        } else {
            var bibs = document.getElementById('bibs')
            bibs.innerHTML = ''
        }


    })

    function createItem(nome) {
        var valor = document.createElement('span')
        var bib = document.createElement('li')
        var icone = document.createElement('img')
        icone.src = 'images/result_icon.svg'
        bib.classList.add('bib')
        valor.innerHTML = nome
        bib.appendChild(valor)
        bib.appendChild(icone)
        return bib
    }
})()