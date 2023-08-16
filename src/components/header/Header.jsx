import React, { useEffect, useState } from 'react';
import { AiOutlinePlus, AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import './header.css';

const Header = () => {
    const [inputtext, setInputText] = useState('');

    const getLocalStorageItems = () => {
        let storedList = localStorage.getItem('TodoData');

        if (storedList) {
            return JSON.parse(storedList);
        } else {
            return [];
        }
    };

    const [list, setList] = useState(getLocalStorageItems());

    const handlesubmit = (e) => {
        if (inputtext === "") {
            alert("Sorry Can't add an empty field");
        } else {
            setList([...list, inputtext]);
            setInputText('');
        }
        e.preventDefault();
    };
    

    const handleDelete =(para)=>{
        const newlist= list.filter((items,id)=> id!==para)
        setList(newlist)
    }

    useEffect(() => {
        localStorage.setItem('TodoData', JSON.stringify(list));
    }, [list]);

    return (
        <div className='main__div'>
            <div className="content">
                <div className="heading">
                    <h1>TODO LIST</h1>
                </div>
                <div className="input_text">
                    <form onSubmit={handlesubmit}>
                        <input type="text"
                            name=""
                            placeholder='Hello'
                            onChange={(e) => { setInputText(e.target.value) }}
                            value={inputtext}
                        />
                    </form>
                    <div className="inp__icon">
                        <span><AiOutlinePlus size={25} onClick={handlesubmit} /></span>
                    </div>
                </div>
                <div className="todo__list">
                    <ul>
                        {
                            list.map((item, i) => (
                                <div className="showing__data">
                                    <li key={i}>{item}</li>
                                    <div className="del">
                                        <button onClick={()=>handleDelete(i)}>
                                            <AiOutlineDelete size={20} />
                                        </button>
                                    </div>
                                    <div className="edit">
                                        <button><AiOutlineEdit size={20} /></button>
                                    </div>
                                </div>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Header;
