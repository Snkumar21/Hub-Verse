doocument.addEventListener("DOMContentLoaded", function() {

    var reviewForm = document.getElementById("reviewForm");
    var submitButton = document.getElementById("submitReview");
    var reviewsSection = document.getElementById("reviewsSection");
    
    submitButton.addEventListener("click", function () {
        var reviewText = document.getElementById("reviewText").value;

        if(reviewText.trim() !== "") {

            var reviewElement = document.createElement("div");
            reviewElement.className = "review";
            reviewElement.textContent = reviewText;

            reviewsSection.appendChild(reviewElement);

            reviewForm.reset();

            alert("Review submitted successfully!");
        }
    });
});