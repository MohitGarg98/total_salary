const fetch = require("node-fetch");

async function fetchData() {
    const response = await fetch('http://34.198.81.140/attendance.json');
    var data = await response.json();
    let overtime = 0;
    let total_salary = 0;
    let worker_per_day_salary = 0;
    let male_salary = 0;
    let female_salary = 0;

    for(let i = 0; i < data.length; i++){
        if(data[i].calculate === 'Y'){
            if(data[i].designation === "Worker"){
                worker_per_day_salary = data[i].per_day_salary;
                if(data[i].total_hours > 8){
                    overtime += data[i].total_hours;
                }
            }
            if(data[i].total_hours < 8 && data[i].total_hours >4){
                total_salary += data[i].per_day_salary / 2;
            }
            if(data[i].total_hours === 8){
                total_salary += data[i].per_day_salary;
            }
            if(data[i].total_hours > 8 && data[i].designation !== "Worker"){
                total_salary += data[i].per_day_salary;
            }
            if(data[i].gender === "Male"){
                male_salary += data[i].per_day_salary;
            }
            if(data[i].gender === "Female"){
                female_salary += data[i].per_day_salary;
            }
        }         
    }
    if(male_salary > female_salary){
        male_salary += (male_salary / 100);
        total_salary = total_salary + overtime * worker_per_day_salary; 
    }else{
        female_salary += (female_salary / 100);
        total_salary = total_salary + overtime * worker_per_day_salary; 
    }
    console.log(total_salary);

}
fetchData();