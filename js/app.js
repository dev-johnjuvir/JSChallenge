$(function(){
    console.log("ready;");
    let searchCard = $('.content.card');

    searchCard.hide();
    $('#search').keyup(function(){
   
        // Search text
        var text = $(this).val().toLowerCase();
      
        // Hide all content class element
        $('.content').hide();
     
        // Search 
        $('.content .title').each(function(){
      
         if($(this).text().toLowerCase().indexOf(""+text+"") != -1 ){
          $(this).closest('.content').show();
         }
        
         
       });
      });
});
// $(document).ready(function(){
   
//   });