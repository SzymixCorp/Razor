﻿// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.
// document.getElementById("oneOfResult").addEventListener("click", coppyIdToCLickboard)
$(".allResults").click(function(e){
    var clickElement = e.target;  // get the dom element clicked.
    var elementClassName = e.target.className;  // get the classname of the element clicked
    console.log("You copy id: " + elementClassName);
    navigator.clipboard.writeText(elementClassName)
});

let allat = false;
$(document).ready(function () {
    $("#nav-history-tab").click(function () {
        fetch("https://localhost:44339/api/Calcs")
            .then(res=> {
                return res.json();
                
            })
            .then(data=>{
                document.querySelector(".allResults").innerHTML = "";
                data.forEach(element => {
                    
                    document.getElementById("resulte").innerHTML = "";
                    var div = document.createElement('div');
                    div.className = element.id;
                    div.id = "oneOfResult"
                    div.innerHTML = element.operation + " = " + element.result;
                
                    document.querySelector(".allResults").appendChild(div);
                    //element.operation + " = " + element.result
                });
            })
            .catch(error=>console.log(error));
    });
    $("#getById").click(function () {
        fetch("https://localhost:44339/api/Calcs/id?id=" + document.getElementById("idOfGet").value)
            .then(res=> {
                return res.json();
            })
            .then(data=>{
                document.getElementById("resultbyid").innerHTML = data['operation'] + " = " + data['result'];
                document.getElementById("idOfGet").value = "";
            })
            .catch(error=>console.log(error));
    });
    $("#calculate").click(function () {
        fetch("https://localhost:44339/api/Calcs", {
            method: "POST",
            headers:{
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({
                id : "",
                "operation" : document.getElementById("operacja").value,
                "result": "",
            })
        })
            .then(res=> {
                return res.json();
            })
            .then(data=>{
                document.getElementById("resulte").innerHTML = "";
                document.getElementById("resulte").innerHTML = data["result"];
                document.getElementById("operacja").value = "";
            })
            .catch(error=>console.log(error));
    });
    $("#deleteButton").click(function () {
        fetch("https://localhost:44339/api/Calcs/id?id=" + document.getElementById("deleteId").value, {
            method: "DELETE",
            headers:{
                "Content-Type" : "application/json"
            },
        })
            .then(data=>{
                document.getElementById("deleted").innerHTML = "Done";
                document.getElementById("deleteId").value = "";
            })
            .catch(error=>console.log(error));
    })

})