let cardContainer = document.querySelector(".card-container");
let campoBusca = document.querySelector("header input");
let filmes = []; // Nome da variável alterado de 'dados' para 'filmes'

// Adiciona um listener para atualizar a busca a cada letra digitada
campoBusca.addEventListener('input', iniciarBusca);

async function iniciarBusca() {
    // 1. Busca os dados se ainda não foram carregados
    if (filmes.length === 0) {
        try {
            // Assume que o arquivo agora contém dados de filmes
            let resposta = await fetch("data.json"); 
            filmes = await resposta.json();
        } catch (error) {
            console.error("🚨 Falha ao buscar dados de filmes:", error);
            // Mensagem de erro visual
            cardContainer.innerHTML = "<p style='color: var(--cor-primaria-destaque); text-align: center; font-size: 1.2em;'>Não foi possível carregar a lista de filmes. Verifique o arquivo data.json.</p>";
            return; 
        }
    }

    // 2. Filtra os filmes com base no termo de busca
    const termoBusca = campoBusca.value.toLowerCase();
    
    // Filtra pelo título e pelo gênero do filme
    const filmesFiltrados = filmes.filter(filme => 
        filme.titulo.toLowerCase().includes(termoBusca) || 
        filme["Gênero"].toLowerCase().includes(termoBusca)
    );

    // 3. Renderiza os resultados
    renderizarCards(filmesFiltrados);
}

function renderizarCards(listaDeFilmes) {
    cardContainer.innerHTML = ""; // Limpa o container antes de renderizar

    if (listaDeFilmes.length === 0) {
        cardContainer.innerHTML = "<p style='text-align: center; font-size: 1.5em; margin-top: 50px;'>Nenhum filme encontrado com esse termo.</p>";
        return;
    }

    for (let filme of listaDeFilmes) {
        let article = document.createElement("article");
        article.classList.add("card");

        // Estrutura do Card adaptada para Filmes
        article.innerHTML = `
            <img src="${filme.imagem}" alt="${filme.titulo}">
            <div class="card-content">
                <h2>${filme.titulo}</h2>
                <p><strong>Ano:</strong> ${filme.ano}</p>
                <p><strong>Gênero:</strong> ${filme["Gênero"]}</p>
                <a href="${filme.link_oficial}" target="_blank">Ver Detalhes</a>
            </div>
        `;
        
        cardContainer.appendChild(article);
    }
}

// Opcional: Chama a função para carregar e exibir todos os filmes ao iniciar
document.addEventListener('DOMContentLoaded', iniciarBusca);