$( document ).ready(function() {
    var animals = ["bunny", "sloth", "llama", "platypus", "tiger", "owl"];
   
    //create buttons 
   function renderButtons () { 
        $("#animal-buttons").empty();
        for (i=0; i<animals.length; i++) {
        
        var animalButton = $("<button>")
        animalButton.attr("class", "animal");
        animalButton.attr("data-name", animals[i]);

        animalButton.text(animals[i]);
        $("#animal-buttons").append(animalButton);
        }
    };

    renderButtons();

    //add users input as a button when Submit button clicked
    $("#add-animal").on("click", function (event){
        event.preventDefault();

        var userInput = $("#user-input").val();
        animals.push(userInput);

        renderButtons();
    });

    //when user clicks a button, render gifs on screen

    $(document).on("click", ".animal", displayAnimal);

    function displayAnimal () {
        $("#animal-gifs").empty();
        var currentAnimal = $(this).attr("data-name");
        console.log("this button was clicked: "+currentAnimal);
        
        var giphyURl = "https://api.giphy.com/v1/gifs/search?api_key=iRNn2iIlNzOGsV8t1k3AbQFRmpDaRoBO&q="+currentAnimal+"&limit=9"

        $.ajax({
            method: "GET",
            url: giphyURl
        }).then(function(response){
            console.log(response);

            for (i=0; i<response.data.length;i++){
                var newGifUrl = response.data[i].images.fixed_height_still.url;
                var rating= response.data[i].rating

                var newAnimalDiv = $("<span>");
                newAnimalDiv.addClass("col-md-4");
                newAnimalDiv.append("<h3> Rating: "+rating+"</h3")
                newAnimalDiv.append("<img src='"+newGifUrl+"' class='gif'>")

                $("#animal-gifs").append(newAnimalDiv);
            }
            
        })

    }

    //toggle between playing and pausing when gif is clicked
    $(document).on("click", ".gif", function(){
        
        var src = $(this).attr("src");
        //if gif is playing, stop it on click
        if($(this).hasClass("playing")) {
            $(this).attr('src', src.replace(/\.gif/i, "_s.gif"));
            $(this).removeClass("playing");
        } else {
            $(this).addClass("playing");
            $(this).attr('src', src.replace(/\_s.gif/i, ".gif"));
        }
    })


})