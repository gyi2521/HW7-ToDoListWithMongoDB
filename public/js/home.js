
function render(html) {
    $("#result").html("");
    $("#result").html(html);
}
$(function () {
    const displayToDoList = () => {
        $.ajax({ url: "/api/toDo", method: "GET" })
            .then(function (data) {
                let html = "";
                console.log(data);
                data.forEach(e => html += `<li task-id='${e.itemId}'><input type='checkbox' id='chkbox${e.itemId}' class='update' ${e.done?'checked':''}>${e.task}<button class='remove'><i class="fas fa-times btn-style"></i></button></li>`);
                render(html);
            });
    };
   

    const saveToDoList = () => {
        const newTask = {
            done: false,
            task: $('#inputTask').val().trim()
        };
        $.ajax({ url: '/api/toDo', method: 'POST', data: newTask })
            .then(function (data) {
                $('#inputTask').val('');
                $('#inputTask').focus();
                displayToDoList();
            });
    };
    $('#btnSubmit').on("click", saveToDoList);


    $(document).on('click', '.remove',function () {

        let li = $(this).closest('li');        
        $.ajax({ url: "/api/toDo/" + li.attr('task-id'), method: "DELETE"})
            .then(function(data){
                //li.remove();
                displayToDoList();
            })
    });

    $(document).on('click', '.update',function () {
        let li = $(this).closest('li');    
        const updatedTask = {
            itemId:  li.attr('task-id'),
            done: $(this).is(':checked')
        };
            
        $.ajax({ url: "/api/toDo" , method: "PUT", data: updatedTask})
            .then(function(data){
                displayToDoList();
            })
    });

    displayToDoList();
})


