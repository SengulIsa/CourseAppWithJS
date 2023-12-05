class Course{
    constructor(tittle,instructor,image){
        this.courseId=Math.floor(Math.random()*10000);
        this.tittle=tittle;
        this.instructor=instructor;
        this.image=image;
    }
}


class UI{
    addCourseToList(course){
        const list= document.getElementById('course-list');

        const html= `
            <tr>
                <td><img src="img/${course.image}"/></td>
                <td>${course.tittle}</td>
                <td>${course.instructor}</td>
                <td><a href="#" data-id="${course.courseId}" class="btn btn-danger btn-sm delete">Delete</a></td>
            </tr>
        `;
        list.innerHTML += html;
    }

    clearControls(){
        const tittle=document.getElementById('tittle').value=""; 
        const image=document.getElementById('image').value=""; 
        const instructor=document.getElementById('instructor').value=""; 
    
    }

    deleteCourse(element){
        if(element.classList.contains('delete')){
            element.parentElement.parentElement.remove();
            return true;
        }
        

    }

    showAlert(message,className){
        var alert =`
        <div class="alert alert-${className}">
            ${message}
        </div>

`;
    const row= document.querySelector('.row');
    row.insertAdjacentHTML('beforebegin', alert);

    setTimeout(() =>{
            document.querySelector('.alert').remove();
    },3000);
    }
}

class Storage{
    static getCourses(){
        let courses;

        if(localStorage.getItem('courses')===null){
            courses=[];
        }
        else{
            courses = JSON.parse(localStorage.getItem('courses'));

        }

        return courses;
    };

    static displayCourses(){
        const courses= Storage.getCourses();

        courses. forEach(element => {
            
        });(course => {
            const ui = new UI();
            ui.addCourseToList(course);
            
        });

    };

    static addCourse(course){
        const courses= Storage.getCourses();
        courses.push(course);
        localStorage.setItem('courses',JSON.stringify(course));

    };

    static deleteCourse(element){
        if(element.classList.contains('delete')){
            const id = element.getAttribute('data-id');

            const courses =Storage.getCourses();

            courses. forEach((course,index)=>{
                if(course.courseId== id){
                    courses.splice(index,1);
                }
            });

            localStorage.setItem('courses',JSON.stringify(courses));
        }

    };


}

document.addEventListener('DOMContentLoaded',Storage.displayCourses);

document.getElementById('new-course').addEventListener('submit',
function(e){

    const tittle=document.getElementById('tittle').value; 
    const image=document.getElementById('image').value; 
    const instructor=document.getElementById('instructor').value; 


    //create Course object
    const course= new Course(tittle,instructor,image);
    console.log(course);
    const ui=new UI();

    if(tittle==="" || instructor==="" || image===""){
        ui.showAlert('please complete all information of form!', 'warning');
    }
    else{
         //add course object to list
         ui.addCourseToList(course);

         //save to Local Storage
         Storage.addCourse(course);

         //clear controls
         ui.clearControls();

         ui.showAlert('Course has been added', 'success');
    }
       
        e.preventDefault();
});

document.getElementById('course-list').addEventListener('click',function(e){
    const ui = new UI();

    //delete course from the list
    if(ui.deleteCourse(e.target)==true){
             // delete course from local storage
    Storage.deleteCourse(e.target);
    ui.showAlert('The course has been deleted', 'danger');
    };

   
});