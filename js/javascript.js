// Função que gerencia o quiz
$.fn.extend({
    quiz: function(json) {
      console.log(json)
        var dados = json;
        var index = 0;
        var correct = 0;
        var items = '';
        indexes = `<li data-target="#carousel" class="active not-visible"></li>`;
          items += 
          `
          <div class="carousel-item active">
              <div class="item">
                <div class="col">
                  <div class="row d-flex justify-content-center">
                    <img id="logo" src="http://cbissn.ibict.br/images/phocagallery/galeria2/thumbs/phoca_thumb_l_image03_grd.png" width="200px">
                  </div>
                  <h2 id="info">E se as chances de contrair o novo coronavírus forem proporcionais ao seu conhecimento sobre ele?</h2>
                  <h3 id="subinfo">Responda a 20 afirmações sobre a COVID-19 e descubra neste game quão seguro você está!</h3>
                  <div class="row d-flex justify-content-center mt-4">
                    <button class="button btn-warning avancar" id="start-button">Iniciar</button>
                  </div>
                  <div id="responsaveis">
                    Responsáveis técnicos: </br>
                    Dr. Claudio L. S. Ferrari - CRM: 60113 - SP </br>
                    Dra. Márcia M. da Costa - CRM: 76624 - SP
                  </div>
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
        indexes += `<li data-target="#carousel" class="not-visible"></li>`;
        items += 
        `
          <div class="carousel-item">
            <div class="item">
              <div class="col">
                <h2 class="title">Fim</h2>
                
              </div>
            </div>
          </div>
        `;

        var pattern = 
        `
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
                  <button type="button" class="btn btn-primary" id="next">Próxima</button>
                </div>
              </div>
              
            </div>
          </div>
        `;

        $(this).html(pattern);
        
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


          $('#start-button').on('click', function() {
            index++
            $('.carousel-indicators').removeAttr('style');
            $('#carousel').carousel('next');
          });
          
          //$(document).quiz();
          
            console.log(json.length)
          $('.select').on('click', function() {
              if (index <= json.length) {
                if (index == json.length) $('.carousel-indicators').hide();

              modal = ''
              if ($(this).val() == json[index-1]['correct']['feedback']) {
                correct++
                modal = 
                `
                <div class="row d-flex justify-content-center">
                  <i class="far fa-check-circle icons" id="correct"></i>
                </div>
                ${ json[index-1]['correct']['note'] }
                `;
              } else {
                modal = 
                `
                <div class="row d-flex justify-content-center">
                  <i class="far fa-times-circle icons" id="false"></i>
                </div>
                ${ json[index-1]['correct']['note'] }
                `;
              }
              index++
              // Modal
              $('#content').html( modal);
              $('#modal').modal('show');

              // Avançar
              $('#next').click(function() {
                $('#carousel').carousel('next');
                $('#modal').modal('hide');
              });
              $('.close').click(function() {
                $('#carousel').carousel('next');
                $('#modal').modal('hide');
              });
              $('.modal').click(function() {
                $('#carousel').carousel('next');
                $('#modal').modal('hide');
              });
            } 
          });
        

          
          // $('#avancar').on('click',function() {;
          //     if (index < 20) {
      
          //         // Modal
          //         $('.modal-title').html('Teste');
          //         $('.modal-body').html(index);
          //         $('#modal').modal('show');
                  
          //         index++
                  
          //         $('#next').click(function() {
          //           $('#carousel').carousel('next');
                    
          //           $('#modal').modal('hide');
          //         })
          //     }
              //console.log(index)
          //});
      
      });
    },
});

$.getJSON("data/covid.json", function(response) {
  $(function() {
    $('.container-fluid').quiz(response['questions']);
  });
})



