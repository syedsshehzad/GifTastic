$(document).ready(function() {

      // Initial array of movies
      var movies = ["The Matrix", "The Notebook", "Mr. Nobody", "The Lion King"];


      // Function for displaying movie data
      function renderButtons() {


        // Delete the content inside the movies-view div prior to adding new movies
        // (this is necessary otherwise you will have repeat buttons)
        $("#movies-view").empty();

        // Loop through the array of movies, then generate buttons for each movie in the array
        movies.forEach((movie)=>{
          var buttonToAdd = $("<button>");
          buttonToAdd.addClass("movie");
          buttonToAdd.attr("data-name", movie);
          buttonToAdd.text(movie);// movies[i]
          $("#movies-view").append(buttonToAdd);
        });

      }

      // This function handles events where the add movie button is clicked
      $("#add-movie").on("click", function(event) {
        // event.preventDefault() prevents submit button from trying to send a form.
        // Using a submit button instead of a regular button allows the user to hit
        // "Enter" instead of clicking the button if desired
        event.preventDefault();

        var movie = $("#movie-input").val().trim();
        movies.push(movie);

        // Write code to grab the text the user types into the input field
        // Write code to add the new movie into the movies array

        // The renderButtons function is called, rendering the list of movie buttons
        renderButtons();
      });



      $('#movies-view').on('click', '.movie', function() {

        // Clear the old gifs
        $("#moviedump").empty();

        var object = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        object + "&api_key=dc6zaTOxFJmzC&limit=10";

        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {
          console.log(response)
          var results = response.data;
          for (var i = 0; i < results.length; i++) {
            var gifDiv = $("<div class='item'>");

            var rating = results[i].rating;

            var p = $("<p>").text("Rating: " + rating);

            var personImage = $("<img>");
            personImage.attr("src", results[i].images.fixed_height_still.url);
            personImage.attr("data-still", results[i].images.fixed_height_still.url);
            personImage.attr("data-animate", results[i].images.fixed_height.url);
            personImage.attr("data-state", "still");
            personImage.attr("class", "gif");


            gifDiv.prepend(p);
            gifDiv.prepend(personImage);

            $("#moviedump").prepend(gifDiv);
          }


          $(".gif").on("click", function() {

            var state = $(this).attr('data-state');
            console.log(state)

            if (state == "still") {
              var one = $(this).attr('data-animate')
              $(this).attr('src', one);
              $(this).attr('data-state', "animate");
            }

            if (state == "animate") {
              var two = $(this).attr('data-still')
              $(this).attr('src', two);
              $(this).attr('data-state', "still");
            }

          });

        });

      });

      // Calling the renderButtons function to display the initial list of movies
      renderButtons();

});
