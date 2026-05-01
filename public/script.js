const data = {
    produtos: [
        {
            id: 1,
            nome: "It Takes Two",
            preco: 69.65,
            categoria: "Aventura",
            imagem: "/img/it2.jpg",
            descricao: "It Takes Two é um jogo cooperativo de aventura para dois jogadores, onde um casal precisa superar desafios criativos trabalhando em equipe para restaurar seu relacionamento.",
            emEstoque: true

        },
        {
            id: 2,
            nome: "Red Dead Redemptiom 2",
            preco: 299.90,
            categoria: "Ação",
            imagem: "/img/rd2.jpg",
            descricao: "Red Dead Redemption 2 é um jogo de mundo aberto no Velho Oeste, onde você vive a jornada de Arthur Morgan em uma história intensa de crime, lealdade e sobrevivência.",
            emEstoque: false
        },
        {
            id: 3,
            nome: "Assassin's Creed Valhalla",
            preco: 279.95,
            categoria: "RPG",
            imagem: "/img/acv.jpg",
            descricao: "Assassin’s Creed Valhalla é um RPG de ação em mundo aberto onde você assume o papel de um guerreiro viking, explorando a Inglaterra medieval, conquistando territórios e construindo seu clã.",
            emEstoque: false
        },
        {
            id: 4,
            nome: "Ace Combat 7: Skies Unknown",
            preco: 339.90,
            categoria: "Ação",
            imagem: "/img/ac7.jpg",
            descricao: "Ace Combat 7: Skies Unknown é um jogo de combate aéreo que coloca você no controle de caças modernos em batalhas intensas, com missões dinâmicas e gráficos realistas.",
            emEstoque: true
        },
        {
            id: 5,
            nome: "Dead Cells",
            preco: 49.00,
            categoria: "RPG",
            imagem: "/img/deadcells.jpg",
            descricao: "Dead Cells é um jogo estilo roguelike com exploração rápida e combates desafiadores, onde cada tentativa traz novas armas, habilidades e caminhos diferentes.",
            emEstoque: true
        },
        {
            id: 6,
            nome: "F1 25",
            preco: 139.60,
            categoria: "Esporte",
            imagem: "/img/f125.jpg",
            descricao: "F1 25 é um jogo de corrida oficial da Fórmula 1 que traz carros, equipes e circuitos atualizados, com foco em realismo, modos de carreira e competição intensa nas pistas.",
            emEstoque: true
        },
        {
            id: 7,
            nome: "Shadow Of The Thomb Raider",
            preco: 269.82,
            categoria: "Aventura",
            imagem: "/img/sott.jpg",
            descricao: "Shadow of the Tomb Raider é um jogo de ação e aventura onde Lara Croft explora ruínas antigas, resolve enigmas e enfrenta perigos para impedir um apocalipse maia.",
            emEstoque: false
        },
        {
            id: 8,
            nome: "EA Sports FC 25",
            preco: 189.75,
            categoria: "Esporte",
            imagem: "/img/fc25.jpg",
            descricao: "EA Sports FC 25 é um jogo de futebol com times, ligas e jogadores atualizados, oferecendo modos como carreira, Ultimate Team e partidas online competitivas.",
            emEstoque: true
        }
    ]
};

const productList = document.getElementById("product-list");
const productDetails = document.getElementById("product-details");
const searchInput = document.querySelector("#search");
const categorySelect = document.querySelector("#category");
const btnRender = document.querySelector("#btnRender");



function formatPrice(preco) {
    return "R$ " + preco.toFixed(2);
}

function createProductCard(produto) {
    const card = document.createElement("div");
    card.setAttribute("data-id", produto.id);
    card.setAttribute("nome", produto.nome);
    card.classList.add("card");

    card.style.padding = "10px";
    card.style.margin = "15px";

    card.innerHTML = `
    <h2>${produto.nome}</h2 >
    <img src="${produto.imagem}"></img>
    <p>${formatPrice(produto.preco)}</p>
    <p>${produto.categoria}</p>
    <button class="btn-details">Ver detalhes</button>
    <button class="btn-highlight">Destacar</button>
    `;

    const btnDetails = card.querySelector(".btn-details");
    const btnHighlight = card.querySelector(".btn-highlight");

    btnDetails.addEventListener("click", () => {
        showProductDetails(produto);
    });

    btnHighlight.addEventListener("click", () => {
        card.classList.toggle("highlight");
    });

    return card;
}

function renderProducts(produtos) {
    productList.innerHTML = "";

    produtos.forEach(produto => {
        const card = createProductCard(produto);
        productList.appendChild(card);
    });

    const cards = document.querySelectorAll(".card");
    console.log("Listagem dos jogos via querySelectorAll")
    cards.forEach(card => {
        console.log("Card ID:", card.getAttribute("data-id"), "-", card.getAttribute("nome"));
    });
}

function renderCategories() {
    const categorias = [...new Set(data.produtos.map(n => n.categoria))];
    categorias.forEach(cat => {
        const option = document.createElement("option");
        option.value = cat;
        option.textContent = cat;

        categorySelect.appendChild(option);
    });
}

function showProductDetails(produto) {
    productDetails.innerHTML = `
        <div class="productDetails">
            <div>
                <h3>${produto.nome}</h3>
                <p>💵 Preço: ${formatPrice(produto.preco)}</p>
                <p>🎮 Categoria: ${produto.categoria}</p>
                <p>📦 Estoque: ${produto.emEstoque ? "Disponível" : "Indisponível"}</p>
            </div>
            <p class="desc">${produto.descricao}</p>
        <div>
    `;
    productDetails.scrollIntoView({ behavior: "smooth" });  
}

function filterProducts() {
    const texto = searchInput.value.toLowerCase();
    const categoria = categorySelect.value;

    return data.produtos.filter(produto => {
        const verificaNome = produto.nome.toLowerCase().includes(texto);
        const verificaCategoria = categoria === "Todos" || produto.categoria === categoria;

        return verificaNome && verificaCategoria;
    });
}

searchInput.addEventListener("input", () => {});
categorySelect.addEventListener("change", () => {});

btnRender.addEventListener("click", () => {
    renderProducts(filterProducts());
});

renderCategories();
renderProducts(data.produtos);