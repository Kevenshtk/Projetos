function mudarImgProduto() {
  const cards = document.querySelectorAll(".produto");

  $.each(cards, function () {
    $(this).on("mouseenter", function () {
      const idSelecionado = this.id;

      $.each(cards, function () {
        $(this).removeClass("selecionado");
      });

      $(this).addClass("selecionado");
      $("#produto-g").attr("src", `src/img/img-produto/${idSelecionado}.png`);
    });
  });
}
