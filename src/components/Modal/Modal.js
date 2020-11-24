import React, { Fragment, useEffect } from 'react'
import List from '../ListOfAuthors/List'
import ReactDOM from 'react-dom'
import M from 'materialize-css'
import './Modal.css'
const Modal = (props) => {
    const { listOfAuthors, showModal ,setauthorsChoosen} = props;

    useEffect(() => {
        if (showModal !== false) {
            const elem = document.getElementById('modal1');
            var instance = M.Modal.init(elem, { dismissible: false });
            //inicializacion del modal
            instance.open();
        }

    }, [])

    const selectedAuthors = (e)=>{
        e.preventDefault();

        var inputsChecked = document.querySelectorAll("input[ischecked = true]");
        let ar = [];
        for (let index = 0; index < inputsChecked.length; index++) {
            let obj = {
                author: inputsChecked[index].value,
                link : inputsChecked[index].getAttribute("link")
            };
            ar.push(obj);
        }
        if(ar.length === 0){
            var toastHTML = '<span class="errorEmpty">You have to choose at least one author.</span>';
            M.toast({ html: toastHTML, classes: 'rounded' });
        }else{
            setauthorsChoosen(ar);
            const elem = document.getElementById('modal1');
            var instance = M.Modal.init(elem, { dismissible: false });
            //se cierra el modal si todo esta ok
            instance.close();
        }
    }

    if (showModal === false)
        return null;
    else {
        return (

            <div id="modal1" className="modal bottom-sheet">
                <div className="modal-content">
                    <h3 className="header white-text">Choose the correct authors:</h3>
                    <ul className="collection">
                        {Object.entries(listOfAuthors).map(([key,value]) => {
                            return (
                                <List item ={value} key={value.author}/>
                                );
                            })}
                    </ul>
                    <a href="" className="modal-action waves-effect waves-red btn-flat" id="accept" onClick={(e) =>selectedAuthors(e)}>Accept</a>
                    <a href="" className="modal-action modal-close waves-effect waves-green btn-flat" id="close">Close</a>
                </div>
            </div>
        );
    }
}

export default Modal