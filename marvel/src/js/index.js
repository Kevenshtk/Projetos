const personagens = document.querySelectorAll(".personagem");

$.each(personagens, function(){
    $(this).on("mouseenter", function(){
        const idSelecionado = $(this).attr("id");

        $('.selecionado').removeClass('selecionado');
        $(this).addClass('selecionado');
        $('#personagem-jogador-1').attr('src', `./src/img/${idSelecionado}.png`);
        $('#nome-jogador-1').html($(this).attr('data-name'));
    });
})
