function Course(tittle,instructor,image){
    this.tittle=tittle;
    this.image=image;
    this.instructor=instructor;
}

function UI(){

}

UI.prototype.addCourseToList= function(course){
    const list= document.getElementById('course-list');

    const html= `
        <tr>
            <td><img src="img/${course.image}"/></td>
            <td>${course.tittle}</td>
            <td>${course.instructor}</td>
            <td><a href="#" class="btn btn-danger btn-sm delete">Delete</a></td>
        </tr>
    `;
    list.innerHTML += html;
};

UI.prototype.clearControls= function(){
    const tittle=document.getElementById('tittle').value=""; 
    const image=document.getElementById('image').value=""; 
    const instructor=document.getElementById('instructor').value=""; 

};

UI.prototype.deleteCourse= function(element){
    if(element.classList.contains('delete')){
        element.parentElement.parentElement.remove();
    }
};

UI.prototype.showAlert= function(message,className){
    var alert =`
            <div class="alert alert-${className}">
                ${message}
            </div>
    
    `;
        const row= document.querySelector('.row');
        row.insertAdjacentHTML('beforebegin', alert);

        setTimeout(() =>{
                document.querySelector('.alert').remove();
        },3000)
}


document.getElementById('new-course').addEventListener('submit',
function(e){

    const tittle=document.getElementById('tittle').value; 
    const image=document.getElementById('image').value; 
    const instructor=document.getElementById('instructor').value; 


    //create Course object
    const course= new Course(tittle,instructor,image);
    const ui=new UI();

    if(tittle==="" || instructor==="" || image===""){
        ui.showAlert('please complete all information of form!', 'warning');
    }
    else{
         //add course object to list
         ui.addCourseToList(course);
         //clear controls
         ui.clearControls();

         ui.showAlert('Course has been added', 'success');
    }
       
        e.preventDefault();
});

document.getElementById('course-list').addEventListener('click',function(e){
    const ui = new UI();
    ui.deleteCourse(e.target);
    ui.showAlert('The course has been deleted', 'danger');
})