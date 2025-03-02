function mudarImgProduto() {
    const cards = document.querySelectorAll('.produto');
    const cardElement = document.getElementById('img-produto-g');

    cards.forEach((produto) => {
        produto.addEventListener('mouseenter', () => {
            const idSelecionado = produto.id;

            cards.forEach((img) => {
                img.classList.remove('selecionado');
            });

            produto.classList.add('selecionado');

            cardElement.innerHTML = `<img id="produto-g" src="src/img/img-produto/${idSelecionado}.png" alt="Imagem do produto">`;
        });

        produto.addEventListener('mouseleave', () => {

            cardElement.innerHTML = `<img id="produto-g" src="src/img/img-produto/${idSelecionado}.png" alt="Imagem do produto">`;

        });
    });
}