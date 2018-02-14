var prefix = "https://cors-anywhere.herokuapp.com/";
var tweetLink = "https://twitter.com/intent/tweet?text=";
var quoteUrl = "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1";

function getQuote(){
	$.ajax({
		type: "GET",
		url: prefix + quoteUrl,
		beforeSend: function(){
			$('h2').empty();
			$('<i class="fas fa-spinner fa-spin"></i>').appendTo($('h2'));
			/*$('h2').text("Downloading quote, please wait :-)");*/
			$('h3').empty();
		},
		success: createTweet,
		complete: function(){

		}
	});
	$.ajaxSetup({ cache: false });
}

function createTweet(input) {
	$('h2').empty();
	$('h3').empty();
    var data = input[0];

    var quoteText = $(data.content).text().trim();
    console.log(data.content);
    console.log(quoteText);
    var quoteAuthor = data.title;
    console.log(quoteAuthor);
    if (!quoteAuthor.length) {
        quoteAuthor = "Unknown author";
    }
    
    var tweetText = "Quote of the day - " + quoteText + " Author: " + quoteAuthor;
    if (tweetText.length > 140) {
        getQuote();
    } else {
        var tweet = tweetLink + encodeURIComponent(tweetText);
        console.log(tweet);
        $('.quote').text(quoteText);
        $('.author').text("Author: " + quoteAuthor);
        $('.tweet').attr('href', tweet);
    }
}

$(document).ready(function() {
    getQuote();
    $('.trigger').click(function() {
        getQuote();
    });
});