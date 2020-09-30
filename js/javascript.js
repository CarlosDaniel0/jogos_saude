// Função que gerencia o quiz
$.fn.extend({
    quiz: function(json) {
      $(function() {
        // Animações 
        $('#logo').hide();
        $('#logo').animate({height: 'toggle', opacity: '1'}, 200); 
        $("#info").hide();
        $("#info").animate({height: 'toggle', opacity: '1'}, 1000).delay(1000);

        $('#subinfo').hide().delay(1000);
        $('#subinfo').animate({height: 'toggle', opacity: '1'}, 'slow');
        

        $('#start-button').animate({left: '-=400', opacity: '0'}, 0).delay(2000);
        $('#start-button').animate({left: '+=400', opacity: '1'}, 700);
        
        $('#responsaveis').hide().delay(3000);
        $('#responsaveis').animate({height: 'toggle', opacity: '1'}, 'slow');


        // Inicia o Quiz
        $('#start-button').on('click', function() {
          index++
          $('.carousel-indicators').removeAttr('style');
          $('#carousel').carousel('next');
        });
        
        //Controle de slides;
        $('.select').on('click', function() {
            if (index <= json.length) {
              if (index == json.length) $('.carousel-indicators').hide();

            modal = ''
            // Faz a verificação das respostas
            if ($(this).val() == json[index-1]['correct']['feedback']) {
              // Incrementa em caso de acerto
              correct++;
              modal = 
              `
              <div class="col">
                <div class="row d-flex justify-content-center">
                  <i class="far fa-check-circle icons" id="correct"></i>
                </div>
                <div class="row d-flex justify-content-center mt-2 mb-3">
                  <h2 class="title anwser">Correto!</h2>
                </div>
              
                ${ json[index-1]['correct']['note'] }
              </div>
              `;
            } else {
              modal = 
              `
              <div class="col">
                <div class="row d-flex justify-content-center">
                  <i class="far fa-times-circle icons" id="false"></i>
                </div>
                <div class="row d-flex justify-content-center mt-2">
                  <h2 class="title anwser">Ops!</h2>
                </div>
                <div class="row d-flex justify-content-center mb-3">
                  A resposta correta é ${ json[index - 1]['awnsers'][json[index - 1]['correct']['feedback']]}
                </div>
              
                ${ json[index-1]['correct']['note'] }
              </div>
              `;
              
            }
            if (index >= json.length) {
              var percent = (correct / json.length) * 100; 
              var optional = '';
              var result = 
              `
              Você acertou ${ correct } de ${ json.length } (${ percent}%) das questões. 
              `;

              var whatsapp = `https://api.whatsapp.com/send?text=Acertei ${ correct } questões no Quiz Covid Monsehor - Gil. Disponível no link link`;
              var facebook = `https://www.facebook.com/sharer/sharer.php?u=https://carlosdaniel0.github.io/quiz_covidmgil/`;
              var twitter = `https://twitter.com/intent/tweet?text=Acertei ${ correct } questões no Quiz Covid Monsehor - Gil. Disponível no link link`;

              $('#result').html(result);
              
              if (percent == 100) {
                optional = 'Parabéns você está <i>expert<i> no assunto. Já que você acertou todas as perguntas que tal compartilhar com seus amigos e desafiá-los';
                
              } else if (percent >= 70) {
                optional = 'Muito bom! Você está quase lá, o que acha de tentar novamente para gabaritar e compartilhar com os amigos?'
              } else if (percent > 30 && percent < 70) {
                optional = 'Está quase lá! Parece que você errou algums questões, mas não desamine. Tente novamente e melhore sua pontuação!'
              } else {
                optional = 'Que pena! Parece que você acertou menos de 30% do quiz, que tal tentar novamente com os conhecimentos que vocẽ adquiriu?'
              }
              $('#optional').html(optional);

              // Compartilhar conteúdo
              $('#twitter').attr('href', twitter);
              $('#whatsapp').attr('href', whatsapp);
              $('#facebook').attr('href', facebook);
            }

            index++
            // Modal
            $('#content').html( modal);
            $('#modal').modal('show');

            // Avançar
            // Botão
            $('#next').click(function() {
              $('#carousel').carousel('next');
              $('#modal').modal('hide');
            });
            // Botão de Fechar
            $('.close').click(function() {
              $('#carousel').carousel('next');
              $('#modal').modal('hide');
            });
            // Clicando fora do modal
            $('.modal').click(function() {
              $('#carousel').carousel('next');
              $('#modal').modal('hide');
            });
          } 
        });
    });
    
    var dados = json;
    var index = 0;
    var correct = 0;
    var items = '';
    var responsaveis = 
    `
    <div id="responsaveis">
      Dados técnicos: </br>
      <a href="https://coronavirus.saude.gov.br/" class="links">Portal da Saúde - Coronavírus<a> </br>
      <a href="https://portal.fiocruz.br/coronavirus/perguntas-e-respostas" class="links">Portal FIOCRUZ</a>
    </div>
    `;
    indexes = `<li data-target="#carousel" class="active not-visible"></li>`;
      items += 
      `
      <div class="carousel-item active">
          <div class="item">
            <div class="col">
              <h2 id="info">E se as chances de contrair o novo coronavírus forem proporcionais ao seu conhecimento sobre ele?</h2>
              <h3 id="subinfo">Responda a 10 afirmações sobre a COVID-19 e descubra neste game quão seguro você está!</h3>
              <div class="row d-flex justify-content-center mt-4">
                <button class="button btn-warning avancar" id="start-button">Iniciar</button>
              </div>
              ${ responsaveis }
            </div>
          </div>
      </div>
      `;
    for (var i in json) {                
            indexes += `<li data-target="#carousel"></li>`;
            items += 
            `
            <div class="carousel-item">
                <div class="item">
                  <div class="col">
                    <h2 class="title">${ dados[i]['title']}</h2>
                    <div class="row d-flex justify-content-center mt-4 options">
                      <button class="button true mr-4 select" value="0">Verdadeiro</button>
                      <button class="button false select" value="1">Falso</button>
                    </div>
                  </div>
                </div>
            </div>
            `;
    }
    
      // Página de resultados
      indexes += `<li data-target="#carousel" class="not-visible"></li>`;
      items += 
      `
        <div class="carousel-item">
          <div class="item">
            <div class="col">
              <div class="row d-flex justify-content-center">
                <h2 id="result" class="mt-4"></h2>
              </div>
              <div class="row">
                <h3 id="result d-flex justify-content-center"></h3>
              </div>
              <div class="row d-flex justify-content-center">
                <span id="optional"></span>
              </div>
              <div class="d-flex justify-content-center">
                <b style="color: #fff">Desafie seus amigos: </b>
              </div>
              <row class="d-flex justify-content-center mt-2">
                <a id="facebook" class="network mr-2 d-flex justify-content-center">
                  <i class="fab fa-facebook-f"></i>
                </a>
                <a id="whatsapp" class="network mr-2 d-flex justify-content-center">
                  <i class="fab fa-whatsapp"></i>
                </a>
                <a id="twitter" class="network d-flex justify-content-center">
                  <i class="fab fa-twitter"></i>
                </a>
              </row>
              ${ responsaveis }
            </div>
          </div>
        </div>
      `;


    var pattern = 
    `
    <div class="row d-flex justify-content-center">
      <img id="logo" src="img/logo.png" width="200px">
    </div>
    
    <div id="carousel" class="carousel slide" data-touch="false" data-interval="false">
        <ol class="carousel-indicators" style="display: none">
          ${ indexes }
        </ol>
        <div class="carousel-inner">
          ${ items }
        </div>
      </div>
    </div>
    <!-- End Caroussel -->
    
    <!-- Modal -->
    <div class="modal fade" id="modal" tabindex="-1" role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          
          <div class="modal-body">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
            <section id="content"></section>
            <div class="row d-flex justify-content-center">
              <button type="button" class="btn btn-primary mt-4" id="next">Próxima</button>
            </div>
          </div>
          
        </div>
      </div>
    `;

    $(this).html(pattern);
        
    },
});

$.getJSON("data/covid.json", function(response) {
  $(function() {
    $('.container-fluid').quiz(response['questions']);
  });
})



