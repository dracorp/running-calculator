jQuery(document).ready(function() {
    var $keys = {
        enter: 13
    };

    // add div.footer to the end of content of post
    $(".post-body.entry-content").append('<div id="footer"></div>');

    // external links
    $('a').filter(function() {
        return this.hostname && this.hostname !== location.hostname;
    }).addClass('external').attr({
        rel: 'external'
    });

    // Use attr() to add an id, rel, and title.
    $('div.chapter a[href*="wikipedia"]').attr({
        rel: 'external',
        title: function() {
            return 'Learn more about ' + $(this).text() + ' at Wikipedia.';
        },
        id: function(index, oldValue) {
            return 'wikilink-' + index;
        }
    });

    // Add "back to top" links.
    $('<a href="#top">&#x1F51D;</a>').insertAfter('div.entry-content p');
    $('<a id="top"></a>').prependTo('body');

    // Create footnotes.
    var $notes = $('<ol id="notes"></ol>').insertBefore('#footer');
    $('span.footnote').each(function(index) {
        $(this)
            .before([
                '<a href="#footnote-',
                index + 1,
                '" id="context-',
                index + 1,
                '" class="context">',
                '<sup>[',
                index + 1,
                ']</sup></a>'
            ].join(''))
            .appendTo($notes)
            .prepend([
                '&nbsp;<a href="#context-',
                index + 1,
                '">↑</a>&nbsp;'
            ].join(''))
            .wrap('<li id="footnote-' + (index + 1) + '"></li>');
    });
    
    $('a.context,span.footnote a').click(function () {
        var id = $(this).attr('href');
        $('.reference').removeClass('reference');
        $(id).addClass('reference');
    });

    $('a.context').each(function(index){
        var id = $(this).attr('href');
        var title = $(id +' span.footnote').html();
        $(this).attr("title",title);
        $(this).tooltip({
            html: true
        });
    });


    /* search button and other */
    $('input#input-search').keydown(function(e){
        var key = e.which;
        console.log(key);
        if (key === $keys.enter){
            e.preventDefault();
            // przeslij zawartość do input.gsc-input i kliknij input.gsc-search-button
            var searchText = $(this).val();
            var $gscSearch = $('input.gsc-input');
            var $gscButton = $('input.gsc-search-button');
            $gscSearch.val(searchText);
            $gscButton[0].click();
        }
    });
});
