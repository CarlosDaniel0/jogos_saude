// Função que gerencia o quiz
$.fn.extend({
    quiz: function(json) {
      console.log(json)
        var index = 0;
        var correct = 0;
        var indexes = '';
        var items = '';
        for (var i = 0; i <= 12; i++) {
            if (i == 0) {
                indexes += `<li data-target="#carousel" class="active"></li>`;
                items += 
                `
                <div class="carousel-item active">
                    <div class="item">
                      <dic class="col">
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
                      </dic>
                    </div>
                </div>
                `;
            } else {
                indexes += `<li data-target="#carousel"></li>`;
                items += 
                `
                <div class="carousel-item">
                    <div class="item">
                      <dic class="col">
                        <h2>${ json[0]['title']}</h2>
                        <div class="row d-flex justify-content-center mt-4 options">
                          <button class="button true mr-4 select" value="0">Verdadeiro</button>
                          <button class="button false select" value="1">Falso</button>
                        </div>
                      </dic>
                    </div>
                </div>
                `;
            }
            
        }
        var pattern = 
        `
        <div id="carousel" class="carousel slide" data-ride="carousel" data-interval="false">
            <ol class="carousel-indicators" style="display: none">
              ${ indexes }
            </ol>
            <div class="carousel-inner">
              ${ items }
            </div>
          </div>
        </div>
        <!-- End Caroussel -->
        <button class="btn btn-primary" id="avancar">Avançar</button>
        <!-- Button trigger modal -->
        <button type="button" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#modal">
          Launch
        </button>
        
        <!-- Modal -->
        <div class="modal fade" id="modal" tabindex="-1" role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title"></h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
              </div>
              <div class="modal-body">
                
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" id="next">Save</button>
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
          
          $('#responsaveis').hide().delay(3000)
          $('#responsaveis').animate({height: 'toggle', opacity: '1'}, 'slow')


          $('#start-button').on('click', function() {
            index++
            $('.carousel-indicators').removeAttr('style');
            $('#carousel').carousel('next');
          })
          
          
          //$(document).quiz();
          $('.select').on('click', function() {
            modal = ''
            if ($(this).val() == json[0]['correct']['feedback']) {
              console.log(1);
              correct++
              modal += 
              `
              
              `;
            } else {
              console.log(2);
              correct++
              index++
              modal += 
              `
              
              `;
            }
            // Modal
            $('.modal-title').html('Teste');
            $('.modal-body').html(modal);
            $('#modal').modal('show');

            // Avançar
            $('#next').click(function() {
              $('#carousel').carousel('next');
              $('#modal').modal('hide');
            });
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



