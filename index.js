$(document).ready(function() {
    var prevPage = null;
    var nextPage = null;
    var pageToken = null;

    function loadVideos() {
        let url = "https://www.googleapis.com/youtube/v3/search";
        let params = {
            q: $("#searchBar").val(),
            part: "snippet",
            key: "AIzaSyCn4AXZxDH9oG1UUQSnDWmOq2OduIMBbV4",
            type: "video"
        };

        if (pageToken) {
            params["pageToken"] = pageToken;
        }

        $.getJSON(url, params, function(result) {
            console.log(result);
            if (result.prevPageToken) {
                prevPage = result.prevPageToken;
                $("#prevPage").show();
            } else {
                prevPage = null;
                $("#prevPage").hide();
            }

            if (result.nextPageToken) {
                nextPage = result.nextPageToken;
                $("#nextPage").show();
            } else {
                nextPage = null;
                $("#nextPage").hide();
            }

            $("#videoList").html("");
            $.each(result.items, function(i, item) {
                $("#videoList").append(
                    `
                    <div>
                        <p>${item.snippet.title}</p>
                        <a href="https://www.youtube.com/watch?v=${item.id.videoId}"><img src="${item.snippet.thumbnails.default.url}"></img>
                    `
                );
            });
        });
    }

    $("#prevPage").on("click", function(event) {
        event.preventDefault();
        pageToken = prevPage;
        loadVideos();
    });

    $("#nextPage").on("click", function(event) {
        event.preventDefault();
        pageToken = nextPage;
        loadVideos();
    });

    $("#searchButton").on("click", function(event) {
        event.preventDefault();
        loadVideos();
    });
});