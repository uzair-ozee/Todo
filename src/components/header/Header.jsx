// import React, { useEffect, useState } from 'react';
// import { AiOutlinePlus, AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
// import './header.css';

// const Header = () => {
//     const [inputtext, setInputText] = useState('');

//     const getLocalStorageItems = () => {
//         let storedList = localStorage.getItem('TodoData');

//         if (storedList) {
//             return JSON.parse(storedList);
//         } else {
//             return [];
//         }
//     };

//     const [list, setList] = useState(getLocalStorageItems());

//     const handlesubmit = (e) => {
//         if (inputtext === "") {
//             alert("Sorry Can't add an empty field");
//         } else {
//             setList([...list, inputtext]);
//             setInputText('');
//         }
//         e.preventDefault();
//     };
    

//     const handleDelete =(para)=>{
//         const newlist= list.filter((items,id)=> id!==para)
//         setList(newlist)
//     }

//     useEffect(() => {
//         localStorage.setItem('TodoData', JSON.stringify(list));
//     }, [list]);

//     return (
//         <div className='main__div'>
//             <div className="content">
//                 <div className="heading">
//                     <h1>TODO LIST</h1>
//                 </div>
//                 <div className="input_text">
//                     <form onSubmit={handlesubmit}>
//                         <input type="text"
//                             name=""
//                             placeholder='Hello'
//                             onChange={(e) => { setInputText(e.target.value) }}
//                             value={inputtext}
//                         />
//                     </form>
//                     <div className="inp__icon">
//                         <span><AiOutlinePlus size={25} onClick={handlesubmit} /></span>
//                     </div>
//                 </div>
//                 <div className="todo__list">
//                     <ul>
//                         {
//                             list.map((item, i) => (
//                                 <div className="showing__data">
//                                     <li key={i}>{item}</li>
//                                     <div className="del">
//                                         <button onClick={()=>handleDelete(i)}>
//                                             <AiOutlineDelete size={20} />
//                                         </button>
//                                     </div>
//                                     <div className="edit">
//                                         <button><AiOutlineEdit size={20} /></button>
//                                     </div>
//                                 </div>
//                             ))
//                         }
//                     </ul>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Header;


import React, { useEffect, useState } from 'react';
import { AiOutlinePlus, AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import './header.css';

const Header = () => {
    // input useState
    const [inputtext, setInputText] = useState('');
    // Edit useState
    const [editingIndex, setEditingIndex] = useState(-1);
    const [editedText, setEditedText] = useState('');
    
    const getLocalStorageItems = () => {
        let storedList = localStorage.getItem('TodoData');
        
        if (storedList) {
            return JSON.parse(storedList);
        } else {
            return [];
        }
    };
    
    const [list, setList] = useState(getLocalStorageItems());

    const handleEdit = (para, item) => {
        setEditingIndex(para);
        setEditedText(item);
    };

    const handleDelete = (para) => {
        const newlist = list.filter((items, id) => id !== para);
        setList(newlist);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (editingIndex !== -1) {
            const updatedList = list.map((item, index) => {
                if (index === editingIndex) {
                    return editedText;
                }
                return item;
            });

            setList(updatedList);
            setEditingIndex(-1);
            setEditedText('');
        } else {
            if (inputtext === "") {
                alert("Sorry Can't add an empty field");
            } else {
                setList([...list, inputtext]);
                setInputText('');
            }
        }
    };
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
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder='Hello'
                            onChange={(e) => setInputText(e.target.value)}
                            value={inputtext}
                        />
                    </form>
                    <div className="inp__icon">
                        <span><AiOutlinePlus size={25} onClick={handleSubmit} /></span>
                    </div>
                </div>
                <div className="todo__list">
                    <ul>
                        {list.map((item, i) => (
                            <div className="showing__data" key={i}>
                                <li>
                                    {editingIndex === i ? (
                                        <input
                                            type="text"
                                            value={editedText}
                                            onChange={(e) => setEditedText(e.target.value)}
                                        />
                                    ) : (
                                        item
                                    )}
                                </li>
                                <div className="del">
                                    <button onClick={() => handleDelete(i)}>
                                        <AiOutlineDelete size={20} />
                                    </button>
                                </div>
                                <div className="edit">
                                    {editingIndex === i ? (
                                        <button onClick={handleSubmit}>
                                            <AiOutlineEdit size={20} />
                                        </button>
                                    ) : (
                                        <button onClick={() => handleEdit(i, item)}>
                                            <AiOutlineEdit size={20} />
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Header;
