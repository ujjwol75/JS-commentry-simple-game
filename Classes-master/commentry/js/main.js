$('#commentBox').keyup(function(e){
    let code = e.which
    if(code == 13){
        let newComment = $(this).val()
        var dt = new Date();
        var time = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();
        let li = '<li> <span>'+ time +'</span>' + newComment + '</li>'
        $('.display-wrapper ul').prepend(li)
        $(this).val('')
    }
})